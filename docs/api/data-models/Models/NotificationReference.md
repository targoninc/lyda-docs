# NotificationReference

**Source:** `lyda-shared/src/Models/NotificationReference.ts`

## Dependencies

```typescript
import {NotificationReferenceType} from "../Enums/NotificationReferenceType.ts";
```

## NotificationReference

**Type:** interface

```typescript
export interface NotificationReference {
    type: NotificationReferenceType;
    id: number;
    object?: any;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | `N​o​t​i​f​i​c​a​t​i​o​n​R​e​f​e​r​e​n​c​e​T​y​p​e` | Yes | - |
| id | `number` | Yes | - |
| object | `any` | No | - |

