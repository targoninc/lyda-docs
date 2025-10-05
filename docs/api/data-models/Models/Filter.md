# Filter

**Source:** `lyda-shared/src/Models/Filter.ts`

## Dependencies

```typescript
import {InputType} from "@targoninc/jess";
```

## Filter

**Type:** interface

```typescript
export interface Filter {
    key: string;
    name: string;
    type: InputType;
    default?: any;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| key | string | Yes | - |
| name | string | Yes | - |
| type | I​n​p​u​t​T​y​p​e | Yes | - |
| default | any | No | - |

