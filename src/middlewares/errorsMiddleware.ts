import { Request, Response } from "express";

export function errorsMiddleware(
  err: any,
  req: Request,
  res: Response,
  _: any
) {
  res.header("Content-Type", "application/json");
  if (err.status && err.status < 500) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    message: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
  });
}

export function notFoundRoute(req: Request, res: Response, _: any) {
  res.status(404).json({ error: "Rota nao encontrada." });
}
