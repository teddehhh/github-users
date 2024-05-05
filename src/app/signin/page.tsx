import { signIn } from '@/app/auth';
import Image from 'next/image';
import { outfit } from '@/app/ui/fonts';

export default function GitHubSignInPage() {
  return (
    <div className="flex flex-col gap-2 h-full items-center justify-center">
      <form
        action={async () => {
          'use server';
          await signIn('github');
        }}
      >
        <button
          type="submit"
          className="p-2 flex items-center gap-5 bg-[#22272e] text-white rounded-md px-5"
        >
          <Image
            src={'/github-mark-white.svg'}
            alt="123"
            width={22}
            height={22}
          />
          <span className={`${outfit.className} font-medium antialiased`}>
            Sign in with GitHub
          </span>
        </button>
      </form>
    </div>
  );
}
