import * as fs from 'fs';

export const logger = (req, _res, next) => {
    fs.appendFileSync("log.txt", `[${new Date().toISOString()}] ${req.method} ${req.url}\n`);
    next();
  };