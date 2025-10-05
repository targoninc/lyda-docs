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
            markdown += this.generateStructureMarkdown(structure);
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

                // Extract properties for interfaces (only simple ones to avoid MDX issues)
                if (currentStructure.type === 'interface' && bracketLevel === 1) {
                    const propMatch = line.match(/^\s*(\w+)(\??):\s*([^{;]+);?\s*$/);
                    if (propMatch) {
                        const propType = propMatch[3].trim();
                        // Only add simple types to avoid MDX parsing issues
                        if (!propType.includes('{') && !propType.includes('<') && !propType.includes('>')) {
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
    generateStructureMarkdown(structure) {
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
                // Escape type names to prevent MDX issues - handle union types and complex expressions
                const safeType = prop.type
                    .split('|')
                    .map(part => part.trim().replace(/([A-Z][a-zA-Z]*)/g, (match) => {
                        // Add zero-width space to break JSX component detection
                        return match.split('').join('\u200B');
                    }))
                    .join(' \\| ');
                const description = prop.comment ? prop.comment.trim() : '-';
                markdown += `| ${prop.name} | \`${safeType}\` | ${required} | ${description} |\n`;
            });
            markdown += '\n';
        }

        return markdown;
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