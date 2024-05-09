import { signIn } from '@/app/auth/auth';
import Image from 'next/image';
import { outfit } from '@/app/ui/fonts';
import { Button } from '@/components/ui/button';
import { FunctionComponent } from 'react';

interface SignInPageProps {}

const SignInPage: FunctionComponent<SignInPageProps> = () => {
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
          className="p-2 flex items-center gap-5 bg-[#22272e] rounded-md px-5"
        >
          <Image
            src={'/github-mark-white.svg'}
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
