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

- **likes**: `(T​r​a​c​k​L​i​k​e | A​l​b​u​m​L​i​k​e | P​l​a​y​l​i​s​t​L​i​k​e)[]` (optional)

