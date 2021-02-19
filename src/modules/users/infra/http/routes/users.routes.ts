import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

// CUSTOM IMPORTS
import UpdateUserAvararService from '../../../services/UpdateUserAvararService';
import CreateUserService from '../../../services/CreateUserService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  // Deleting user password to do not show into response
  delete user.password;

  return response.json(user);
});

// Patch is like PUT, but only change ONE field of table
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvararService = new UpdateUserAvararService();

    const user = await updateUserAvararService.execute({
      // request.user.id is only accessible because our auth middleware
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRoutes;
