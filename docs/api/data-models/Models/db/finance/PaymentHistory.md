# PaymentHistory

**Source:** `lyda-shared/src/Models/db/finance/PaymentHistory.ts`

## PaymentHistory

**Type:** interface

```typescript
export interface PaymentHistory {
    id: number;
    received_at: Date;
    user_id: number;
    product_id: number;
    subscription_id: number;
    currency: string;
    payment_processor: string;
    external_id: string;
    total: number;
    fees: number;
    received: number;
    succeeded: boolean;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| received_at | D​a​t​e | Yes | - |
| user_id | number | Yes | - |
| product_id | number | Yes | - |
| subscription_id | number | Yes | - |
| currency | string | Yes | - |
| payment_processor | string | Yes | - |
| external_id | string | Yes | - |
| total | number | Yes | - |
| fees | number | Yes | - |
| received | number | Yes | - |
| succeeded | boolean | Yes | - |

