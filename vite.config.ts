import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'pages': path.resolve(__dirname, 'src/pages'),
      'features': path.resolve(__dirname, 'src/features'),
      'components': path.resolve(__dirname, 'src/components'),
      'hooks': path.resolve(__dirname, 'src/hooks'),
      'lib': path.resolve(__dirname, 'src/lib'),
      'mocks': path.resolve(__dirname, 'src/mocks'),
    },
  },
})
