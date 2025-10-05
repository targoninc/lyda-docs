#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Generates markdown documentation from TypeScript model files
 */
class ModelDocGenerator {
    constructor(sourceDir, outputDir) {
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
    }

    /**
     * Main generation function
     */
    async generate() {
        console.log('Generating model documentation...');

        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }

        // Find all TypeScript files
        const files = await this.findTypeScriptFiles(this.sourceDir);

        for (const file of files) {
            await this.processFile(file);
        }

        console.log(`Generated documentation for ${files.length} files`);
    }

    /**
     * Recursively find all TypeScript files
     */
    async findTypeScriptFiles(dir) {
        const files = [];

        const traverse = (currentDir) => {
            const items = fs.readdirSync(currentDir);

            for (const item of items) {
                const fullPath = path.join(currentDir, item);
                const stat = fs.statSync(fullPath);

                if (stat.isDirectory()) {
                    traverse(fullPath);
                } else if (item.endsWith('.ts') && !item.endsWith('.d.ts') && item !== 'index.ts') {
                    files.push(fullPath);
                }
            }
        };

        traverse(dir);
        return files;
    }

    /**
     * Process a single TypeScript file
     */
    async processFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            const relativePath = path.relative(this.sourceDir, filePath);
            const outputPath = this.getOutputPath(relativePath);

            // Create output directory if it doesn't exist
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            const documentation = this.parseTypeScript(content, filePath, relativePath);
            fs.writeFileSync(outputPath, documentation);

            console.log(`Generated: ${outputPath}`);
        } catch (error) {
            console.error(`Error processing ${filePath}:`, error.message);
        }
    }

    /**
     * Get output path for a given source file path
     */
    getOutputPath(relativePath) {
        // Convert path/to/File.ts to path/to/File.md
        const withoutExtension = relativePath.replace('.ts', '');
        const mdPath = withoutExtension + '.md';
        return path.join(this.outputDir, mdPath);
    }

    /**
     * Parse TypeScript content and generate markdown documentation
     */
    parseTypeScript(content, filePath, relativePath) {
        const fileName = path.basename(filePath, '.ts');
        const lines = content.split('\n');

        // Extract TSDoc comments, interfaces, enums, and types
        const parsed = this.parseStructures(lines);

        let markdown = `# ${fileName}\n\n`;

        // Add file path reference
        markdown += `**Source:** \`lyda-shared/src/${relativePath.replace(/\\/g, '/')}\`\n\n`;

        // Add imports section if there are imports (in code block to avoid MDX issues)
        if (parsed.imports.length > 0) {
            markdown += `## Dependencies\n\n`;
            markdown += '```typescript\n';
            parsed.imports.forEach(imp => {
                markdown += `${imp}\n`;
            });
            markdown += '```\n\n';
        }

        // Add each structure (interface, enum, type)
        parsed.structures.forEach(structure => {
            markdown += this.generateStructureMarkdown(structure, parsed.imports, relativePath);
        });

        return markdown;
    }

    /**
     * Parse TypeScript structures from lines
     */
    parseStructures(lines) {
        const result = {
            imports: [],
            structures: []
        };

        let currentStructure = null;
        let currentComment = [];
        let bracketLevel = 0;
        let inStructure = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Track TSDoc comments
            if (line.startsWith('/**')) {
                currentComment = [line];
                continue;
            } else if (line.startsWith('*') && currentComment.length > 0) {
                currentComment.push(line);
                continue;
            } else if (line.startsWith('*/') && currentComment.length > 0) {
                currentComment.push(line);
                continue;
            }

            // Track imports
            if (line.startsWith('import ')) {
                result.imports.push(line);
                currentComment = [];
                continue;
            }

            // Track interfaces, enums, types
            const interfaceMatch = line.match(/^export\s+(interface|enum|type)\s+(\w+)/);
            if (interfaceMatch) {
                if (currentStructure && inStructure) {
                    result.structures.push(currentStructure);
                }

                currentStructure = {
                    type: interfaceMatch[1],
                    name: interfaceMatch[2],
                    comment: currentComment.length > 0 ? currentComment.join('\n') : '',
                    properties: [],
                    content: line
                };

                inStructure = true;
                bracketLevel = 0;

                if (line.includes('{')) {
                    bracketLevel = 1;
                }

                currentComment = [];
                continue;
            }

            if (inStructure && currentStructure) {
                currentStructure.content += '\n' + lines[i];

                // Track bracket levels for nested structures
                const openBrackets = (line.match(/{/g) || []).length;
                const closeBrackets = (line.match(/}/g) || []).length;
                bracketLevel += openBrackets - closeBrackets;

                // Extract properties for interfaces
                if (currentStructure.type === 'interface' && bracketLevel === 1) {
                    const propMatch = line.match(/^\s*(\w+)(\??):\s*([^{;]+);?\s*$/);
                    if (propMatch) {
                        const propType = propMatch[3].trim();
                        // Skip properties with inline object types to avoid MDX parsing issues
                        if (!propType.includes('{')) {
                            currentStructure.properties.push({
                                name: propMatch[1],
                                optional: propMatch[2] === '?',
                                type: propType,
                                comment: ''
                            });
                        }
                    }
                }

                // End of structure
                if (bracketLevel <= 0 && line.includes('}')) {
                    inStructure = false;
                    result.structures.push(currentStructure);
                    currentStructure = null;
                }
            }
        }

        // Handle case where file ends while still in structure
        if (currentStructure && inStructure) {
            result.structures.push(currentStructure);
        }

        return result;
    }

    /**
     * Generate markdown for a parsed structure
     */
    generateStructureMarkdown(structure, imports = [], currentFilePath = '') {
        let markdown = `## ${structure.name}\n\n`;

        // Add TSDoc comment if available
        if (structure.comment) {
            const cleanComment = structure.comment
                .replace(/\/\*\*\s*/, '')
                .replace(/\s*\*\/\s*/, '')
                .split('\n')
                .map(line => line.replace(/^\s*\*\s?/, ''))
                .join('\n')
                .trim();

            if (cleanComment) {
                markdown += `${cleanComment}\n\n`;
            }
        }

        markdown += `**Type:** ${structure.type}\n\n`;

        // Add code block
        markdown += '```typescript\n';
        markdown += structure.content;
        markdown += '\n```\n\n';

        // Add properties table for interfaces
        if (structure.type === 'interface' && structure.properties.length > 0) {
            markdown += '### Properties\n\n';
            markdown += '| Property | Type | Required | Description |\n';
            markdown += '|----------|------|----------|-------------|\n';
            
            structure.properties.forEach(prop => {
                const required = prop.optional ? 'No' : 'Yes';
                const description = prop.comment ? prop.comment.trim() : '-';
                
                // Process type - handle union types and create links for imported types
                const safeType = prop.type
                    .split('|')
                    .map(part => this.formatTypeWithLinks(part.trim(), imports, currentFilePath))
                    .join(' or ');
            
                markdown += `| ${prop.name} | ${safeType} | ${required} | ${description} |\n`;
            });
            
            markdown += '\n';
        }

        return markdown;
    }

    /**
     * Format a type with links to imported types
     */
    formatTypeWithLinks(type, imports, currentFilePath = '') {
        // Extract all type names (handles Album, Album[], Album<T>, etc.)
        const typeNames = type.match(/[A-Z][a-zA-Z]*/g);
        
        if (!typeNames) {
            return type;
        }
        
        let result = type;
        
        // Process each type name found
        typeNames.forEach(typeName => {
            // Get the import path for this type
            const importPath = this.getImportPathForType(typeName, imports, currentFilePath);
            if (importPath) {
                // Create a link to the type's documentation
                const regex = new RegExp(`\\b${typeName}\\b`, 'g');
                result = result.replace(regex, `[${typeName}](${importPath})`);
            } else {
                // Add zero-width space to break JSX component detection
                const regex = new RegExp(`\\b${typeName}\\b`, 'g');
                const escaped = typeName.split('').join('\u200B');
                result = result.replace(regex, escaped);
            }
        });
        
        // Escape angle brackets to prevent MDX from interpreting them as JSX
        result = result.replace(/</g, '\\<').replace(/>/g, '\\>');
        
        return result;
    }

    /**
     * Get the import path for a type, converted to a documentation link path
     */
    getImportPathForType(typeName, imports, currentFilePath = '') {
        for (const imp of imports) {
            // Handle different import patterns
            // import {User} from "./User.js"
            // import {User, Album} from "./models.js"
            // import User from "./User.js"
            const importMatch = imp.match(/import\s+(?:\{([^}]*)\}|(\w+))\s+from\s+["']([^"']+)["']/);
            if (importMatch) {
                const namedImports = importMatch[1];
                const defaultImport = importMatch[2];
                const fromPath = importMatch[3];
                
                let hasType = false;
                if (namedImports) {
                    // Check named imports
                    hasType = namedImports.split(',').some(name => name.trim() === typeName);
                } else if (defaultImport) {
                    // Check default import
                    hasType = defaultImport.trim() === typeName;
                }
                
                if (hasType) {
                    return this.convertImportPathToDocLink(fromPath, typeName, currentFilePath);
                }
            }
        }
        return null;
    }

    /**
     * Convert an import path to a documentation link path
     */
    convertImportPathToDocLink(importPath, typeName, currentFilePath) {
        // Skip external packages
        if (!importPath.startsWith('.')) {
            return null;
        }
        
        // Remove file extension
        let cleanImportPath = importPath.replace(/\.(ts|js)$/, '');
        
        // Normalize current file path to use forward slashes
        const normalizedCurrentPath = (currentFilePath || '').replace(/\\/g, '/');
        const currentDir = normalizedCurrentPath.split('/').slice(0, -1).join('/');
        
        let targetDocPath;
        
        // Handle the case where the import is the exact type name (e.g., "./User" for User type)
        if (cleanImportPath.endsWith(`/${typeName}`) || cleanImportPath === `./${typeName}`) {
            // The import path already includes the type name, just resolve the path
            targetDocPath = this.resolveRelativePath(currentDir, cleanImportPath);
        } else {
            // If the import path doesn't end with the type name, append it
            const resolvedBasePath = this.resolveRelativePath(currentDir, cleanImportPath);
            targetDocPath = `${resolvedBasePath}/${typeName}`;
        }
        
        // Convert to absolute documentation URL
        return `/api/data-models/${targetDocPath}`;
    }

    /**
     * Resolve a relative path from a base directory
     */
    resolveRelativePath(baseDir, relativePath) {
        const baseParts = baseDir.split('/').filter(part => part !== '');
        const relativeParts = relativePath.split('/').filter(part => part !== '');
        
        const result = [...baseParts];
        
        for (const part of relativeParts) {
            if (part === '..') {
                result.pop();
            } else if (part !== '.') {
                result.push(part);
            }
        }
        
        return result.join('/');
    }

    /**
     * Escape HTML characters to prevent XSS and MDX issues
     */
    escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
    }
}

// Main execution
async function main() {
    const sourceDir = path.join(__dirname, '..', 'lyda-shared', 'src');
    const outputDir = path.join(__dirname, '..', 'docs', 'api', 'data-models');

    const generator = new ModelDocGenerator(sourceDir, outputDir);
    await generator.generate();
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { ModelDocGenerator };