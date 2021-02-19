import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

// CUSTOM IMPORTS
import User from '../infra/typeorm/entities/Users';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const isUSerExists = await userRepository.findOne({
      where: { email },
    });

    if (isUSerExists) {
      throw new AppError('Email address already used.', 400);
    }

    // Hashing password
    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
