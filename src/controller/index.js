import express from 'express';
import { getResponseOpenAi, getImage } from '../api/openai.js';

const router = express.Router();

router.get('/', async (request, response, next) => {
  try {
    // const openaiResponse = await getResponseOpenAi();
    // const cat = await getImage(openaiResponse);
    // console.log(cat);
    return response.status(200).json({
      message: "success"
    });
  } catch (error) {
    console.log(error);
    return response.status(400).json({
      message : "Bad Request"
    });
  }

});

export default router;