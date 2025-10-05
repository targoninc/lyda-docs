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

- **user**: `U​s​e​r` (optional)
- **user_id**: `number`
- **track_id**: `number`
- **created_at**: `D​a​t​e`

