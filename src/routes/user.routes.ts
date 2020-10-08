import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

//cadastro inicial (Email,Senha)
usersRouter.post('/', async (request, response) => {
  try {
    const { email, pass } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      email,
      pass,
    });
    return response.status(201).json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
