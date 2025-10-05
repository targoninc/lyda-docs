# PlayingFrom

**Source:** `lyda-shared/src/Models/PlayingFrom.ts`

## Dependencies

```typescript
import {Album} from "./db/lyda/Album.ts";
import {Playlist} from "./db/lyda/Playlist.ts";
```

## PlayingFrom

**Type:** interface

```typescript
export interface PlayingFrom {
    type: "album" | "playlist" | string;
    name: string;
    id: number;
    entity?: Album|Playlist;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | "album" or "playlist" or string | Yes | - |
| name | string | Yes | - |
| id | number | Yes | - |
| entity | [Album](/api/data-models/Models/db/lyda/Album) or [Playlist](/api/data-models/Models/db/lyda/Playlist) | No | - |

