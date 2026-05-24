"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email,
        password,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Unable to create account.");
      setIsSubmitting(false);
      return;
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsSubmitting(false);

    if (result?.error) {
      router.push("/login");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <TextField
        label="Name"
        name="name"
        autoComplete="name"
        required
        fullWidth
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        fullWidth
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        helperText="Use at least 8 characters."
        required
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
      <Typography
        variant="body2"
        color="text.secondary"
        style={{ textAlign: "center" }}
      >
        Already have an account?{" "}
        <Link href="/login" style={{ fontWeight: 700 }}>
          Sign in
        </Link>
      </Typography>
    </Stack>
  );
}
