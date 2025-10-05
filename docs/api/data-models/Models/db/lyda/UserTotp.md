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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | `number` | Yes | - |
| user_id | `number` | Yes | - |
| secret | `string` | Yes | - |
| verified | `boolean` | Yes | - |
| name | `string` | Yes | - |
| created_at | `D​a​t​e` | Yes | - |
| updated_at | `D​a​t​e` | Yes | - |

