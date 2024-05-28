import { outfit } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { FunctionComponent } from 'react';
import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';

interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-2 h-full items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <Button
          type="submit"
          className="p-2 flex items-center gap-5 rounded-md px-5"
        >
          <Image
            src={'/github-mark.svg'}
            alt="github-logo"
            width={22}
            height={22}
          />
          <span className={`${outfit.className} font-medium antialiased`}>
            Sign in with GitHub
          </span>
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
