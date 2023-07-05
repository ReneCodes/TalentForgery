const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    email: 'caiankeyes@gmail.com',
    password: 'User1_123'
  }
});