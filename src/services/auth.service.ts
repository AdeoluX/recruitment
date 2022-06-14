import httpStatus from 'http-status';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenManagement';
import { abortIf } from '../utils/responder';
import { generate_random_password, hash } from '../utils/passwordHash';
import { Service } from 'typedi';
import path from 'path';
import moment from 'moment';
import { paginate, paginateOptions } from '../utils/paginate';
import UserRepo from '../dbservices/user.table';
import { IUser } from '../models/User';

@Service()
export default class AuthService {
  /**
   *
   */
  constructor(
    private readonly userRepo: UserRepo // private readonly userRepo: UserRepo
  ) {}
  register = async (data: IUser) => {
    // abortIf(!data.user_id, httpStatus.BAD_REQUEST, 'user_id cannot be null');

    const user = await this.userRepo.findUserByEmailAndPhone(
      data.email,
      data.phone
    );
    abortIf(user, httpStatus.BAD_REQUEST, 'User already Exists');
    const create = await this.userRepo.createUser(data);
    const token = await generateToken(create.toObject());
    return { user: create, token };
  };

  login = async (data: any) => {
    const user = await this.userRepo.findUserByEmailAndPhone(
      data.email,
      data.phone
    );
    abortIf(!user, httpStatus.BAD_REQUEST, 'Invalid Credentials');
    const token = await generateToken(user.toJSON());
    return { user, token };
  };
}
