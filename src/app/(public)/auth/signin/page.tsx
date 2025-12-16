'use client';

import { Suspense } from 'react';
import { SigninForm } from '@/components/ui/Form/SigninForm';

export default function SigninPage() {
  return (
    <Suspense fallback={<SigninSkeleton />}>
      <SigninForm />
    </Suspense>
  );
}

function SigninSkeleton() {
  return (
    <div className="mx-auto mt-20 max-w-sm text-white rounded border p-6">
      Loading…
    </div>
  );
}
