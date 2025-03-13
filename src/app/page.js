'use strict';

// Load New Relic first
require('newrelic');

console.log('✅ New Relic initialized');

// Configuration (ensure environment variables are set correctly)
exports.config = {
  app_name: ['Your-App-Name'], // Change this to your app name
  license_key: process.env.NEW_RELIC_LICENSE_KEY, // Use environment variable
  logging: {
    level: 'info', // Can be 'trace', 'debug', 'info', 'warn', 'error', or 'fatal'
  },
  distributed_tracing: {
    enabled: true, // Enables end-to-end request tracing
  },
};

const express = require('express');
const newrelic = require('newrelic');

const app = express();
const PORT = 3000;

// Simple API endpoint
app.get('/', (req, res) => {
  res.send('Hello, New Relic is running!');
  console.log('👋 Hello request received');
});

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

// Create a simple transaction to test New Relic data reporting
newrelic.startBackgroundTransaction('testTransaction', function transactionHandler() {
  const txn = newrelic.getTransaction();
  console.log('🟢 New Relic transaction started');

  setTimeout(() => {
    txn.end();
    console.log('✅ Transaction completed, check New Relic for data');
  }, 2000);
});
