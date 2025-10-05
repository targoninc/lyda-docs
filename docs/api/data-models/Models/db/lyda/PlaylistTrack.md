# PlaylistTrack

**Source:** `lyda-shared/src/Models/db/lyda/PlaylistTrack.ts`

## Dependencies

```typescript
import {Track} from "./Track.js";
```

## PlaylistTrack

**Type:** interface

```typescript
export interface PlaylistTrack {
    playlist_id: number;
    track_id: number;
    user_id: number;
    position: number;
    created_at: Date;
    track?: Track;
}
```

### Properties

- **playlist_id**: `number`
- **track_id**: `number`
- **user_id**: `number`
- **position**: `number`
- **created_at**: `D​a​t​e`
- **track**: `T​r​a​c​k` (optional)

