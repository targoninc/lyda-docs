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

- **track**: `T​r​a​c​k` (optional)
- **album_id**: `number`
- **track_id**: `number`
- **user_id**: `number`
- **position**: `number`
- **created_at**: `D​a​t​e`

