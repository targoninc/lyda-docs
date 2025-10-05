# TypedStatistic

**Source:** `lyda-shared/src/Models/TypedStatistic.ts`

## Dependencies

```typescript
import {Statistic} from "./Statistic.js";
import {ActivityTableName} from "../Enums/ActivityTableName.ts";
```

## TypedStatistic

**Type:** interface

```typescript
export interface TypedStatistic {
    type: ActivityTableName,
    stats: Statistic[]
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| type | [ActivityTableName](./ActivityTableName), | Yes | - |
| stats | [Statistic](./Statistic)[] | Yes | - |

