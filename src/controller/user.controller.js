import express from 'express';
import UserRepository from '../repository/user.repository.js';
const router = express.Router();

const userRepository = UserRepository;


router.get('/', async (request, response, next) => {
  try {
    const user = await userRepository.getUser();
    return response.status(200).json({
      data: user,
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