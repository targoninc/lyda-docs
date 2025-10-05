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

- **id**: `string`
- **key_id**: `string`
- **public_key**: `string`
- **algorithm**: `string`
- **passkey_user_id**: `string`
- **backed_up**: `boolean`
- **name**: `string`
- **transports**: `string`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`

