import express from 'express';
import WebtoonService from '../service/webtoon.service.js';

const router = express.Router();
const service = WebtoonService;

router.post("/binary", async (request, response, next)=>{
  try {
    const { title, description, genre, format} = request.body;
    const filteredDescription = service.deleteEnter(description);
    const result = await service.getIsSuccess(title, filteredDescription, genre, format);
    return response.status(200).json({
      data : result,
      message : "Success"
    });
  } catch (error) {
    return response.status(500).json({
      data : error,
      message : "failure"
    });
  }
});

router.post("/rating", async (request, response, next)=>{
  try {
    const { title, description, summary, genre} = request.body;
    const filteredDescription = service.deleteEnter(description);
    const rating = await service.getPredictionRating(filteredDescription, summary, genre);
    return response.status(200).json({
      data : {rating, title},
      message : "Success"
    });
  } catch (error) {
    return response.status(500).json({
      data : error,
      message : "failure"
    });
  }
});



export default router;