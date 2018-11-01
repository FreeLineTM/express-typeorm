import * as path from "path";
import * as express from "express";
import * as createError from "http-errors";
import * as logger from "morgan";
import * as nunjucks from "nunjucks";
import * as lessMiddleware from "less-middleware";
import { createConnection } from "typeorm";

import { indexRouter, usersRouter } from "./routes";
import { renderAppropriate as render } from "./util/";

const app = express();

createConnection().then(() => {
    app.use(express.json());

    nunjucks.configure(path.join(__dirname, 'views'), {
        autoescape: true,
        express: app
    });

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'njk');

    app.use(logger('dev'));

    app.use(lessMiddleware(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', indexRouter);
    app.use('/users', usersRouter);

    // Not found (404)
    app.use((req, res, next) => next(createError(404)));

    // Error handler
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        const data = { message: error.message, error: req.app.get('env') === 'development' ? error : {} };
        return render(res, req, 'error', { template: data, json: data });
    });
});

export default app
