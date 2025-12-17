// Architecture
//
// Page (server)
//  └─ Suspense
//      └─ SigninForm (client, owns logic)
//      └─ SigninSkeleton

'use client';

import SigninForm from './SigninForm';

export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SigninForm />
    </div>
  );
}
