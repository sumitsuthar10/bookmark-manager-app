import { NextResponse } from "next/server";
import { signupSchema } from "@/services/auth/schemas";
import { createUser } from "@/services/auth/users";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsedBody = signupSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: parsedBody.error.issues[0]?.message ?? "Invalid signup details.",
      },
      { status: 400 },
    );
  }

  try {
    const user = await createUser(parsedBody.data);
    return NextResponse.json({ data: user }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create account.";

    return NextResponse.json({ error: message }, { status: 409 });
  }
}
