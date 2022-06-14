// const catchAsync = require('../utils/catchAsync');
import { catchAsync } from '../utils/catchAsync';
import LogService from '../services/user.service';
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
import { send_email } from '../utils/schedules.job';
// import console from 'console';

@Service()
export default class LogsController {
  /**
   *
   */
  constructor(private readonly logService: LogService) {}
  createLogsController = catchAsync(
    async (req: any, res: Response, next: any) => {
      // await agenda;
      send_email();
      return successResponse(res, {});
    }
  );

  updateLogsController = catchAsync(
    async (req: any, res: Response, next: any) => {
      const _update = await this.logService.updateLogs(req.params.id, req.body);
      return successResponse(res, _update);
    }
  );

  getAllLogsController = catchAsync(async (req: any, res: any, next: any) => {
    const _getOneCustomer = await this.logService.getLogs();
    return successResponse(res, _getOneCustomer);
  });
}
