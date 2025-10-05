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

- **comments**: `C​o​m​m​e​n​t[]` (optional)
- **user**: `U​s​e​r` (optional)
- **track**: `T​r​a​c​k` (optional)
- **canEdit**: `boolean` (optional)
- **id**: `number`
- **parent_id**: `number`
- **track_id**: `number`
- **user_id**: `number`
- **content**: `string`
- **created_at**: `D​a​t​e`
- **potentially_harmful**: `boolean`
- **hidden**: `boolean`

