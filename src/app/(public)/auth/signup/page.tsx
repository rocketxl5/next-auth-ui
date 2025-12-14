/**
 * Signup Page (Client Component)
 *
 * Purpose:
 * - Provides a minimal UI to test the signup flow end-to-end
 * - Validates user input using a UI-only Zod schema
 * - Sends only API-valid fields to /api/auth/signup
 *
 * Important:
 * - This component must NOT import Prisma or server-only logic
 * - Validation here is for UX (e.g. confirmPassword)
 * - The API route is the source of truth for data integrity
 *
 * Architecture:
 * UI (page.tsx)
 *   → signupFormSchema (client-only validation)
 *   → /api/auth/signup (controller)
 *   → Prisma (model)
 */

'use client';

import { NextResponse } from 'next/server';
import { useState } from 'react';
import { signupFormSchema } from './schema';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // 1️⃣ Client-side validation (optional but nice)
    const parsed = signupFormSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);

    const { confirmPassword, ...payload } = parsed.data;

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Signup failed');
        return;
      }

      alert('Signup successful');
    } catch (error) {
      setError('Something went wrong');

      console.error('SIGNIN ERROR:', error);
      return NextResponse.json(
        { message: 'Internal server error' },
        { status: 500 }
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-20 max-w-sm space-y-4 rounded border p-6"
    >
      <h1 className="text-xl font-semibold">Sign up</h1>

      <input
        className="w-full rounded border p-2"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="w-full rounded border p-2"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="w-full rounded border p-2"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <input
        className="w-full rounded border p-2"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-white p-2 text-black disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Sign up'}
      </button>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </form>
  );
}
