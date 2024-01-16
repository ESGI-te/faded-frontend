// vite.config.js
import { defineConfig } from "file:///Users/teolugat/Esgi/faded-frontend/apps/manager/node_modules/vite/dist/node/index.js";
import react from "file:///Users/teolugat/Esgi/faded-frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
import * as path from "path";
import macrosPlugin from "file:///Users/teolugat/Esgi/faded-frontend/node_modules/vite-plugin-babel-macros/dist/plugin.js";
import svgr from "file:///Users/teolugat/Esgi/faded-frontend/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_dirname = "/Users/teolugat/Esgi/faded-frontend/apps/manager";
var vite_config_default = defineConfig({
  server: {
    port: 5174
  },
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-macros"],
        configFile: true
      }
    }),
    macrosPlugin(),
    svgr()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "@api": path.resolve(__vite_injected_original_dirname, "src/api"),
      "@components": path.resolve(__vite_injected_original_dirname, "src/components"),
      "@hooks": path.resolve(__vite_injected_original_dirname, "src/hooks"),
      "@pages": path.resolve(__vite_injected_original_dirname, "src/pages"),
      "@styles": path.resolve(__vite_injected_original_dirname, "src/styles"),
      "@utils": path.resolve(__vite_injected_original_dirname, "src/utils"),
      "@queries": path.resolve(__vite_injected_original_dirname, "src/queries"),
      "@contexts": path.resolve(__vite_injected_original_dirname, "src/contexts"),
      "@public": path.resolve(__vite_injected_original_dirname, "public")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdGVvbHVnYXQvRXNnaS9mYWRlZC1mcm9udGVuZC9hcHBzL21hbmFnZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy90ZW9sdWdhdC9Fc2dpL2ZhZGVkLWZyb250ZW5kL2FwcHMvbWFuYWdlci92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvdGVvbHVnYXQvRXNnaS9mYWRlZC1mcm9udGVuZC9hcHBzL21hbmFnZXIvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IG1hY3Jvc1BsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1iYWJlbC1tYWNyb3MnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiA1MTc0LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgICByZWFjdCh7XG4gICAgICAgICAgICBiYWJlbDoge1xuICAgICAgICAgICAgICAgIHBsdWdpbnM6IFsnYmFiZWwtcGx1Z2luLW1hY3JvcyddLFxuICAgICAgICAgICAgICAgIGNvbmZpZ0ZpbGU6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgbWFjcm9zUGx1Z2luKCksXG4gICAgICAgIHN2Z3IoKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpLFxuICAgICAgICAgICAgJ0BhcGknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2FwaScpLFxuICAgICAgICAgICAgJ0Bjb21wb25lbnRzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9jb21wb25lbnRzJyksXG4gICAgICAgICAgICAnQGhvb2tzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9ob29rcycpLFxuICAgICAgICAgICAgJ0BwYWdlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvcGFnZXMnKSxcbiAgICAgICAgICAgICdAc3R5bGVzJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9zdHlsZXMnKSxcbiAgICAgICAgICAgICdAdXRpbHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3V0aWxzJyksXG4gICAgICAgICAgICAnQHF1ZXJpZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3F1ZXJpZXMnKSxcbiAgICAgICAgICAgICdAY29udGV4dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2NvbnRleHRzJyksXG4gICAgICAgICAgICAnQHB1YmxpYyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdwdWJsaWMnKSxcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sV0FBVztBQUNsQixZQUFZLFVBQVU7QUFDdEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFFBQVE7QUFBQSxJQUNKLE1BQU07QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxNQUFNO0FBQUEsTUFDRixPQUFPO0FBQUEsUUFDSCxTQUFTLENBQUMscUJBQXFCO0FBQUEsUUFDL0IsWUFBWTtBQUFBLE1BQ2hCO0FBQUEsSUFDSixDQUFDO0FBQUEsSUFDRCxhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsRUFDVDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBVSxhQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNsQyxRQUFhLGFBQVEsa0NBQVcsU0FBUztBQUFBLE1BQ3pDLGVBQW9CLGFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQsVUFBZSxhQUFRLGtDQUFXLFdBQVc7QUFBQSxNQUM3QyxVQUFlLGFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzdDLFdBQWdCLGFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQy9DLFVBQWUsYUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDN0MsWUFBaUIsYUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDakQsYUFBa0IsYUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDbkQsV0FBZ0IsYUFBUSxrQ0FBVyxRQUFRO0FBQUEsSUFDL0M7QUFBQSxFQUNKO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
