import typescript from 'typescript';
import pluginTypeScript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';

import tsConfig from './tsconfig.json';
import pkg from './package.json';

import { promises as fs } from 'fs';
import path from 'path';

const externalDependencies = ['react', 'react-dom', 'react-spring', '@reach/dialog'];
const TypeScriptConfigs = {
  legacy: {
    ...tsConfig.compilerOptions,
    include: tsConfig.include,
    exclude: tsConfig.exclude,
    target: 'ES2015',
    module: 'ES2015',
    typescript,
    declaration: true
  },
  modern: {
    ...tsConfig.compilerOptions,
    include: tsConfig.include,
    exclude: tsConfig.exclude,
    target: 'ES2020',
    module: 'ES2020',
    typescript,
    declaration: true,
    declarationDir: './dist/modern/'
  }
};
const delConfig = { targets: ['./dist/*', './styles.css'] };

function copyStyles() {
  return {
    async buildEnd() {
      try {
        await fs.copyFile(path.join(process.cwd(), 'src', 'styles.css'), path.join(process.cwd(), 'styles.css'));
        console.log('./src/styles.css → ./styles.css');
      } catch (error) {
        console.log('Unable to copy ./src/style.css to ./styles.css');
        console.error(error);
      }
    }
  };
}

export default [
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [
      // so Rollup can convert TypeScript to JavaScript
      pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/commonjs/' }),
      copyStyles(), // so we can have CSS!
      del(delConfig) // so the "dist/" folder is empty before we write
    ],
    output: { dir: './dist/commonjs/', format: 'cjs', sourcemap: true }
  },
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/module/' })],
    output: { dir: './dist/module/', format: 'es', sourcemap: true }
  },
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [pluginTypeScript(TypeScriptConfigs.modern)],
    output: { dir: './dist/modern/', format: 'es', sourcemap: true }
  }
];
