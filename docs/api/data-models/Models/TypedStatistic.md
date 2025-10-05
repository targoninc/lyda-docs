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
| type | `A​c​t​i​v​i​t​y​T​a​b​l​e​N​a​m​e,` | Yes | - |
| stats | `S​t​a​t​i​s​t​i​c[]` | Yes | - |

