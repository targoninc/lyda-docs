# ActionLog

**Source:** `lyda-shared/src/Models/db/lyda/ActionLog.ts`

## ActionLog

**Type:** interface

```typescript
export interface ActionLog {
    id: number;
    user_id: number;
    action_name: string;
    actioned_user_id: number;
    additional_info: string;
    created_at: string;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| user_id | number | Yes | - |
| action_name | string | Yes | - |
| actioned_user_id | number | Yes | - |
| additional_info | string | Yes | - |
| created_at | string | Yes | - |

