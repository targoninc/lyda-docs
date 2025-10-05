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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| collab_type | [CollaboratorType](/api/data-models/Models/db/lyda/CollaboratorType) | No | - |
| track | [Track](/api/data-models/Models/db/lyda/Track) | No | - |
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |
| track_id | number | Yes | - |
| user_id | number | Yes | - |
| type | number | Yes | - |
| approved | boolean | Yes | - |
| denied | boolean | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |

