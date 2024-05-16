import { redirect } from 'next/navigation';
import { auth } from './api/auth/auth';
import SignOutButton from './ui/sign-out-button';
import Filter from './ui/filter';
import MyTable from './ui/my-table';
import MyPagination from './ui/my-pagination';
import { Suspense } from 'react';
import MyTableSkeleton from './ui/my-table-skeleton';
import { fetchFilteredUsers } from './lib/data';

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    login?: string;
    lang?: string;
    page?: string;
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
  const lang = searchParams?.lang || 'all';
  const currentPage = Number(searchParams?.page) || 1;

  const { items, total_count } = await fetchFilteredUsers(currentPage, {
    login,
    lang,
  });

  return (
    <div className="flex flex-row justify-between h-full p-5 gap-2">
      <Filter>
        <SignOutButton />
      </Filter>
      <div className="flex flex-col h-full w-full gap-2">
        <Suspense
          key={login + lang + currentPage}
          fallback={<MyTableSkeleton />}
        >
          <MyTable items={items} />
        </Suspense>
        <MyPagination totalCount={total_count} />
      </div>
    </div>
  );
}
