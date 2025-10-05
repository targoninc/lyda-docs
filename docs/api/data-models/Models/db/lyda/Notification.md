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

- **references**: `N​o​t​i​f​i​c​a​t​i​o​n​R​e​f​e​r​e​n​c​e[]` (optional)
- **id**: `number`
- **user_id**: `number`
- **track_id**: `number`
- **type**: `string`
- **search_key**: `string`
- **message**: `string`
- **is_read**: `boolean`
- **created_at**: `D​a​t​e`

