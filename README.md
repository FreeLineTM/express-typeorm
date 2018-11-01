# Express + TypeORM template
###### Express and TypeORM template as a starting point for new projects.

This template includes Express with TypeORM meaning you can use any SQL database with experimental support for MongoDB.

#### Full feature list
- Express
- TypeORM
- Nunjucks templating
- LESS styling
- Morgan logging
- `http-errors`

---
## Instructions

#### Configuration
Express port is set to using the `PORT` environment variable, if none is provided `3030` will be used. 

TypeORM provides a variety of configuration options located in `ormconfig.json`. You can find them [here](https://github.com/typeorm/typeorm/blob/master/docs/using-ormconfig.md).

#### Use
Install TypeScript (if not already installed).
```bash
npm -g install typescript
```

Install packages, compile TypeScript and start.
```bash
npm install
tsc
npm start
```
