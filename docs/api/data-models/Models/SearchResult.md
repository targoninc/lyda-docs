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

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| id | `number` | Yes | - |
| url | `string` | Yes | - |
| exactMatch | `boolean` | Yes | - |
| type | `string` | Yes | - |
| display | `string` | Yes | - |
| subtitle | `string` | No | - |
| hasImage | `boolean` | No | - |

