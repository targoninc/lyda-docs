# Track

**Source:** `lyda-shared/src/Models/db/lyda/Track.ts`

## Dependencies

```typescript
import {TrackLike} from "./TrackLike.js";
import {Album} from "./Album.js";
import {Playlist} from "./Playlist.js";
import {Notification} from "./Notification.js";
import {Comment} from "./Comment.js";
import {TrackCollaborator} from "./TrackCollaborator.js";
import {User} from "./User.js";
import {Repost} from "./Repost.js";
import {InteractionMetadata} from "../../InteractionMetadata.ts";
import {Entity} from "@targoninc/ts-search";
```

## Track

**Type:** interface

```typescript
export interface Track extends Entity {
    repost_user_id?: number;
    repost?: Repost;
    user?: User;
    playlists?: Playlist[];
    albums?: Album[];
    notifications?: Notification[];
    collaborators?: TrackCollaborator[];
    user_id: number;
    title: string;
    isrc: string;
    artistname: string;
    upc: string;
    visibility: string;
    credits: string;
    loudness_data: string;
    genre: string;
    version: string;
    versionid: number;
    length: number;
    description: string;
    release_date: Date;
    updated_at: Date;
    created_at: Date;
    plays: number;
    secretcode: string;
    monetization: boolean;
    price: number;
    has_cover: boolean;
    processed: boolean;
    likes?: InteractionMetadata<TrackLike>;
    reposts?: InteractionMetadata<Repost>;
    comments?: InteractionMetadata<Comment>;
}
```

### Properties

- **repost_user_id**: `number` (optional)
- **repost**: `R​e​p​o​s​t` (optional)
- **user**: `U​s​e​r` (optional)
- **playlists**: `P​l​a​y​l​i​s​t[]` (optional)
- **albums**: `A​l​b​u​m[]` (optional)
- **notifications**: `N​o​t​i​f​i​c​a​t​i​o​n[]` (optional)
- **collaborators**: `T​r​a​c​k​C​o​l​l​a​b​o​r​a​t​o​r[]` (optional)
- **user_id**: `number`
- **title**: `string`
- **isrc**: `string`
- **artistname**: `string`
- **upc**: `string`
- **visibility**: `string`
- **credits**: `string`
- **loudness_data**: `string`
- **genre**: `string`
- **version**: `string`
- **versionid**: `number`
- **length**: `number`
- **description**: `string`
- **release_date**: `D​a​t​e`
- **updated_at**: `D​a​t​e`
- **created_at**: `D​a​t​e`
- **plays**: `number`
- **secretcode**: `string`
- **monetization**: `boolean`
- **price**: `number`
- **has_cover**: `boolean`
- **processed**: `boolean`

