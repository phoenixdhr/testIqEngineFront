
// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true,
//   schema: "https://iqengi-backend-production.up.railway.app/graphql",
//   documents: "src/graphql/*.graphql",
//   generates: {
//     "src/graphql/generated/graphql.ts": {
//       preset: "client",
//       plugins: []
//     },
//     "./graphql.schema.json": {
//       plugins: ["introspection"]
//     }
//   }
// };

// // export default config;
// import type { CodegenConfig } from '@graphql-codegen/cli';

// const config: CodegenConfig = {
//   overwrite: true, // Sobrescribe los archivos generados en cada ejecución

//   schema: "https://iqengi-backend-production.up.railway.app/graphql", // URL del backend GraphQL donde se obtiene el esquema

//   // documents: "src/graphql/generated/*.graphql", // Ruta donde se encuentran las queries y mutations en archivos .graphql
//   documents: "src/graphql/**/*.graphql",


//   generates: {
//     "src/graphql/generated/graphql.ts": { // Ruta donde se generará el código TypeScript con los tipos y hooks
//       plugins: [
//         "typescript", // Genera los tipos de TypeScript para los esquemas de GraphQL
//         "typescript-operations", // Genera los tipos de TypeScript para Queries, Mutations y Subscriptions
//         "typescript-react-apollo" // Genera hooks listos para Apollo Client en un proyecto de React
//       ],
//       config: {
//         withHooks: true // Genera hooks personalizados como useQuery, useMutation, etc.
//       }
//     }
//   }
// };

// export default config;


import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true, // Sobrescribe los archivos generados en cada ejecución

  schema: "https://iqengi-backend-production.up.railway.app/graphql", // URL del backend GraphQL

  documents: "src/graphql/**/*.graphql", // Busca todas las queries en la carpeta graphql

  generates: {
    "src/graphql/generated/graphql.ts": { // Ruta de salida del código generado
      plugins: [
        "typescript", // Genera los tipos de TypeScript
        "typescript-operations", // Genera tipos para Queries, Mutations y Subscriptions
        "typescript-react-apollo" // Genera hooks para Apollo Client
      ],
      config: {
        withHooks: true // Permite usar hooks como useQuery, useMutation
      }
    }
  }
};

export default config;
