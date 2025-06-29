// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({

  site: 'https://ftoralesacosta/github.io',

  // --- For standard .md (Markdown) files ---
  markdown: {
    remarkPlugins: [
      remarkMath,
      // ... any other remark plugins your template might already have
    ],
    rehypePlugins: [
      rehypeKatex,
      // ... any other rehype plugins your template might already have
    ],
  },

});
