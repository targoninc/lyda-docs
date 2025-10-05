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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| playlist_id | number | Yes | - |
| track_id | number | Yes | - |
| user_id | number | Yes | - |
| position | number | Yes | - |
| created_at | D​a​t​e | Yes | - |
| track | [Track](./Track) | No | - |

