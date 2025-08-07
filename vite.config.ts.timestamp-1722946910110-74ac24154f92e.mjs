// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/vite/dist/node/index.js";
import { ValidateEnv } from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/@julr/vite-plugin-validate-env/dist/index.mjs";
import react from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import svgr from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/vite-plugin-svgr/dist/index.js";
import tsConfigPaths from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/vite-tsconfig-paths/dist/index.mjs";
import * as path from "path";
import { z } from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/zod/lib/index.mjs";
import { VitePWA } from "file:///D:/Projects/Exy/exy-exoesqueleto-frontend/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "D:\\Projects\\Exy\\exy-exoesqueleto-frontend";
var vite_config_default = defineConfig({
  plugins: [
    svgr(),
    VitePWA({
      manifest: {
        theme_color: "#ffffff"
      },
      devOptions: {
        resolveTempFolder: () => "dev",
        enabled: true
      }
    }),
    react(),
    tsConfigPaths(),
    ValidateEnv({
      validator: "zod",
      schema: {
        VITE_API_URL: z.string().url()
      }
    })
  ],
  build: {
    manifest: true
  },
  resolve: {
    alias: [
      { find: "@assets", replacement: path.resolve(__vite_injected_original_dirname, "./src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/components")
      },
      { find: "@hooks", replacement: path.resolve(__vite_injected_original_dirname, "./src/hooks") },
      {
        find: "@interfaces",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/interfaces")
      },
      {
        find: "@layout",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/layout")
      },
      {
        find: "@modules",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/modules")
      },
      {
        find: "@routes",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/routes")
      },
      {
        find: "@configs",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/configs")
      },
      {
        find: "@services",
        replacement: path.resolve(__vite_injected_original_dirname, "./src/services")
      },
      { find: "@style", replacement: path.resolve(__vite_injected_original_dirname, "./src/style") },
      { find: "@utils", replacement: path.resolve(__vite_injected_original_dirname, "./src/utils") },
      { find: "@errors", replacement: path.resolve(__vite_injected_original_dirname, "./src/errors") }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxFeHlcXFxcZXh5LWV4b2VzcXVlbGV0by1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcRXh5XFxcXGV4eS1leG9lc3F1ZWxldG8tZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL0V4eS9leHktZXhvZXNxdWVsZXRvLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcclxuaW1wb3J0IHsgVmFsaWRhdGVFbnYgfSBmcm9tICdAanVsci92aXRlLXBsdWdpbi12YWxpZGF0ZS1lbnYnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJztcclxuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XHJcbmltcG9ydCB0c0NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHN2Z3IoKSxcclxuICAgIFZpdGVQV0Eoe1xyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIHRoZW1lX2NvbG9yOiAnI2ZmZmZmZicsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgICByZXNvbHZlVGVtcEZvbGRlcjogKCkgPT4gJ2RldicsXHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgfSxcclxuICAgIH0pLFxyXG4gICAgcmVhY3QoKSxcclxuICAgIHRzQ29uZmlnUGF0aHMoKSxcclxuICAgIFZhbGlkYXRlRW52KHtcclxuICAgICAgdmFsaWRhdG9yOiAnem9kJyxcclxuICAgICAgc2NoZW1hOiB7XHJcbiAgICAgICAgVklURV9BUElfVVJMOiB6LnN0cmluZygpLnVybCgpLFxyXG4gICAgICB9LFxyXG4gICAgfSksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgbWFuaWZlc3Q6IHRydWUsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczogW1xyXG4gICAgICB7IGZpbmQ6ICdAYXNzZXRzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hc3NldHMnKSB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0Bjb21wb25lbnRzJyxcclxuICAgICAgICByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgfSxcclxuICAgICAgeyBmaW5kOiAnQGhvb2tzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQGludGVyZmFjZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvaW50ZXJmYWNlcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BsYXlvdXQnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0JyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQG1vZHVsZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvbW9kdWxlcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0Byb3V0ZXMnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcm91dGVzJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBmaW5kOiAnQGNvbmZpZ3MnLFxyXG4gICAgICAgIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvY29uZmlncycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7XHJcbiAgICAgICAgZmluZDogJ0BzZXJ2aWNlcycsXHJcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zZXJ2aWNlcycpLFxyXG4gICAgICB9LFxyXG4gICAgICB7IGZpbmQ6ICdAc3R5bGUnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3N0eWxlJykgfSxcclxuICAgICAgeyBmaW5kOiAnQHV0aWxzJywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91dGlscycpIH0sXHJcbiAgICAgIHsgZmluZDogJ0BlcnJvcnMnLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2Vycm9ycycpIH0sXHJcbiAgICBdLFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFULFNBQVMsb0JBQW9CO0FBRWxWLFNBQVMsbUJBQW1CO0FBQzVCLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxtQkFBbUI7QUFDMUIsWUFBWSxVQUFVO0FBQ3RCLFNBQVMsU0FBUztBQUNsQixTQUFTLGVBQWU7QUFSeEIsSUFBTSxtQ0FBbUM7QUFXekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsS0FBSztBQUFBLElBQ0wsUUFBUTtBQUFBLE1BQ04sVUFBVTtBQUFBLFFBQ1IsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLFlBQVk7QUFBQSxRQUNWLG1CQUFtQixNQUFNO0FBQUEsUUFDekIsU0FBUztBQUFBLE1BQ1g7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE1BQU07QUFBQSxJQUNOLGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxNQUNWLFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxRQUNOLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSTtBQUFBLE1BQy9CO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxXQUFXLGFBQWtCLGFBQVEsa0NBQVcsY0FBYyxFQUFFO0FBQUEsTUFDeEU7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWtCLGFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDekQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxVQUFVLGFBQWtCLGFBQVEsa0NBQVcsYUFBYSxFQUFFO0FBQUEsTUFDdEU7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWtCLGFBQVEsa0NBQVcsa0JBQWtCO0FBQUEsTUFDekQ7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFrQixhQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNyRDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWtCLGFBQVEsa0NBQVcsZUFBZTtBQUFBLE1BQ3REO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBa0IsYUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDckQ7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFrQixhQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUN0RDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLGFBQWtCLGFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsTUFDdkQ7QUFBQSxNQUNBLEVBQUUsTUFBTSxVQUFVLGFBQWtCLGFBQVEsa0NBQVcsYUFBYSxFQUFFO0FBQUEsTUFDdEUsRUFBRSxNQUFNLFVBQVUsYUFBa0IsYUFBUSxrQ0FBVyxhQUFhLEVBQUU7QUFBQSxNQUN0RSxFQUFFLE1BQU0sV0FBVyxhQUFrQixhQUFRLGtDQUFXLGNBQWMsRUFBRTtBQUFBLElBQzFFO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
