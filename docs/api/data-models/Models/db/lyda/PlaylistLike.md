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

- **user_id**: `number`
- **playlist_id**: `number`
- **created_at**: `D​a​t​e`
- **user**: `U​s​e​r` (optional)

