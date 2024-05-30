import { jost } from '@/lib/fonts';
import { Button } from '@/components/ui/button';
import { FunctionComponent } from 'react';
import { auth, signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { GITHUB_AUTHORIZATION_LABEL } from '@/lib/const/sign-in';
import GitHubButtonIcon from '@/components/github-button-icon';

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
          <GitHubButtonIcon />
          <span className={`${jost.className} font-medium antialiased`}>
            {GITHUB_AUTHORIZATION_LABEL}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default SignInPage;
