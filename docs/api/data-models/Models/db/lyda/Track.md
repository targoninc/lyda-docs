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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| repost_user_id | number | No | - |
| repost | [Repost](/api/data-models/Models/db/lyda/Repost) | No | - |
| user | [User](/api/data-models/Models/db/lyda/User) | No | - |
| playlists | [Playlist](/api/data-models/Models/db/lyda/Playlist)[] | No | - |
| albums | [Album](/api/data-models/Models/db/lyda/Album)[] | No | - |
| notifications | [Notification](/api/data-models/Models/db/lyda/Notification)[] | No | - |
| collaborators | [TrackCollaborator](/api/data-models/Models/db/lyda/TrackCollaborator)[] | No | - |
| user_id | number | Yes | - |
| title | string | Yes | - |
| isrc | string | Yes | - |
| artistname | string | Yes | - |
| upc | string | Yes | - |
| visibility | string | Yes | - |
| credits | string | Yes | - |
| loudness_data | string | Yes | - |
| genre | string | Yes | - |
| version | string | Yes | - |
| versionid | number | Yes | - |
| length | number | Yes | - |
| description | string | Yes | - |
| release_date | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |
| created_at | D​a​t​e | Yes | - |
| plays | number | Yes | - |
| secretcode | string | Yes | - |
| monetization | boolean | Yes | - |
| price | number | Yes | - |
| has_cover | boolean | Yes | - |
| processed | boolean | Yes | - |
| likes | [InteractionMetadata](/api/data-models/Models/InteractionMetadata)\<[TrackLike](/api/data-models/Models/db/lyda/TrackLike)\> | No | - |
| reposts | [InteractionMetadata](/api/data-models/Models/InteractionMetadata)\<[Repost](/api/data-models/Models/db/lyda/Repost)\> | No | - |
| comments | [InteractionMetadata](/api/data-models/Models/InteractionMetadata)\<[Comment](/api/data-models/Models/db/lyda/Comment)\> | No | - |

