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
| type | [ActivityTableName](/api/data-models/Enums/ActivityTableName), | Yes | - |
| stats | [Statistic](/api/data-models/Models/Statistic)[] | Yes | - |

