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
import LogsRepo from '../dbservices/user.table';

@Service()
export default class LogService {
  /**
   *
   */
  constructor(
    private readonly logRepo: LogsRepo // private readonly userRepo: UserRepo
  ) {}
  createLogs = async (data: any) => {
    // abortIf(!data.user_id, httpStatus.BAD_REQUEST, 'user_id cannot be null');
    return {};
  };

  updateLogs = async (id: string, data: any) => {
    return {};
  };

  getLogs = async () => {
    return {};
  };

  getLogsById = async (id: string) => {
    return {};
  };
}
