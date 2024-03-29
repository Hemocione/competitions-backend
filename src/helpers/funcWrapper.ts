import { CompetitionsRequest, Context } from "../types";
import { Response, NextFunction } from "express";

export default function funcWrapper(func: (context: Context) => Promise<any>) {
  return async (
    request: CompetitionsRequest,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const context: Context = {
        req: request,
      };

      if (request.user) {
        context.user = request.user;
      }

      const result = await func(context);
      return response.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
}
