# ListTrack

**Source:** `lyda-shared/src/Models/ListTrack.ts`

## Dependencies

```typescript
import {Track} from "./db/lyda/Track.ts";
```

## ListTrack

**Type:** interface

```typescript
export interface ListTrack {
    track_id: number;
    position: number;
    track?: Track;
}
```

### Properties

- **track_id**: `number`
- **position**: `number`
- **track**: `T​r​a​c​k` (optional)

