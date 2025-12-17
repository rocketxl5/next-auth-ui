# 📐 Auth-UI CMS Template — Architecture Overview

This document describes the **current architecture** of the **Auth-UI–enabled CMS template**, evolved from the original `cms-template`.

It focuses on:

* App Router structure
* Auth ownership (middleware vs client vs server)
* Suspense boundaries
* Role-aware routing
* Clean separation of concerns

---

## 1. 🏛 Project Structure (App Router–first)

```
src/
  app/
    (public)/
      page.tsx
      auth/
        signin/
          page.tsx        <-- Suspense boundary (page-level)
          SigninForm.tsx  <-- Client-owned logic
        signup/
          page.tsx
          SignupForm.tsx

    (admin)/
      dashboard/
        page.tsx          <-- Protected by middleware
      users/
        page.tsx          <-- SUPER_ADMIN only
      settings/
        page.tsx

    api/
      auth/
        signin/route.ts
        signup/route.ts
        refresh/route.ts
        signout/route.ts
      users/
        route.ts          <-- Admin CRUD
      content/
        route.ts

  lib/
    api/
      apiFetch.ts         <-- Unified fetch wrapper (client/server-safe)
    auth/
      tokens.ts           <-- JWT create/verify
      cookies.ts          <-- Cookie helpers
      redirect.ts         <-- Server-side redirects (middleware)
      pathname.ts         <-- Client-side redirect resolution
      requireRole.ts      <-- Server-only guards
    validators/
    utils/

  middleware.ts
  prisma/
    schema.prisma
```

---

## 2. 🧠 Core Architectural Principle

> **Pages orchestrate. Components own logic. Middleware enforces access.**

| Layer                 | Responsibility                       |
| --------------------- | ------------------------------------ |
| **middleware.ts**     | Hard security boundary (auth + role) |
| **API routes**        | Authentication & data integrity      |
| **Pages**             | Routing + Suspense boundaries        |
| **Client components** | Forms, state, redirects              |
| **lib/**              | Shared logic, no UI                  |

---

## 3. 🔐 Authentication Flow

### Sign-in (Client → Server)

```
SigninForm (client)
    |
    v
apiFetch('/api/auth/signin')
    |
Verify credentials
Create access + refresh JWT
Hash refresh token in DB
    |
Set httpOnly cookies
    |
Return user payload (id, role)
```

### Client redirect logic

```
user.role + ?from=
      |
getRedirectPathname()
      |
router.replace(pathname)
```

✔ Role-aware
✔ Client-safe
✔ No middleware bypass

---

## 4. 🔁 Refresh Token Rotation

```
Browser sends refreshToken cookie
        |
POST /api/auth/refresh
        |
Verify JWT
Compare hashed token in DB
        |
Rotate tokens:
 - new accessToken
 - new refreshToken
        |
Update hash in DB
```

✔ Secure
✔ Replay-resistant
✔ Silent to the user

---

## 5. 🛡 Middleware Protection Flow

`middleware.ts` protects **all `(admin)` routes automatically**

```
Request → /(admin)/dashboard
              |
              v
        middleware.ts
        ├─ accessToken exists?
        ├─ token valid?
        ├─ role allowed?
              |
   +----------+----------+
   |                     |
Redirect → /signin      Allow request
            |
        ?from=/dashboard
```

### Why middleware exists

* Runs **before rendering**
* Blocks unauthorized users early
* Cannot be bypassed by client JS
* Works at the edge

---

## 6. 🧭 Redirect Ownership (Very Important)

### Server-side redirects

Used when **blocking access**

* `middleware.ts`
* `redirectToSignin(req)`

📍 File: `lib/auth/redirect.ts`

### Client-side redirects

Used **after successful auth**

* Signin / Signup
* Role-based navigation

📍 File: `lib/auth/pathname.ts`

> ❌ Client components must **never** import middleware helpers
> ❌ Server code must **never** use `router.replace`

---

## 7. 🧩 Suspense Ownership Model

### Correct pattern

```
Page (server)
 └── <Suspense fallback={Skeleton}>
       <ClientForm />
```

### Why this matters

| Suspense in…     | Result                     |
| ---------------- | -------------------------- |
| Page             | ✅ Stream-safe              |
| Client component | ❌ Build / prerender errors |
| HOC (optional)   | ✅ If client-only           |

### Example

```tsx
// app/(public)/auth/signin/page.tsx
export default function Page() {
  return (
    <Suspense fallback={<SigninSkeleton />}>
      <SigninForm />
    </Suspense>
  );
}
```

---

## 8. 🧩 Database Schema (Current)

```
┌───────────────┐
│     User      │
├───────────────┤
│ id            │
│ email         │
│ password      │
│ role          │  ← USER | ADMIN | SUPER_ADMIN
│ refreshHash   │
│ createdAt     │
│ updatedAt     │
└───────────────┘
```

Roles are **authoritative**:

* Middleware
* API routes
* Client redirects

All agree on the same source of truth.

---

## 9. 🎛 Role System

| Role        | Access             |
| ----------- | ------------------ |
| USER        | Public pages only  |
| ADMIN       | Dashboard, content |
| SUPER_ADMIN | Users, settings    |

### Enforced in 3 layers

1. **middleware.ts** → frontend routes
2. **requireRole()** → API & server logic
3. **getRedirectPathname()** → UX correctness

---

## 10. 🌐 API Design Convention

```
/api/auth/*
/api/users
/api/content
```

✔ APIs stay **resource-based**
✔ Auth routes are grouped
✔ Frontend route groups do not leak into APIs

> Route groups like `(public)` and `(admin)` are **UI-only concepts**

---

## 11. 🚀 What This Template Is Now Optimized For

### ✅ Auth-first apps

* Dashboards
* Admin panels
* SaaS back offices

### ✅ CMS & internal tools

* Content
* Users
* Settings
* Products (optional)

### ✅ Real-world constraints

* Token rotation
* Role separation
* Edge security
* Streaming-safe rendering

---

## 12. 🧭 Mental Model (TL;DR)

```
Middleware = gatekeeper
API        = authority
Pages      = orchestration
Components = behavior
lib/       = shared truth
```

If something feels confusing, it usually means:
👉 **logic crossed an ownership boundary**

---

