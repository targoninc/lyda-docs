# Comment

**Source:** `lyda-shared/src/Models/db/lyda/Comment.ts`

## Dependencies

```typescript
import {User} from "./User.js";
import {Track} from "./Track.js";
```

## Comment

**Type:** interface

```typescript
export interface Comment {
    comments?: Comment[];
    user?: User;
    track?: Track;
    canEdit?: boolean;
    id: number;
    parent_id: number;
    track_id: number;
    user_id: number;
    content: string;
    created_at: Date;
    potentially_harmful: boolean;
    hidden: boolean;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| comments | C​o​m​m​e​n​t[] | No | - |
| user | [User](./User) | No | - |
| track | [Track](./Track) | No | - |
| canEdit | boolean | No | - |
| id | number | Yes | - |
| parent_id | number | Yes | - |
| track_id | number | Yes | - |
| user_id | number | Yes | - |
| content | string | Yes | - |
| created_at | D​a​t​e | Yes | - |
| potentially_harmful | boolean | Yes | - |
| hidden | boolean | Yes | - |

