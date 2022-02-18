import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      onwarn: function(warning, superOnWarn) {
        /*
         * skip certain warnings
         * https://github.com/openlayers/openlayers/issues/10245
         */
        if (warning.code === 'THIS_IS_UNDEFINED') {
          return;
        }
        superOnWarn(warning);
      }
    },
    outDir: path.resolve(__dirname, 'public')
  }
});