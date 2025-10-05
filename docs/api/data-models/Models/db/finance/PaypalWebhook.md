# PaypalWebhook

**Source:** `lyda-shared/src/Models/db/finance/PaypalWebhook.ts`

## PaypalWebhook

**Type:** interface

```typescript
export interface PaypalWebhook {
    id: string;
    type: string;
    received_at: Date;
    content: string;
    paypal_user_id: string;
    handled: boolean;
    updated_at: Date;
}
```

### Properties

- **id**: `string`
- **type**: `string`
- **received_at**: `D​a​t​e`
- **content**: `string`
- **paypal_user_id**: `string`
- **handled**: `boolean`
- **updated_at**: `D​a​t​e`

