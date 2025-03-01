// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
// import { DOMINIO } from "astro:env/client";
import { loadEnv } from 'vite';

import node from '@astrojs/node';

const env = loadEnv(import.meta.env.MODE, process.cwd(), '');

const SITE_URL = new URL(env.RAILWAY_PUBLIC_DOMAIN);

// const SITE_URL = new URL(
//   env.RAILWAY_ENVIRONMENT_NAME === "development"
//     ? env.RAILWAY_PUBLIC_DOMAIN
//     : "testiqenginefront-production.up.railway.app/"
// );

console.log("========================");
console.log("RAILWAY_ENVIRONMENT_NAME", env.RAILWAY_ENVIRONMENT_NAME);
console.log("========================");
console.log("SITE_URL", SITE_URL);

export default defineConfig({
  // Aquí es donde se define la variable global BASE_URL
  base: '/',

  //SITE_URL.href,// Aquí es donde se define la variable global SITE
  site: SITE_URL.href,

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@apollo/client"]
    }
  },

  env :{
    schema:{
      API_GRAPHQL: envField.string({context:'client', access:"public", default:"http://localhost:5555"}),
    }
  },

  integrations: [
    sitemap({
      // Frecuencia con la que cambian las páginas (opcional)
      changefreq: 'weekly', // Valores posibles: 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'

      // Prioridad relativa de tus páginas (0.0 a 1.0, opcional)
      priority: 0.8,

      // Fecha de última modificación global (opcional)
      lastmod: new Date(),

      // Excluir páginas específicas del sitemap
      filter: (page) =>
        !['/admin/', '/privado/', '/login/'].some((ruta) => page.includes(ruta)),

      // // Páginas externas o adicionales que quieras incluir
      // customPages: [
      //   'https://tudominio.com/pagina-externa',
      //   'https://tudominio.com/landing-promo',
      // ],

      // Número máximo de URLs por archivo del sitemap (opcional)
      entryLimit: 50000,

      // // Función para personalizar cada entrada del sitemap (opcional)
      // serialize(item) {
      //   if (/blog/.test(item.url)) {
      //     item.changefreq = 'daily';
      //     item.priority = 0.9;
      //     item.lastmod = new Date();
      //   }
      //   return item;
      // },

      // Configuración para sitios multilingües (opcional)
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US',
        },
      },

      // Estilo visual del sitemap XML (opcional)
      xslURL: '/sitemap.xsl',

      // // Número máximo de URLs por archivo sitemap (opcional, por defecto 45000)
      // entryLimit: 10000,
    }),

    react()],
  
  // Agregamos el adaptador de Node en modo "standalone"
  adapter: node({
    mode: 'standalone',
  }),


    // ¡IMPORTANTE! Forzamos a que escuche en 0.0.0.0
    server: {
      host: '0.0.0.0',
    },
  
  // El modo de salida debe ser "server" (o "hybrid")
  output: 'server',
});