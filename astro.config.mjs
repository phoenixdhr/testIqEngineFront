
// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";

export default defineConfig({
  site: 'http://localhost:4321',

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["@apollo/client"]
    }
  },
  
  env :{
    schema:{
      DOMINIO_DEV: envField.string({context:'server', access:'public', default:"http://localhost:4321"}),
      DOMINIO_PREV: envField.string({context:'server', access:'public', default:"http://localhost:4322"}),
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

      // Páginas externas o adicionales que quieras incluir
      customPages: [
        'https://tudominio.com/pagina-externa',
        'https://tudominio.com/landing-promo',
      ],

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
          fr: 'fr-FR',
        },
      },

      // Estilo visual del sitemap XML (opcional)
      xslURL: '/sitemap.xsl',

      // // Número máximo de URLs por archivo sitemap (opcional, por defecto 45000)
      // entryLimit: 10000,
    }),

    react()],



});
