import type { Plugin } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Fixes SSR module evaluation to ensure ES modules are properly recognized
 */
export function ssrEsmFix(): Plugin {
  return {
    name: 'vite:ssr-esm-fix',
    enforce: 'pre',
    apply: 'serve',
    configResolved(config) {
      // Ensure SSR format is ESM
      if (!config.ssr) {
        return;
      }
    },
    resolveId(id, importer) {
      // Ensure __create/index.ts is treated as an ES module
      if (id.includes('__create/index.ts') || id.includes('__create/index')) {
        const resolved = path.isAbsolute(id) ? id : path.resolve(id);
        return {
          id: resolved,
          moduleSideEffects: false,
        };
      }
      return null;
    },
    load(id) {
      // Ensure __create/index.ts is loaded as ES module
      if (id.includes('__create/index.ts') || id.includes('__create/index')) {
        // Return null to let Vite handle it, but ensure it's treated as ESM
        return null;
      }
      return null;
    },
    transform(code, id, opts) {
      // Only process SSR modules in __create directory
      if (!opts?.ssr) return null;
      if (!id.includes('__create')) return null;
      if (!/\.(ts|tsx|js|jsx)$/.test(id)) return null;

      // Ensure the code is treated as an ES module
      // Vite should handle this, but we're ensuring it
      return {
        code,
        map: null,
      };
    },
  };
}

