import typescript from 'typescript';
import pluginTypeScript from '@rollup/plugin-typescript';
import del from 'rollup-plugin-delete';
import css from 'rollup-plugin-css-only';

import tsConfig from './tsconfig.json';
import pkg from './package.json';

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
const cssConfig = { output: 'styles.css' };
const delConfig = { targets: './dist/*' };

export default [
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [
      // so Rollup can convert TypeScript to JavaScript
      pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/commonjs/' }),
      css(cssConfig), // so we can have CSS 😅
      del(delConfig) // so the "dist/" folder is empty before we write
    ],
    output: { dir: './dist/commonjs/', format: 'cjs', sourcemap: true }
  },
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [pluginTypeScript({ ...TypeScriptConfigs.legacy, declarationDir: './dist/module/' }), css(cssConfig)],
    output: { dir: './dist/module/', format: 'es', sourcemap: true }
  },
  {
    input: pkg.source,
    external: externalDependencies,
    plugins: [pluginTypeScript(TypeScriptConfigs.modern), css(cssConfig)],
    output: { dir: './dist/modern/', format: 'es', sourcemap: true }
  }
];
