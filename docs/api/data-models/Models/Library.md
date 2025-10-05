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
| tracks | [Track](./Track)[] | Yes | - |
| albums | [Album](./Album)[] | Yes | - |
| playlists | [Playlist](./Playlist)[] | Yes | - |

