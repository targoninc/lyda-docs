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

- **id**: `bigint`
- **year**: `number`
- **month**: `number`
- **day**: `number`
- **amount_ct**: `number`
- **label**: `string`
- **expense_group**: `string`

