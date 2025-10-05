# Likable

**Source:** `lyda-shared/src/Models/Likable.ts`

## Dependencies

```typescript
import {TrackLike} from "./db/lyda/TrackLike.ts";
import {AlbumLike} from "./db/lyda/AlbumLike.ts";
import {PlaylistLike} from "./db/lyda/PlaylistLike.ts";
```

## Likable

**Type:** interface

```typescript
export interface Likable {
    likes?: (TrackLike | AlbumLike | PlaylistLike)[];
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| likes | ([TrackLike](./TrackLike) or [AlbumLike](./AlbumLike) or [PlaylistLike](./PlaylistLike))[] | No | - |

