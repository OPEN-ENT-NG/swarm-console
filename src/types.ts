export type Service = {
  id: number;
  name: string;
};

export type Session = {
  user: { name: string; email: string; image: string | undefined };
  token: string;
};
