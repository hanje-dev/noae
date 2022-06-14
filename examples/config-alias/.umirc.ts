import { defineConfig } from 'noae';

export default defineConfig({
  alias: {
    component: require.resolve('./src/components'),
  },
});
