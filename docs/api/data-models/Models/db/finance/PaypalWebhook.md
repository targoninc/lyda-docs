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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | - |
| type | string | Yes | - |
| received_at | D​a​t​e | Yes | - |
| content | string | Yes | - |
| paypal_user_id | string | Yes | - |
| handled | boolean | Yes | - |
| updated_at | D​a​t​e | Yes | - |

