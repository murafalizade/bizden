import fs from 'fs';
import path from 'path';

const [,, pageName, componentName] = process.argv;

if (!pageName || !componentName) {
    console.error('Usage: node generate-component.js <PageName> <ComponentName>');
    process.exit(1);
}

const baseDir = path.resolve(process.cwd(), 'src/app', pageName, 'components', componentName);

if (fs.existsSync(baseDir)) {
    console.error(`Component folder already exists: ${baseDir}`);
    process.exit(1);
}

// Create component folder
fs.mkdirSync(baseDir, { recursive: true });

// index.tsx - React component
const componentCode = `\
"use client";

import React from 'react';

interface ${componentName}Props {
  // Define your props here
}

export const ${componentName}: React.FC<${componentName}Props> = (props) => {
  return (
    <>
      {/* ${componentName} component */}
    </>
  );
};
`;

fs.writeFileSync(path.join(baseDir, `${componentName}.tsx`), componentCode);

// index.ts - re-export
const exportCode = `export * from \`./${componentName}\``;
fs.writeFileSync(path.join(baseDir, 'index.ts'), exportCode);

// test file
const testCode = `\
import React from 'react';
import { render, screen } from '@testing-library/react';
import {${componentName}} from './index';

describe('<${componentName} />', () => {
  it('renders without crashing', () => {
    render(<${componentName} />);
    expect(screen.getByText(/${componentName} component/i)).toBeInTheDocument();
  });
});
`;

fs.writeFileSync(path.join(baseDir, `${componentName}.test.tsx`), testCode);

// storybook file
const storyCode = `\
import { Meta, StoryObj } from '@storybook/react';
import {${componentName}} from './index';

const meta: Meta<typeof ${componentName}> = {
  title: '${pageName}/${componentName}',
  component: ${componentName},
};

export default meta;

type Story = StoryObj<typeof ${componentName}>;

export const Default: Story = {
  args: {
    // Add default args here
  },
};
`;

fs.writeFileSync(path.join(baseDir, `${componentName}.stories.tsx`), storyCode);

console.log(`Component ${componentName} created successfully under app/${pageName}/components/`);
