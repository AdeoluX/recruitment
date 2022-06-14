// const catchAsync = require('../utils/catchAsync');
import { catchAsync } from '../utils/catchAsync';
import AuthService from '../services/auth.service';
import {
  successResponse,
  abortIf,
  errorResponse,
  download,
  downloadFile,
} from '../utils/responder';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import { paginateOptions } from '../utils/paginate';
// import console from 'console';

@Service()
export default class AuthController {
  /**
   *
   */
  constructor(private readonly authService: AuthService) {}
  loginController = catchAsync(async (req: any, res: Response, next: any) => {
    const _create = await this.authService.login(req.body);
    return successResponse(res, _create);
  });

  registerController = catchAsync(
    async (req: any, res: Response, next: any) => {
      const _update = await this.authService.register(req.body);
      return successResponse(res, _update);
    }
  );
}
