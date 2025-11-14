import type { Plugin } from 'vite';

/**
 * Fixes react-dom/server import to ensure it's treated as an ES module
 * This plugin intercepts react-dom/server imports and ensures they're resolved correctly
 */
export function reactDomServerFix(): Plugin {
  return {
    name: 'vite:react-dom-server-fix',
    enforce: 'pre',
    apply: 'serve',
    resolveId(id, importer, options) {
      // Only handle SSR imports, skip client-side
      if (options?.ssr) {
        // Intercept react-dom/server imports and ensure they resolve to the correct module
        if (id === 'react-dom/server' || id === 'react-dom/server.js') {
          // Return the resolved ID to let Vite handle it, but mark it as ESM
          return {
            id: 'react-dom/server',
            moduleSideEffects: false,
          };
        }
      }
      // For client-side, return null to skip this module
      if (id === 'react-dom/server' || id === 'react-dom/server.js') {
        return {
          id: '\0virtual:react-dom-server-empty',
          moduleSideEffects: false,
        };
      }
      return null;
    },
    load(id) {
      // Return empty module for client-side react-dom/server imports
      if (id === '\0virtual:react-dom-server-empty') {
        return 'export {};';
      }
      return null;
    },
  };
}

