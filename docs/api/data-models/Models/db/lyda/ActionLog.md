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

- **id**: `number`
- **user_id**: `number`
- **action_name**: `string`
- **actioned_user_id**: `number`
- **additional_info**: `string`
- **created_at**: `string`

