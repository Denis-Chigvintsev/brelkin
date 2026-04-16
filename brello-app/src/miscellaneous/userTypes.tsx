export type User = {
  email: string;
  password: string;
  name: string;
  contactPhone?: string;
};

export type SignInDTO = {
  email: string;
  password: string;
};
