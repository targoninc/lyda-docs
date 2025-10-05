# UserTotp

**Source:** `lyda-shared/src/Models/db/lyda/UserTotp.ts`

## UserTotp

**Type:** interface

```typescript
export interface UserTotp {
    id: number;
    user_id: number;
    secret: string;
    verified: boolean;
    name: string;
    created_at: Date;
    updated_at: Date;
}
```

### Properties

- **id**: `number`
- **user_id**: `number`
- **secret**: `string`
- **verified**: `boolean`
- **name**: `string`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`

