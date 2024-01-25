export type TToken = {
  accessToken: string;
  refreshToken: string;
  type: 'Bearer';
};

export type TCatcher<T> = (url: string, options: RequestInit, err: unknown) => Promise<T>;

export type TResponseRefreshToken = {
  readonly success: boolean;
  readonly accessToken: string;
  readonly refreshToken: string;
};
