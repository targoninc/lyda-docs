# PublicKey

**Source:** `lyda-shared/src/Models/db/lyda/PublicKey.ts`

## PublicKey

**Type:** interface

```typescript
export interface PublicKey {
    id: string;
    key_id: string;
    public_key: string;
    algorithm: string;
    passkey_user_id: string;
    backed_up: boolean;
    name: string;
    transports: string;
    created_at: Date;
    updated_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | string | Yes | - |
| key_id | string | Yes | - |
| public_key | string | Yes | - |
| algorithm | string | Yes | - |
| passkey_user_id | string | Yes | - |
| backed_up | boolean | Yes | - |
| name | string | Yes | - |
| transports | string | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |

