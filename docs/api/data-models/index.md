# Data Models

This section contains documentation for all TypeScript models from the `lyda-shared` repository. The documentation is automatically generated from the TypeScript source files.

You can find the public data models for Lyda in the following places:
- [GitHub](https://github.com/targoninc/lyda-shared)
- [NPM](https://www.npmjs.com/package/@targoninc/lyda-shared)

## Structure

- **Enums** - Enumerated types and constants
- **Models** - Interface definitions and data structures
    - **Database Models** - Database entity models
        - **Finance** - Financial and billing related models
        - **Lyda** - Core application models
    - **Other Models** - Utility and helper models

## Generating Documentation

The documentation is generated using a custom script that parses TypeScript files and extracts interface definitions, enums, and TSDoc comments.

To regenerate the documentation:

```bash
npm run generate-model-docs
```

This will:
1. Scan all TypeScript files in the `lyda-shared/src` directory
2. Extract type definitions, interfaces, and enums
3. Parse any TSDoc comments for additional documentation
4. Generate markdown files in the appropriate directory structure
