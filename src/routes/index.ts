import { Router } from "express";

import usersRouter from "./users";

const router = Router();

router.get('/', (req, res) => res.render('index', { title: 'Express' }));

export { router as indexRouter, usersRouter };
