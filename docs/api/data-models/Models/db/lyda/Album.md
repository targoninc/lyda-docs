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

- **tracks**: `A​l​b​u​m​T​r​a​c​k[]` (optional)
- **user**: `U​s​e​r` (optional)
- **id**: `number`
- **user_id**: `number`
- **title**: `string`
- **description**: `string`
- **upc**: `string`
- **release_date**: `D​a​t​e`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`
- **visibility**: `string`
- **secretcode**: `string`
- **has_cover**: `boolean`
- **price**: `number`

