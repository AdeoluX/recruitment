import 'reflect-metadata';
import { Router } from 'express';
// const { signUpValidate } = require("../validations/user.validations");
import LogsController from '../controller/user.controller';
import { Container } from 'typedi';
import { verify } from '../middleware/verifyToken';
import { agenda } from '../utils/schedules.job';
const router = Router();

const controller = Container.get(LogsController);

router.patch('/job', controller.createLogsController);

// router.post('/job', agenda);

export { router };
// ts-node-dev --respawn --pretty --transpile-only
