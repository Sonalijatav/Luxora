// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         proxy: {
//             '/api': {
//                 target: 'http://localhost:8080', // Backend server
//                 changeOrigin: true,
//             },
//         },
//     },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  base: '/', // 👈 ensures correct routing in production
  build: {
    outDir: 'dist',
  },
});
