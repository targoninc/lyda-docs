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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| permissions | P​e​r​m​i​s​s​i​o​n[] | No | - |
| subscription | S​u​b​s​c​r​i​p​t​i​o​n | No | - |
| settings | U​s​e​r​s​e​t​t​i​n​g[] | No | - |
| badges | B​a​d​g​e[] | No | - |
| userBadges | U​s​e​r​B​a​d​g​e[] | No | - |
| follows | F​o​l​l​o​w[] | No | - |
| following | F​o​l​l​o​w[] | No | - |
| totp | U​s​e​r​T​o​t​p[] | No | - |
| public_keys | P​u​b​l​i​c​K​e​y[] | No | - |
| giftedSubscriptions | S​u​b​s​c​r​i​p​t​i​o​n[] | No | - |
| id | number | Yes | - |
| username | string | Yes | - |
| mfa_enabled | boolean | Yes | - |
| emails | U​s​e​r​E​m​a​i​l[] | Yes | - |
| password_hash | string | Yes | - |
| displayname | string | Yes | - |
| description | string | Yes | - |
| password_token | string or null | Yes | - |
| verified | boolean | Yes | - |
| verification_status | string | Yes | - |
| created_at | D​a​t​e | Yes | - |
| updated_at | D​a​t​e | Yes | - |
| deleted_at | D​a​t​e | Yes | - |
| lastlogin | D​a​t​e | No | - |
| secondlastlogin | D​a​t​e | No | - |
| password_updated_at | D​a​t​e | Yes | - |
| tos_agreed_at | D​a​t​e | Yes | - |
| ip | string | Yes | - |
| has_avatar | boolean | Yes | - |
| has_banner | boolean | Yes | - |
| email_mfa_code | string | Yes | - |
| passkey_user_id | string | Yes | - |

