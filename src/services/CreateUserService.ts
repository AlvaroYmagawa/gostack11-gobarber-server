import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

// CUSTOM IMPORTS
import User from '../models/Users';

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
      throw new Error('Email address already used.');
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
