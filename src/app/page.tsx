import { redirect } from 'next/navigation';
import { auth } from './auth/auth';
import MyTable from './components/my-table';

export default async function Home() {
  /** get session */
  const session = await auth();

  /** redirect to signin page session is null */
  if (!session) {
    redirect('signin');
  }

  return <MyTable />;
}
