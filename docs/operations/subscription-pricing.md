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
6. Active subscribers of that plan receive an in-app notification. They receive
   an email unless they explicitly disabled
   `notification_subscription_price_change`.
7. Every step is recorded in `lyda.action_log`, including requester, approver,
   old/new price, provider result and errors.

Existing Stripe subscriptions are not repriced by this flow. The current policy
is that existing subscribers keep their existing price; the notification email
states this explicitly. Revisit this policy if prices should apply immediately
or at the next renewal.

## Apple App Store

Apple prices cannot be changed through the current backend credentials. A
request for an Apple plan moves to `pending_apple` after approval. The DB price
is not changed and subscribers are not notified yet.

An admin completes the following manual steps:

1. Open App Store Connect and select the Lyda app.
2. Open the subscription group and select the matching Apple product.
3. Set the same price point as the approved request, in the matching storefront
   base territory, and wait for the change to become active.
4. Return to **Subscription pricing** in the internal dashboard, open the
   pending request and click **Apple steps complete**.

That final confirmation updates the DB and sends the subscriber notifications.
If Apple later supports programmatic price-point changes for the configured
account, the manual step can be replaced by an API call in
`SubscriptionPriceChangeService.confirmAppleSteps`.

## Operational notes

- Approval links expire after 24 hours.
- A plan can have only one open request at a time.
- The request is rejected if the plan price changed after the request was made.
- Stripe prices are immutable; updating a price creates a new Price object.
- Emails are sent sequentially to keep provider rate limits predictable.
- If email delivery for the approval fails, the request is marked failed and a
  new request must be created.
- The API process needs `MAIL_INTERNAL` and/or a primary email for the requesting
  admin. Set `DASHBOARD_URL` to the internal dashboard origin so email links open
  the dashboard.
