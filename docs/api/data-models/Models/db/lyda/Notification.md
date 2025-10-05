# Notification

**Source:** `lyda-shared/src/Models/db/lyda/Notification.ts`

## Dependencies

```typescript
import {NotificationReference} from "../../NotificationReference.ts";
```

## Notification

**Type:** interface

```typescript
export interface Notification {
    references?: NotificationReference[];
    id: number;
    user_id: number;
    track_id: number;
    type: string;
    search_key: string;
    message: string;
    is_read: boolean;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| references | [NotificationReference](./NotificationReference)[] | No | - |
| id | number | Yes | - |
| user_id | number | Yes | - |
| track_id | number | Yes | - |
| type | string | Yes | - |
| search_key | string | Yes | - |
| message | string | Yes | - |
| is_read | boolean | Yes | - |
| created_at | D​a​t​e | Yes | - |

