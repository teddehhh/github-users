import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronRight } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { auth } from './api/auth/auth';
import { fetchFilteredUsers, fetchUser } from './lib/data';
import Filter from './ui/filter';
import Header from './ui/header';
import MyPagination from './ui/my-pagination';
import MyTable from './ui/my-table';
import MyTableSkeleton from './ui/my-table-skeleton';

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
  const login = searchParams?.login || '';
  const lang = searchParams?.lang || '';
  const sort = searchParams?.sort || '';
  const order = searchParams?.o || '';
  const currentPage = Number(searchParams?.page) || 1;

  const { items, total_count } = await fetchFilteredUsers(
    currentPage,
    {
      login,
      lang,
    },
    { field: sort, order }
  );

  const promises = items.map((item: any) => fetchUser(item.login));
  // const promises = items.map((item) => ({
  //   login: item.login,
  //   public_repos: 134,
  //   avatar_url: 'https://avatars.githubusercontent.com/u/59833865?v=4',
  //   followers: 532,
  // }));

  const renameKeys = (keysMap: any, obj: any) =>
    Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {}
    );

  const data = await Promise.all(promises).then((data) =>
    data.map((item) => {
      return renameKeys({ public_repos: 'repositories' }, item);
    })
  );

  return (
    <div className="flex flex-col h-full w-full">
      {/* в layout */}
      <Header />
      <Suspense
        key={login + lang + currentPage + sort + order}
        fallback={<MyTableSkeleton />}
      >
        <MyTable items={data} />
      </Suspense>
      <MyPagination totalCount={total_count}>
        <Sheet>
          <SheetTrigger className="absolute">
            <ChevronRight className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side={'left'}>
            <Filter />
          </SheetContent>
        </Sheet>
      </MyPagination>
    </div>
  );
}
