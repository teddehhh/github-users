'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FunctionComponent, useEffect } from 'react';

interface MyPaginationProps {
  totalCount: number;
  children?: React.ReactNode;
}

const MyPagination: FunctionComponent<MyPaginationProps> = (props) => {
  const { children, totalCount } = props;

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const totalPages = Math.ceil(Number(totalCount) / 30);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());

    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="relative flex flex-row justify-start items-center p-1">
      {children}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Link
              className={cn(currentPage > 1 || 'pointer-events-none')}
              href={createPageURL(currentPage - 1)}
            >
              <Button variant="ghost" disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
          </PaginationItem>
          <PaginationItem>
            <Link
              className={cn(currentPage < totalPages || 'pointer-events-none')}
              href={createPageURL(currentPage + 1)}
            >
              <Button variant="ghost" disabled={currentPage >= totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPagination;
