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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| track_id | number | Yes | - |
| position | number | Yes | - |
| track | [Track](./Track) | No | - |

