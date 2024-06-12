import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes agregar configuraciones adicionales si es necesario
    },
    testIsolation: false,
    experimentalMemoryManagement: true
  }
});