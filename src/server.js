const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const { connectDatabase } = require('./infrastructure/database/mongoose.connection');
const userRoutes = require('./interfaces/routes/User/user.routes');
const ResponseHandler = require('./utils/response.handler');

const app = express();

// Middleware
app.use(cors({
  origin: config.cors.origin,
  credentials: config.cors.credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  ResponseHandler.error(res, 'Route not found', 404);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  ResponseHandler.error(
    res,
    err.message || 'Internal Server Error',
    err.statusCode || 500
  );
});

const PORT = config.server.port;

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} in ${config.server.nodeEnv} mode`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

