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

- **tracks**: `T​r​a​c​k[]`
- **albums**: `A​l​b​u​m[]`
- **playlists**: `P​l​a​y​l​i​s​t[]`

