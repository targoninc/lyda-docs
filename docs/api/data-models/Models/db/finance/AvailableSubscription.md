# AvailableSubscription

**Source:** `lyda-shared/src/Models/db/finance/AvailableSubscription.ts`

## AvailableSubscription

**Type:** interface

```typescript
export interface AvailableSubscription {
    id: number;
    product_id: number;
    name: string;
    description: string;
    service: string;
    plan_id: string;
    term_type: string;
    price_per_term: number;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| product_id | number | Yes | - |
| name | string | Yes | - |
| description | string | Yes | - |
| service | string | Yes | - |
| plan_id | string | Yes | - |
| term_type | string | Yes | - |
| price_per_term | number | Yes | - |

