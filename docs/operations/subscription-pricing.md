# Subscription price changes

Subscription prices are managed from the internal dashboard by users with the
`canManageSubscriptionPricing` permission. The dashboard is the only supported
way to change `finance.available_subscriptions.price_per_term`.

## Flow

1. An admin enters a new price for one plan and requests the change.
2. The API creates a `finance.subscription_price_changes` row and emails an
   approval link. The link contains a single-use, expiring token. Only its
   SHA-256 hash is stored.
3. Opening the link shows the old and new price. The confirm button remains
   disabled for 10 seconds. The API also stores the opening time and rejects an
   apply that arrives before the countdown has elapsed.
4. Confirming claims the request and clears the token. The request can no longer
   be approved or cancelled.
5. The DB price is updated and, for Stripe plans, a new managed Stripe price is
   created and the previous price is deactivated. Checkout reads the new
   `plan_id`/`price_per_term` immediately.
6. Every active subscriber of that plan receives an in-app notification and an
   email. Price-change notifications are mandatory and cannot be disabled.
7. Every step is recorded in `lyda.action_log`, including requester, approver,
   old/new price, provider result and errors.

Existing Stripe subscriptions are not repriced by this flow. The current policy
is that existing subscribers keep their existing price; the notification email
states this explicitly. Revisit this policy if prices should apply immediately
or at the next renewal.

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
- Stripe prices are immutable; updating a price creates a new Price object.
- Apple applies price changes per territory. A partial Apple failure is recorded
  in the request and may require reconciling the affected territory in App Store
  Connect.
- Emails are sent sequentially to keep provider rate limits predictable.
- If email delivery for the approval fails, the request is marked failed and a
  new request must be created.
- The API process needs `MAIL_INTERNAL` and/or a primary email for the requesting
  admin. Set `DASHBOARD_URL` to the internal dashboard origin so email links open
  the dashboard.
