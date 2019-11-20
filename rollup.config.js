import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/main.js',
    output: [
        {
            file: 'lib/debug-tools.js',
            format: 'umd',
            name: 'DebugTools'
        },
        {
            file: 'lib/debug-tools.min.js',
            format: 'umd',
            name: 'DebugTools',
            plugins: [terser()]
        }
    ],
    plugins: [babel({ exclude: 'node_modules/**' })]
}
