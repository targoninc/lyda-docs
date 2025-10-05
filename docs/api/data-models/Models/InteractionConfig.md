# InteractionConfig

**Source:** `lyda-shared/src/Models/InteractionConfig.ts`

## InteractionConfig

**Type:** interface

```typescript
export interface InteractionConfig {
    toggleable?: boolean;
    icons: {
        default: string;
        interacted: string;
    }
    requiredOptions?: string[];
    optionalOptions?: string[];
}
```

### Properties

- **toggleable**: `boolean` (optional)
- **requiredOptions**: `string[]` (optional)
- **optionalOptions**: `string[]` (optional)

