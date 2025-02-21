// // @ts-check
// import { defineConfig } from "astro/config";
// import tailwindcss from "@tailwindcss/vite";
// import react from "@astrojs/react";
// // https://astro.build/config
// export default defineConfig({
//   vite: {
//     plugins: [tailwindcss()],
//   },

//   integrations: [react()],
// });


// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@apollo/client"]
    }
  },
  integrations: [react()],
});
