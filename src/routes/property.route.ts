import 'reflect-metadata';
import { Router } from 'express';
// const { signUpValidate } = require("../validations/user.validations");
import PropertyController from '../controller/property.controller';
import { Container } from 'typedi';
import { verify } from '../middleware/verifyToken';
import { validateReq } from '../middleware/validate';
import { createUser, createProperty } from '../validations/all.validation';
const router = Router();

const controller = Container.get(PropertyController);

router.post(
  '/create',
  validateReq(createProperty),
  verify,
  controller.createPropertyController
);

router.put('/publish/:property_id', verify, controller.publishController);

router.put(
  '/:id',
  validateReq(createProperty),
  verify,
  controller.updatePropertyController
);

router.get('/get-all', verify, controller.findPropertyByUserIdController);

router.get('/', verify, controller.filerPropertyController);

router.get('/:property_id', verify, controller.findPropertyById);

router.delete('/:property_id', verify, controller.deletePropertyController);

export { router };
// ts-node-dev --respawn --pretty --transpile-only
