# Album

**Source:** `lyda-shared/src/Models/db/lyda/Album.ts`

## Dependencies

```typescript
import {User} from "./User.js";
import {AlbumTrack} from "./AlbumTrack.js";
import {Entity} from "@targoninc/ts-search";
import {InteractionMetadata} from "../../InteractionMetadata.ts";
import {TrackLike} from "./TrackLike.ts";
```

## Album

**Type:** interface

```typescript
export interface Album extends Entity {
    tracks?: AlbumTrack[];
    user?: User;
    id: number;
    user_id: number;
    title: string;
    description: string;
    upc: string;
    release_date: Date;
    created_at: Date;
    updated_at: Date;
    visibility: string;
    secretcode: string;
    has_cover: boolean;
    price: number;
    likes?: InteractionMetadata<TrackLike>;
    /*reposts?: InteractionMetadata<Repost>;
    comments?: InteractionMetadata<Comment>;*/
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| tracks | [AlbumTrack](/api/data-models/Models/db/lyda/AlbumTrack)[] | No | - |
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |
| id | number | Yes | - |
| user_id | number | Yes | - |
| title | string | Yes | - |
| description | string | Yes | - |
| upc | string | Yes | - |
| release_date | D​a​t​e | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |
| visibility | string | Yes | - |
| secretcode | string | Yes | - |
| has_cover | boolean | Yes | - |
| price | number | Yes | - |
| likes | [InteractionMetadata](/api/data-models/Models/InteractionMetadata)\<[TrackLike](/api/data-models/Models/db/lyda/TrackLike)\> | No | - |

