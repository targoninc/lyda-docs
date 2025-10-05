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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tracks | [PlaylistTrack](/api/data-models/Models/db/lyda/PlaylistTrack)[] | No | - |
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |
| id | number | Yes | - |
| user_id | number | Yes | - |
| title | string | Yes | - |
| description | string | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |
| visibility | string | Yes | - |
| has_cover | boolean | Yes | - |
| secretcode | string | Yes | - |
| likes | [InteractionMetadata](/api/data-models/Models/InteractionMetadata)\<[TrackLike](/api/data-models/Models/db/lyda/TrackLike)\> | No | - |

