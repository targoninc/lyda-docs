# Subscription price changes

Subscription prices are managed from the internal dashboard by users with the
`canManageSubscriptionPricing` permission. The dashboard is the only supported
way to change `finance.available_subscriptions.price_per_term`.

## Flow

1. An admin enters a new price for one plan, chooses a future effective date,
   and requests the change. Dates in the past are rejected.
2. The API creates a `finance.subscription_price_changes` row and emails an
   approval link. The link contains a single-use, expiring token. Only its
   SHA-256 hash is stored.
3. Opening the link shows the old and new price. The confirm button remains
   disabled for 10 seconds. The API also stores the opening time and rejects an
   apply that arrives before the countdown has elapsed.
4. Confirming claims the request and clears the token. The request can no longer
   be approved or cancelled.
5. A new row is written to `finance.subscription_price_history` with the
   effective date. For Stripe, a new managed Price is created but checkout keeps
   using the old price until the effective date. For Apple, the App Store price
   change is scheduled with the same start date.
6. A scheduler applies due history rows to
   `finance.available_subscriptions.price_per_term` and `plan_id`. Until then,
   current plan reads ignore the future row and continue serving the old price.
7. Every active subscriber of that plan receives an in-app notification and an
   email. Price-change notifications are mandatory and cannot be disabled. The
   notification includes the effective date.
8. Every step is recorded in `lyda.action_log`, including requester, approver,
   old/new price, effective date, provider result and errors.

Existing Stripe subscriptions are not repriced by this flow. The current policy
is that existing subscribers keep their existing price; the notification email
states this explicitly. Revisit this policy if prices should apply immediately
or at the next renewal.

`finance.subscription_price_history` is the price timeline. A baseline row is
created for every plan and each approved change appends a new dated row. The
dashboard shows this history alongside pending change requests.

## Apple App Store

Apple price changes are automated through the App Store Connect API when these
credentials are configured:

- `APPLE_APP_STORE_CONNECT_KEY_ID`
- `APPLE_APP_STORE_CONNECT_ISSUER_ID`
- `APPLE_APP_STORE_CONNECT_PRIVATE_KEY`
- `APPLE_APP_STORE_CONNECT_APP_ID` (falls back to `APPLE_APP_ID`)

The API key must belong to a user with the Admin or App Manager role. This is a
different key type from the App Store Server API key.

Approval resolves the subscription by `plan_id`/product ID, finds the App Store
price point matching the requested USD amount in the base territory, resolves
equalizations, and schedules a `subscriptionPrices` change per configured
territory. The default is `USA`; set
`APPLE_APP_STORE_CONNECT_TERRITORIES=*` to use every equalized territory, or
provide a comma-separated list. Existing subscribers are preserved via
`preserveCurrentPrice`.

If the App Store Connect credentials are absent, the request falls back to
`pending_apple` and the manual checklist remains available:

1. Open App Store Connect and select the Lyda app.
2. Open the subscription group and select the matching Apple product.
3. Set the same price point as the approved request and wait for the change to
   become active.
4. Return to **Subscription pricing** in the internal dashboard, open the
   pending request and click **Apple steps complete**.

The final manual confirmation updates the DB and sends subscriber notifications.
Apple price points are a fixed ladder, so the requested amount must match an
available App Store price point in the base territory.

## Operational notes

- Approval links expire after 24 hours.
- A plan can have only one open request at a time.
- The request is rejected if the plan price changed after the request was made.
- Stripe prices are immutable; updating a price creates a new Price object. The
  old Price remains active until the scheduled price takes effect.
- Changing a plan can be scheduled only for a future date. The API applies due
  history rows on startup and once per minute while running.
- Apple applies price changes per territory. A partial Apple failure is recorded
  in the request and may require reconciling the affected territory in App Store
  Connect.
- Emails are sent sequentially to keep provider rate limits predictable.
- If email delivery for the approval fails, the request is marked failed and a
  new request must be created.
- The API process needs `MAIL_INTERNAL` and/or a primary email for the requesting
  admin. Set `DASHBOARD_URL` to the internal dashboard origin so email links open
  the dashboard.
