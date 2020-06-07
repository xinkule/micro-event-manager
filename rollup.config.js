import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'default',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'default',
      sourcemap: true,
    },
  ],
  plugins: [
    commonjs(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
    }),
  ],
};
