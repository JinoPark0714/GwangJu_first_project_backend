import express from 'express';
import WebtoonService from '../service/webtoon.service.js';

const router = express.Router();
const service = WebtoonService;

router.get('/', async (request, response, next) => {
  try {
    const {title, description} = request.body;
    const textArray = await service.getTextArrayWithSpaceDeleted(title, description);
    const webtoonData = service.getWebtoonData(textArray);
    return response.status(200).json({
      data: webtoonData,
      message: "Success"
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      message: `Failure\n${error}`
    });
  }
});

export default router;