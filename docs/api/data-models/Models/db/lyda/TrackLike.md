# TrackLike

**Source:** `lyda-shared/src/Models/db/lyda/TrackLike.ts`

## Dependencies

```typescript
import {User} from "./User.js";
```

## TrackLike

**Type:** interface

```typescript
export interface TrackLike {
    user?: User;
    user_id: number;
    track_id: number;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| user | [User](./User) | No | - |
| user_id | number | Yes | - |
| track_id | number | Yes | - |
| created_at | D​a​t​e | Yes | - |

