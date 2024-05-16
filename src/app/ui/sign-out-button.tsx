'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Loader2 } from 'lucide-react';
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
        variant="destructive"
        onClick={async () => {
          setIsClicked(true);
          await signOut();
        }}
      >
        Выход
      </Button>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <Label className="text-center font-medium">{'Unauthenticated'}</Label>
    );
  }

  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Пожалуйста, подождите
    </Button>
  );
};

export default SignOutButton;
