export type AppUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicUser = Pick<AppUser, "id" | "name" | "email">;
