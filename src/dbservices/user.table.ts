import { Service } from 'typedi';
import { UserModel, IUser } from '../models/User';
@Service()
export default class UserRepo {
  createUser = async (data: IUser) => {
    const new_user = await new UserModel(data).save();
    return new_user;
  };

  findUserByEmailAndPhone = async (email: string, phone: string) => {
    const user = await UserModel.findOne({ email, phone });
    return user;
  };

  findUserbyId = async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  };
}
