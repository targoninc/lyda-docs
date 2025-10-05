# PaypalBatchPayment

**Source:** `lyda-shared/src/Models/db/finance/PaypalBatchPayment.ts`

## Dependencies

```typescript
import {PaypalBatchStatus} from "../../../Enums/PaypalBatchStatus.ts";
```

## PaypalBatchPayment

**Type:** interface

```typescript
export interface PaypalBatchPayment {
    id: number;
    paypal_batch_id: string;
    request_items_json: string;
    paypal_batch_status: PaypalBatchStatus;
    created_at: Date;
    updated_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| paypal_batch_id | string | Yes | - |
| request_items_json | string | Yes | - |
| paypal_batch_status | P​a​y​p​a​l​B​a​t​c​h​S​t​a​t​u​s | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |

