import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

// CUSTOM IMPORT
import User from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw new Error('Incorrect email/password combination');

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');

    const token = sign({}, 'b104b9a4cc107fc349b50dd9bdd49613', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
