/**
 * withSuspense
 * -------------------------------------------------------
 * Wraps a client component in a React Suspense boundary.
 *
 * Purpose:
 *   - Centralize Suspense logic
 *   - Avoid repeating <Suspense> blocks in pages
 *   - Preserve full prop typing via generics
 *
 * Design:
 *   - Accepts any function component
 *   - Forwards props transparently
 *   - Optional fallback component
 *
 * Usage:
 *   export default withSuspense(SigninForm, Spinner)
 * -------------------------------------------------------
 */

'use client';

import { Suspense, JSX, FC  } from 'react';

export function withSuspense<P extends JSX.IntrinsicAttributes>(
  Component: FC<P>,
  Fallback: FC | null = null
) {
  const Wrapped: FC<P>= (props) => (
    <Suspense fallback={Fallback ? <Fallback /> : null}>
      <Component {...props} />
    </Suspense>
  );

  Wrapped.displayName =
    `WithSuspense(${Component.displayName || Component.name || 'Component'})`;

  return Wrapped;
}
