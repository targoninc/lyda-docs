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

- **id**: `number`
- **user_id**: `number`
- **subscription_id**: `number`
- **status**: `S​u​b​s​c​r​i​p​t​i​o​n​S​t​a​t​u​s`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`
- **cancelled_at**: `D​a​t​e`
- **previous_subscription**: `number`
- **external_subscription_id**: `string`
- **external_order_id**: `string`
- **gifted_by_user_id**: `number`
- **next_billing_time**: `D​a​t​e`
- **outstanding_balance**: `string`
- **currency_code**: `string`

