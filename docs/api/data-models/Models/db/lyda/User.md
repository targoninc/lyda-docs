# User

**Source:** `lyda-shared/src/Models/db/lyda/User.ts`

## Dependencies

```typescript
import {Follow} from "./Follow.js";
import {UserBadge} from "./UserBadge.js";
import {Usersetting} from "./Usersetting.js";
import {Badge} from "./Badge.js";
import {Subscription} from "../finance/Subscription.js";
import {UserEmail} from "./UserEmail.js";
import {Permission} from "./Permission.js";
import {Entity} from "@targoninc/ts-search";
import {UserTotp} from "./UserTotp.ts";
import {PublicKey} from "./PublicKey.ts";
```

## User

**Type:** interface

```typescript
export interface User extends Entity {
    permissions?: Permission[];
    subscription?: Subscription;
    settings?: Usersetting[];
    badges?: Badge[];
    userBadges?: UserBadge[];
    follows?: Follow[];
    following?: Follow[];
    totp?: UserTotp[];
    public_keys?: PublicKey[];
    giftedSubscriptions?: Subscription[];
    id: number;
    username: string;
    mfa_enabled: boolean;
    emails: UserEmail[];
    password_hash: string;
    displayname: string;
    description: string;
    password_token: string|null;
    verified: boolean;
    verification_status: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
    lastlogin?: Date;
    secondlastlogin?: Date;
    password_updated_at: Date;
    tos_agreed_at: Date;
    ip: string;
    has_avatar: boolean;
    has_banner: boolean;
    email_mfa_code: string;
    passkey_user_id: string;
}
```

### Properties

- **permissions**: `P​e​r​m​i​s​s​i​o​n[]` (optional)
- **subscription**: `S​u​b​s​c​r​i​p​t​i​o​n` (optional)
- **settings**: `U​s​e​r​s​e​t​t​i​n​g[]` (optional)
- **badges**: `B​a​d​g​e[]` (optional)
- **userBadges**: `U​s​e​r​B​a​d​g​e[]` (optional)
- **follows**: `F​o​l​l​o​w[]` (optional)
- **following**: `F​o​l​l​o​w[]` (optional)
- **totp**: `U​s​e​r​T​o​t​p[]` (optional)
- **public_keys**: `P​u​b​l​i​c​K​e​y[]` (optional)
- **giftedSubscriptions**: `S​u​b​s​c​r​i​p​t​i​o​n[]` (optional)
- **id**: `number`
- **username**: `string`
- **mfa_enabled**: `boolean`
- **emails**: `U​s​e​r​E​m​a​i​l[]`
- **password_hash**: `string`
- **displayname**: `string`
- **description**: `string`
- **password_token**: `string|null`
- **verified**: `boolean`
- **verification_status**: `string`
- **created_at**: `D​a​t​e`
- **updated_at**: `D​a​t​e`
- **deleted_at**: `D​a​t​e`
- **lastlogin**: `D​a​t​e` (optional)
- **secondlastlogin**: `D​a​t​e` (optional)
- **password_updated_at**: `D​a​t​e`
- **tos_agreed_at**: `D​a​t​e`
- **ip**: `string`
- **has_avatar**: `boolean`
- **has_banner**: `boolean`
- **email_mfa_code**: `string`
- **passkey_user_id**: `string`

