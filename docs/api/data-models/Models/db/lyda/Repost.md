# Repost

**Source:** `lyda-shared/src/Models/db/lyda/Repost.ts`

## Dependencies

```typescript
import {User} from "./User.js";
```

## Repost

**Type:** interface

```typescript
export interface Repost {
    user?: User;
    user_id: number;
    track_id: number;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |
| user_id | number | Yes | - |
| track_id | number | Yes | - |
| created_at | D​a​t​e | Yes | - |

