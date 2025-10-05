# Log

**Source:** `lyda-shared/src/Models/db/lyda/Log.ts`

## Log

**Type:** interface

```typescript
export interface Log {
    id: number;
    correlation_id: string;
    time: string;
    host: string;
    stack: string;
    logLevel: number;
    message: string;
    properties: string;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | number | Yes | - |
| correlation_id | string | Yes | - |
| time | string | Yes | - |
| host | string | Yes | - |
| stack | string | Yes | - |
| logLevel | number | Yes | - |
| message | string | Yes | - |
| properties | string | Yes | - |

