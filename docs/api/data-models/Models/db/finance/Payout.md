# Payout

**Source:** `lyda-shared/src/Models/db/finance/Payout.ts`

## Dependencies

```typescript
import {PaymentStatus} from "../../../Enums/PaymentStatus.ts";
```

## Payout

**Type:** interface

```typescript
export interface Payout {
    id: number;
    payout_batch_id: string;
    user_id: number;
    amount_ct: number;
    status: PaymentStatus;
    created_at: Date;
    updated_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| payout_batch_id | string | Yes | - |
| user_id | number | Yes | - |
| amount_ct | number | Yes | - |
| status | [PaymentStatus](/api/data-models/Enums/PaymentStatus) | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |

