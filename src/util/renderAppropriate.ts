import { Response, Request } from "express";

import { Data } from "./";

export default function renderAppropriate(res: Response, req: Request, view: string, data: Data) {
    if (req.accepts('html')) return res.render(view, data.template);
    return res.json(data.json);
}
