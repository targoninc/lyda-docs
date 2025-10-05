# Library

**Source:** `lyda-shared/src/Models/Library.ts`

## Dependencies

```typescript
import {Track} from "./db/lyda/Track.ts";
import {Album} from "./db/lyda/Album.ts";
import {Playlist} from "./db/lyda/Playlist.ts";
```

## Library

**Type:** interface

```typescript
export interface Library {
    tracks: Track[];
    albums: Album[];
    playlists: Playlist[];
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tracks | T​r​a​c​k[] | Yes | - |
| albums | A​l​b​u​m[] | Yes | - |
| playlists | P​l​a​y​l​i​s​t[] | Yes | - |

