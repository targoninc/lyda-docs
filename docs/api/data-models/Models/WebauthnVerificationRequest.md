# WebauthnVerificationRequest

**Source:** `lyda-shared/src/Models/WebauthnVerificationRequest.ts`

## Dependencies

```typescript
import {AuthenticationJSON} from "@passwordless-id/webauthn/dist/esm/types";
```

## WebauthnVerificationRequest

**Type:** interface

```typescript
export interface WebauthnVerificationRequest {
    verification: AuthenticationJSON;
    challenge: string;
}
```

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| verification | A​u​t​h​e​n​t​i​c​a​t​i​o​n​J​S​O​N | Yes | - |
| challenge | string | Yes | - |

