# AlbumLike

**Source:** `lyda-shared/src/Models/db/lyda/AlbumLike.ts`

## Dependencies

```typescript
import {User} from "./User.js";
```

## AlbumLike

**Type:** interface

```typescript
export interface AlbumLike {
    user?: User;
    user_id: number;
    album_id: number;
    created_at: Date;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| user | [User](./User) | No | - |
| user_id | number | Yes | - |
| album_id | number | Yes | - |
| created_at | D​a​t​e | Yes | - |

