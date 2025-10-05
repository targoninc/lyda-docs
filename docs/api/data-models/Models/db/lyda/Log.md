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

- **id**: `number`
- **correlation_id**: `string`
- **time**: `string`
- **host**: `string`
- **stack**: `string`
- **logLevel**: `number`
- **message**: `string`
- **properties**: `string`

