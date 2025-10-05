# SearchResult

**Source:** `lyda-shared/src/Models/SearchResult.ts`

## SearchResult

**Type:** interface

```typescript
export interface SearchResult {
    id: number;
    url: string;
    exactMatch: boolean;
    type: string;
    display: string;
    subtitle?: string;
    hasImage?: boolean;
}
```

### Properties

- **id**: `number`
- **url**: `string`
- **exactMatch**: `boolean`
- **type**: `string`
- **display**: `string`
- **subtitle**: `string` (optional)
- **hasImage**: `boolean` (optional)

