const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Constants': path.resolve(__dirname, 'src/constants'),
      '@Hooks': path.resolve(__dirname, 'src/hooks'),
      '@Pages': path.resolve(__dirname, 'src/pages'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Store': path.resolve(__dirname, 'src/store'),
      '@Reducers': path.resolve(__dirname, 'src/store/reducers'),
      '@Actions': path.resolve(__dirname, 'src/store/actions'),
      '@Types': path.resolve(__dirname, 'src/types'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
      '@Theme': path.resolve(__dirname, 'src/theme'),
    },
  },
};