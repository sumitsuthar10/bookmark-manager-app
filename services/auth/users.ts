import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import type { AppUser, PublicUser } from "@/types/auth";
import { hashPassword, verifyPassword } from "./password";
import type { LoginInput, SignupInput } from "./schemas";

const usersFilePath = path.join(process.cwd(), "storage", "users.json");

function toPublicUser(user: AppUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

async function readUsers(): Promise<AppUser[]> {
  try {
    const content = await readFile(usersFilePath, "utf8");
    return JSON.parse(content) as AppUser[];
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeUsers(users: AppUser[]) {
  await mkdir(path.dirname(usersFilePath), { recursive: true });
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const users = await readUsers();
  const normalizedEmail = email.toLowerCase();

  return users.find((user) => user.email === normalizedEmail) ?? null;
}

export async function createUser(input: SignupInput): Promise<PublicUser> {
  const users = await readUsers();
  const email = input.email.toLowerCase();
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    throw new Error("An account already exists for this email.");
  }

  const now = new Date().toISOString();
  const user: AppUser = {
    id: randomUUID(),
    name: input.name,
    email,
    passwordHash: await hashPassword(input.password),
    createdAt: now,
    updatedAt: now,
  };

  await writeUsers([...users, user]);

  return toPublicUser(user);
}

export async function validateUserCredentials(
  input: LoginInput,
): Promise<PublicUser | null> {
  const user = await findUserByEmail(input.email);

  if (!user) {
    return null;
  }

  const isValidPassword = await verifyPassword(input.password, user.passwordHash);

  return isValidPassword ? toPublicUser(user) : null;
}
