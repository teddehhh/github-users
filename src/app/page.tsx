import { redirect } from 'next/navigation';
import { auth } from './api/auth/auth';
import Header from './ui/header';
import MyTable from './ui/my-table';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    login?: string;
    lang?: string;
    page?: string;
    sort?: string;
    o?: string;
  };
}) {
  /** getting session */
  const session = await auth();

  /** redirect to signin page session is null */
  if (!session) {
    redirect('signin');
  }

  /** getting URL params */
  /** filter */
  const login = searchParams?.login || '';
  const lang = searchParams?.lang || '';

  /** sorting */
  const sort = searchParams?.sort || '';
  const order = searchParams?.o || '';

  /** pagination */
  const page = Number(searchParams?.page) || 1;

  return (
    <MyTable
      filter={{ login, lang }}
      sorting={{ sort, order }}
      page={Number(page)}
    />
  );
}
