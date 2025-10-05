# WebauthnRegistrationRequest

**Source:** `lyda-shared/src/Models/WebauthnRegistrationRequest.ts`

## WebauthnRegistrationRequest

**Type:** interface

```typescript
export interface WebauthnRegistrationRequest {
    registration: {
        user: {
            id: string;
            name: string;
            displayName: string;
        };
        credential: {
            id: string;
            publicKey: string;
            algorithm: string;
            transports: string[];
        };
        authenticatorData: string;
        clientData: string;
    },
    challenge: string;
    name: string;
}
```

### Properties

- **challenge**: `string`
- **name**: `string`

