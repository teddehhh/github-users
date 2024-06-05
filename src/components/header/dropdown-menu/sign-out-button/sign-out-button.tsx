'use client';

import { EXIT_TITLE } from '@/components/sign-in-page/lib/const';
import { Button } from '@/components/ui/button';
import { CloudOff, Loader2, LogOut } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { FunctionComponent, useEffect, useState } from 'react';

interface SignOutButtonProps {}

const SignOutButton: FunctionComponent<SignOutButtonProps> = () => {
  /** states */
  const [isClicked, setIsClicked] = useState(false);

  /** get session */
  const { data, status } = useSession();

  /** effects */
  useEffect(() => {
    if (status === 'authenticated') {
      setIsClicked(false);
    }
  }, [status]);

  if (!isClicked && status === 'authenticated') {
    return (
      <Button
        className="w-full"
        variant={'ghost'}
        onClick={async () => {
          setIsClicked(true);
          await signOut();
        }}
      >
        <div className="flex w-full justify-evenly items-center">
          <LogOut width={16} height={16} />
          {EXIT_TITLE}
        </div>
      </Button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Button className="w-full" disabled variant={'ghost'}>
        <CloudOff />
      </Button>
    );
  }

  return (
    <Button disabled variant={'ghost'}>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    </Button>
  );
};

export default SignOutButton;
