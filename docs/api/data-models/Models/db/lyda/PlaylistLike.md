# PlaylistLike

**Source:** `lyda-shared/src/Models/db/lyda/PlaylistLike.ts`

## Dependencies

```typescript
import {User} from "./User.js";
```

## PlaylistLike

**Type:** interface

```typescript
export interface PlaylistLike {
    user_id: number;
    playlist_id: number;
    created_at: Date;
    user?: User;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| user_id | number | Yes | - |
| playlist_id | number | Yes | - |
| created_at | D​a​t​e | Yes | - |
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |

