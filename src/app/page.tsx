'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
// import { auth } from './auth';

export default function Home() {
  const session = useSession();

  return (
    <>
      {session && <div>{JSON.stringify(session)}</div>}
      {
        <button
          onClick={() =>
            session.status === 'authenticated' ? signOut() : signIn('github')
          }
        >
          {`Sign ${session.status === 'authenticated' ? 'out' : 'in'}`}
        </button>
      }
    </>
  );
}
