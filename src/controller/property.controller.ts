// const catchAsync = require('../utils/catchAsync');
import { catchAsync } from '../utils/catchAsync';
import PropertyService from '../services/property.service';
import {
  successResponse,
  abortIf,
  errorResponse,
  download,
  downloadFile,
} from '../utils/responder';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Service } from 'typedi';
import { paginateOptions } from '../utils/paginate';
// import console from 'console';

@Service()
export default class PropertyController {
  /**
   *
   */
  constructor(private readonly propertyService: PropertyService) {}
  createPropertyController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _create = await this.propertyService.createProperty(
        req.body,
        req.files,
        req.body.token.user_id
      );
      return successResponse(res, _create);
    }
  );

  updatePropertyController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _update = await this.propertyService.update(
        req.body.token.user_id,
        req.params.id,
        req.body,
        req.files?.images
      );
      return successResponse(res, _update);
    }
  );

  deletePropertyController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _delete = await this.propertyService.delete(
        req.body.token.user_id,
        req.params.property_id
      );
      return successResponse(res, _delete);
    }
  );

  findPropertyByUserIdController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _all = await this.propertyService.findByUserId(
        req.body.token.user_id
      );
      return successResponse(res, _all);
    }
  );

  filerPropertyController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { address, perPage } = req.query;
      const _delete = await this.propertyService.filter(address, perPage);
      return successResponse(res, _delete);
    }
  );

  publishController = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _delete = await this.propertyService.publish(
        req.params.property_id,
        req.body.token.user_id
      );
      return successResponse(res, _delete);
    }
  );

  findPropertyById = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const _one = await this.propertyService.findOneById(
        req.params.property_id
      );
      return successResponse(res, _one);
    }
  );
}
