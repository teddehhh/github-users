import { redirect } from 'next/navigation';
import { auth } from '../lib/auth';
import MyTable from '../components/my-table';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('signin');
  }

  return <MyTable />;
}
