export type ApiEnvelope<T, M = unknown> = {
  data: T;
  meta?: M;
};

export function unwrap<T>(res: { data: ApiEnvelope<T> }): T {
  return res.data.data;
}
