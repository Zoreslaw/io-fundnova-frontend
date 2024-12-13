export type LoginPayload =
  | { email: string; password: string }
  | { username: string; password: string };