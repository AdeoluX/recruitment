import { Service } from 'typedi';
import { UserModel, IUser } from '../models/User';
@Service()
export default class UserRepo {
  createUser = async (data: IUser): Promise<IUser> => {
    const new_user = await new UserModel(data).save();
    return new_user;
  };

  findUserByEmailAndPhone = async (
    email: string,
    phone: string
  ): Promise<IUser> => {
    const user = await UserModel.findOne({ email, phone });
    return user;
  };

  findUserbyId = async (id: string): Promise<IUser> => {
    const user = await UserModel.findById(id);
    return user;
  };
}

//550038
