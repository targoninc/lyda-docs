# AlbumTrack

**Source:** `lyda-shared/src/Models/db/lyda/AlbumTrack.ts`

## Dependencies

```typescript
import {Track} from "./Track.js";
```

## AlbumTrack

**Type:** interface

```typescript
export interface AlbumTrack {
    track?: Track;
    album_id: number;
    track_id: number;
    user_id: number;
    position: number;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| track | T​r​a​c​k | No | - |
| album_id | number | Yes | - |
| track_id | number | Yes | - |
| user_id | number | Yes | - |
| position | number | Yes | - |
| created_at | D​a​t​e | Yes | - |

