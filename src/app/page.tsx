import { redirect } from 'next/navigation';
import { auth } from './api/auth/auth';
import SignOutButton from './ui/sign-out-button';
import Filter from './ui/filter';
import MyTable from './ui/my-table';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    login?: string;
    type?: string;
  };
}) {
  /** getting session */
  const session = await auth();

  /** redirect to signin page session is null */
  if (!session) {
    redirect('signin');
  }

  /** getting URL params */
  const login = searchParams?.login || '';
  const type = searchParams?.type || '';
  console.log({ login, type });
  return (
    <div className="flex flex-row justify-between h-full p-5 gap-2">
      <Filter>
        <SignOutButton />
      </Filter>
      <div className="flex flex-col h-full w-full">
        <MyTable login={login} type={type} />
      </div>
    </div>
  );
}
