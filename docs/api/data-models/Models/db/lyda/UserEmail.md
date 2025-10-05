# UserEmail

**Source:** `lyda-shared/src/Models/db/lyda/UserEmail.ts`

## UserEmail

**Type:** interface

```typescript
export interface UserEmail {
    user_id: number;
    email: string;
    primary: boolean;
    verification_code: string;
    verified: boolean;
    verified_at: Date|null;
}
```

### Properties

- **user_id**: `number`
- **email**: `string`
- **primary**: `boolean`
- **verification_code**: `string`
- **verified**: `boolean`
- **verified_at**: `D​a​t​e|null`

