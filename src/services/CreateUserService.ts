import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface Request {
  email: string;

  pass: string;
}

class CreateUserService {
  public async execute({ email, pass }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    if (email === '' || pass === '') {
      throw Error('Fields not empty');
    }

    if (pass.length <= 6) {
      throw Error('password very simple');
    }
    const findUserEmail = await userRepository.findbyEmail(email);
    if (findUserEmail) {
      throw Error('This email already exists');
    } else {
      const passwordHash = await hash(pass, 8);

      const user = userRepository.create({
        email,
        pass: passwordHash,
      });

      await userRepository.save(user);

      return user;
    }
  }
}

export default CreateUserService;
