import { redirect } from 'next/navigation';
import { auth } from './api/auth/auth';
import Header from './ui/header';
import MyTable from './ui/my-table';

export default async function Home() {
  /** getting session */
  const session = await auth();

  /** redirect to signin page session is null */
  if (!session) {
    redirect('signin');
  }

  return <MyTable />;
}
