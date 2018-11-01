import { Router, Request, Response  } from "express";
import * as createError from "http-errors";
import { getRepository } from "typeorm";

import User from '../entity/User';

import { renderAppropriate as render } from "../util/";

const router = Router();

router.get('/', async(req, res) => {
    const users = await getRepository(User).find();
    return render(res, req,'users', { template: { title: 'All users', users }, json: users })
});

router.get("/:id", async(req: Request, res: Response, next) => {
    const user = await getRepository(User).findOne(req.params.id);
    if (!user) return next(createError(404, 'No user found for ID ' + req.params.id));
    return render(res, req,'user', { template: { title: user.firstName, user }, json: user });
});

router.post("/", async(req: Request, res: Response, next) => {
    if (!Array.isArray(req.body)) return next(createError(400, "Data must be an array", { data: req.body }));

    const userRepository = getRepository(User);
    let users = userRepository.create(req.body);
    users = await userRepository.save(users);

    let data, title;
    const templateData = {};
    if (users.length > 1) {
        title = 'Created users';
        templateData['users'] = users;
        data = users;
    } else {
        title = 'Created ' + users[0].firstName;
        templateData['user'] = users[0];
        data = users[0];
    }
    templateData['title'] = title;

    return render(res, req, users.length > 1 ? 'users' : 'user', { template: templateData, json: data })
});

router.delete("/:id", async(req: Request, res: Response, next) => {
    const userRepository = getRepository(User);

    let user = await userRepository.findOne(req.params.id);
    if (!user) return next(createError(404, 'No user found for ID ' + req.params.id));

    user = await userRepository.remove(user);
    return render(res, req, 'user', { template: { title: 'Deleted ' + user.firstName, user }, json: user });
});

export default router;
