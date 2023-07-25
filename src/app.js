"use strict"
import express from 'express';
import { init } from './loader/index.js';

const PORT = process.env.PORT || 3001;
const app = express();


async function startServer() {
  await init(app);

  app.listen(PORT, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log(`server Start ${PORT}`);
  });
}

app.use((error, request, response, next) => {
  console.error(error.stack);
  return response.status(500).json({
    message : "Internal server error"
  });
});


startServer();