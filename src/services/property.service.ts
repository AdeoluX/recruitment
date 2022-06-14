import httpStatus from 'http-status';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/tokenManagement';
import { abort, abortIf } from '../utils/responder';
import { generate_random_password, hash } from '../utils/passwordHash';
import { Service } from 'typedi';
import path from 'path';
import moment from 'moment';
import { paginate, paginateOptions } from '../utils/paginate';
import PropertyRepo from '../dbservices/property.table';
import { IProperty } from '../models/Property';
import { cloudinaryUpload } from '../utils/cloudinary';
import { isObjectBindingPattern } from 'typescript';

@Service()
export default class PropertyService {
  /**
   *
   */
  constructor(
    private readonly propertyRepo: PropertyRepo // private readonly userRepo: UserRepo
  ) {}
  createProperty = async (data: IProperty, files: any, user_id: string) => {
    // abortIf(!data.user_id, httpStatus.BAD_REQUEST, 'user_id cannot be null');
    try {
      const upload = await cloudinaryUpload(files.image);
      data.image_url = upload.secure_url;
      data.user = user_id;
      const create = await this.propertyRepo.propertyCreate(data);
      return create;
    } catch (e) {
      console.error(e);
      abortIf(e, httpStatus.FAILED_DEPENDENCY, e.message);
    }
  };

  update = async (
    user_id: string,
    id: string,
    data: IProperty,
    images = null
  ) => {
    const findProp = await this.propertyRepo.findPropertyByUserId(user_id, id);
    abortIf(
      !findProp,
      httpStatus.BAD_REQUEST,
      'Property does not belong to User'
    );
    if (images) {
      const upload = await cloudinaryUpload(images);
      data.image_url = upload.secure_url;
      const update = await this.propertyRepo.updateProperty(id, data);
      return update;
    } else {
      const update = await this.propertyRepo.updateProperty(id, data);
      return update;
    }
  };

  delete = async (user_id: string, id: string) => {
    const findProp = await this.propertyRepo.findPropertyByUserId(user_id, id);
    abortIf(
      !findProp,
      httpStatus.BAD_REQUEST,
      'Property does not belong to User'
    );
    const _delete = await this.propertyRepo.deleteProperty(id);
    return _delete;
  };

  findOneById = async (id: string) => {
    const get = await this.propertyRepo.findPropertybyId(id);
    return get;
  };

  findByUserId = async (id: string) => {
    const all = await this.propertyRepo.findPropertyByUserIdOnly(id);
    return all;
  };

  filter = async (address: any, perPage: any) => {
    const get_all = await this.propertyRepo.filterByAddress(address, perPage);
    return get_all;
  };

  publish = async (id: string, user_id: string) => {
    const findProp = await this.propertyRepo.findPropertyByUserId(user_id, id);
    abortIf(
      !findProp,
      httpStatus.BAD_REQUEST,
      'Property does not belong to User'
    );
    const check = this.isNullish(findProp.toObject());
    abortIf(check, httpStatus.BAD_REQUEST, 'Property missing some details');
    let data: any = {};
    data.is_published = true;
    const update = await this.propertyRepo.updateProperty(id, data);
    return update;
  };

  isNullish = (obj) => {
    return Object.values(obj).every((value) => {
      if (value === null) {
        return true;
      }
      return false;
    });
  };
}
