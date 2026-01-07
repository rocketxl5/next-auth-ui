// Architecture
//
// Page (server)
//  └─ Suspense
//      └─ SigninForm (client, owns logic)
//      └─ SigninSkeleton

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import SigninForm from './SigninForm';
import { getRedirectPathname } from '@/lib/server/getRedirectPathname';
import { User } from '@/types/users';

export default function SigninPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <SigninForm
      onSuccess={(user: User) => {
        const from = searchParams.get('from');
        const pathname = getRedirectPathname(user.role, from);
        router.replace(pathname);
      }}
    />
  );
}
