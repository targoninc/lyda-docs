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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| user_id | number | Yes | - |
| email | string | Yes | - |
| primary | boolean | Yes | - |
| verification_code | string | Yes | - |
| verified | boolean | Yes | - |
| verified_at | D​a​t​e or null | Yes | - |

