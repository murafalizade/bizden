import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',        // ✨ new feature
        'fix',         // 🐛 bug fix
        'docs',        // 📝 documentation
        'style',       // 🎨 formatting, no code logic
        'refactor',    // 🧼 code restructure, no behavior change
        'test',        // ✅ adding or updating tests
        'chore',       // 🔧 tooling or dependencies
        'ci',          // 🧪 CI-related changes
      ]
    ],
    'scope-case': [2, 'always', 'kebab-case'],
    'subject-case': [0], 
  },
};

export default config;
