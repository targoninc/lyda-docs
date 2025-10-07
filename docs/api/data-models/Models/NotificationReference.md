# NotificationReference

**Source:** `lyda-shared/src/Models/NotificationReference.ts`

## Dependencies

```typescript
import {NotificationReferenceType} from "../Enums/NotificationReferenceType.ts";
```

## NotificationReference

Represents a reference for a notification.

This interface defines the structure of a notification reference object,
which includes properties to identify and optionally associate an object with the notification.

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

