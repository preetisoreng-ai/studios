import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * `npm run build:file` — browsers refuse to load module scripts from file:// URLs,
 * so this inlines the JS and CSS into dist/index.html. The result opens with a
 * double-click; images load from dist/figma/ next to it.
 */
function inlineForFile(): Plugin {
  return {
    name: "inline-for-file",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = Object.values(bundle).find((f) => f.fileName === "index.html");
      if (!html || html.type !== "asset") return;
      let src = String(html.source);
      for (const [name, file] of Object.entries(bundle)) {
        if (file.type === "chunk" && file.isEntry) {
          const tag = new RegExp(`<script[^>]*src="[^"]*${name}"[^>]*></script>`);
          // Function replacer: the bundle may contain "$&"-style sequences.
          src = src.replace(tag, () => `<script type="module">\n${file.code}\n</script>`);
          delete bundle[name];
        } else if (file.type === "asset" && name.endsWith(".css")) {
          const tag = new RegExp(`<link[^>]*href="[^"]*${name}"[^>]*>`);
          src = src.replace(tag, () => `<style>\n${String(file.source)}\n</style>`);
          delete bundle[name];
        }
      }
      html.source = src;
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: "./",
  plugins: [react(), tailwindcss(), mode === "file" && inlineForFile()],
  resolve: {
    alias: {
      "@nuclios": path.resolve(__dirname, "./nuclios theme/components"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // dist/ and docs/ are build outputs — rebuilding them must not reload the dev server.
  server: { watch: { ignored: ["**/dist/**", "**/docs/**"] } },
  build:
    mode === "file"
      ? { rollupOptions: { output: { codeSplitting: false } }, modulePreload: false }
      : undefined,
}));
