# Expense

**Source:** `lyda-shared/src/Models/db/finance/Expense.ts`

## Expense

**Type:** interface

```typescript
export interface Expense {
    id: bigint;
    year: number;
    month: number;
    day: number;
    amount_ct: number;
    label: string;
    expense_group: string;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | `bigint` | Yes | - |
| year | `number` | Yes | - |
| month | `number` | Yes | - |
| day | `number` | Yes | - |
| amount_ct | `number` | Yes | - |
| label | `string` | Yes | - |
| expense_group | `string` | Yes | - |

