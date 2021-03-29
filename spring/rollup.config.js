import typescript from 'typescript';
import pluginTypeScript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import externals from 'rollup-plugin-node-externals';
import visualize from 'rollup-plugin-visualizer';

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
    plugins: [
      externals({ deps: true }), // automatic externalization of dependencies
      visualize({ filename: 'stats/commonjs.html' }), // creates a visualization of the bundle
      // so Rollup can convert TypeScript to JavaScript
      pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/commonjs/' }),
      copyStyles(), // so we can have CSS!
      del(delConfig) // so the "dist/" folder is empty before we write
    ],
    output: { dir: './dist/commonjs/', format: 'cjs', sourcemap: true }
  },
  {
    input: pkg.source,
    plugins: [
      externals({ deps: true }),
      visualize({ filename: 'stats/module.html' }),
      pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/module/' })
    ],
    output: { dir: './dist/module/', format: 'es', sourcemap: true }
  },
  {
    input: pkg.source,
    plugins: [
      visualize({ filename: 'stats/modern.html' }),
      externals({ deps: true }),
      pluginTypeScript(TypeScriptConfigs.modern)
    ],
    output: { dir: './dist/modern/', format: 'es', sourcemap: true }
  }
];
