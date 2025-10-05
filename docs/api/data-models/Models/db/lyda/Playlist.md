# Playlist

**Source:** `lyda-shared/src/Models/db/lyda/Playlist.ts`

## Dependencies

```typescript
import {User} from "./User.js";
import {PlaylistLike} from "./PlaylistLike.js";
import {Entity} from "@targoninc/ts-search";
import {PlaylistTrack} from "./PlaylistTrack.ts";
import {InteractionMetadata} from "../../InteractionMetadata.ts";
import {TrackLike} from "./TrackLike.ts";
import {Repost} from "./Repost.ts";
import {Comment} from "./Comment.ts";
```

## Playlist

**Type:** interface

```typescript
export interface Playlist extends Entity {
    tracks?: PlaylistTrack[];
    user?: User;
    id: number;
    user_id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    visibility: string;
    has_cover: boolean;
    secretcode: string;
    likes?: InteractionMetadata<TrackLike>;
    /*reposts?: InteractionMetadata<Repost>;
    comments?: InteractionMetadata<Comment>;*/
}
```

### Properties

- **tracks**: `P​l​a​y​l​i​s​t​T​r​a​c​k[]` (optional)
- **user**: `U​s​e​r` (optional)
- **id**: `number`
- **user_id**: `number`
- **title**: `string`
- **description**: `string`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`
- **visibility**: `string`
- **has_cover**: `boolean`
- **secretcode**: `string`

