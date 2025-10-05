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

- **id**: `number`
- **payout_batch_id**: `string`
- **user_id**: `number`
- **amount_ct**: `number`
- **status**: `P​a​y​m​e​n​t​S​t​a​t​u​s`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`

