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
| type | [NotificationReferenceType](/api/data-models/Enums/NotificationReferenceType) | Yes | - |
| id | number | Yes | - |
| object | any | No | - |

