# BillingHistory

**Source:** `lyda-shared/src/Models/db/finance/BillingHistory.ts`

## BillingHistory

**Type:** interface

```typescript
export interface BillingHistory {
    id: number;
    user_id: number;
    product_id: number;
    billing_type: string;
    amount: number;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| user_id | number | Yes | - |
| product_id | number | Yes | - |
| billing_type | string | Yes | - |
| amount | number | Yes | - |
| created_at | D​a​t​e | Yes | - |

