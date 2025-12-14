'use client';

import { useState } from 'react';
import { createUserSchema } from '@/lib/validators';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // 1️⃣ Client-side validation (optional but nice)
    const parsed = createUserSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Signup failed');
        return;
      }

      alert('Signup successful');
    } catch {
      setError('Something went wrong');
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
