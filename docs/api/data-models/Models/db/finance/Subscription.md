# Subscription

**Source:** `lyda-shared/src/Models/db/finance/Subscription.ts`

## Dependencies

```typescript
import {SubscriptionStatus} from "../../../Enums/SubscriptionStatus.ts";
```

## Subscription

**Type:** interface

```typescript
export interface Subscription {
    id: number;
    user_id: number;
    subscription_id: number;
    status: SubscriptionStatus;
    created_at: Date;
    updated_at: Date;
    cancelled_at: Date;
    previous_subscription: number;
    external_subscription_id: string;
    external_order_id: string;
    gifted_by_user_id: number;
    next_billing_time: Date;
    outstanding_balance: string;
    currency_code: string;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| user_id | number | Yes | - |
| subscription_id | number | Yes | - |
| status | [SubscriptionStatus](./SubscriptionStatus) | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |
| cancelled_at | D​a​t​e | Yes | - |
| previous_subscription | number | Yes | - |
| external_subscription_id | string | Yes | - |
| external_order_id | string | Yes | - |
| gifted_by_user_id | number | Yes | - |
| next_billing_time | D​a​t​e | Yes | - |
| outstanding_balance | string | Yes | - |
| currency_code | string | Yes | - |

