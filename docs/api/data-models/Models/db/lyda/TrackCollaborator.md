# TrackCollaborator

**Source:** `lyda-shared/src/Models/db/lyda/TrackCollaborator.ts`

## Dependencies

```typescript
import {User} from "./User.js";
import {CollaboratorType} from "./CollaboratorType.js";
import {Track} from "./Track.ts";
```

## TrackCollaborator

**Type:** interface

```typescript
export interface TrackCollaborator {
    collab_type?: CollaboratorType;
    track?: Track;
    user?: User;
    track_id: number;
    user_id: number;
    type: number;
    approved: boolean;
    denied: boolean;
    created_at: Date;
    updated_at: Date;
}
```

### Properties

- **collab_type**: `C​o​l​l​a​b​o​r​a​t​o​r​T​y​p​e` (optional)
- **track**: `T​r​a​c​k` (optional)
- **user**: `U​s​e​r` (optional)
- **track_id**: `number`
- **user_id**: `number`
- **type**: `number`
- **approved**: `boolean`
- **denied**: `boolean`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`

