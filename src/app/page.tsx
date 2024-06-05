import { redirect } from 'next/navigation';
import { auth } from '../auth/auth';
import Table from '@/components/table/table';

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect('signin');
  }

  return <Table />;
}
