import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

// CUSTOM IMPORTS
import User from '../models/Users';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user)
      throw new AppError('Only authenticated user can change avatar.', 400);

    if (user.avatar) {
      // Find the path of avatar image
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Check if the path exists
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      // If avatar exists delete
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
