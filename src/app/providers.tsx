'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';
import StoreProvider from './storeProvider';

interface ClientProviderProps {
  session: Session | null;
}

export function ClientProvider({
  children,
  session,
}: PropsWithChildren<ClientProviderProps>) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>{children}</StoreProvider>
    </SessionProvider>
  );
}
