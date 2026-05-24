import type { ApiFailure, ApiSuccess } from "@/types/api";

export function ok<T>(data: T): Response {
  return Response.json({ data } satisfies ApiSuccess<T>);
}

export function fail(
  message: string,
  init: ResponseInit & { code?: string } = {},
): Response {
  const { code = "request_failed", status = 400, ...responseInit } = init;

  return Response.json(
    {
      error: {
        code,
        message,
      },
    } satisfies ApiFailure,
    { ...responseInit, status },
  );
}
