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

- **type**: `"album" | "playlist" | string`
- **name**: `string`
- **id**: `number`
- **entity**: `A​l​b​u​m|P​l​a​y​l​i​s​t` (optional)

