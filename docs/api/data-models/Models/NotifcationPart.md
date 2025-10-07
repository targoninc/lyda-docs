# NotifcationPart

**Source:** `lyda-shared/src/Models/NotifcationPart.ts`

## NotificationPart

Represents a part of a notification that can be displayed as a separate component

**Type:** interface

```typescript
export interface NotificationPart {
    type: "profile" | "track" | "album" | "playlist",
    text?: string,
    id?: number
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | "profile" or "track" or "album" or "playlist", | Yes | - |
| text | string, | No | - |
| id | number | No | - |

