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
import { FunctionComponent } from 'react';
import { IPagination } from '../lib/interface';

interface MyPaginationProps {
  pagination: IPagination;
  setPagination: (
    _: IPagination | ((prev: IPagination) => IPagination)
  ) => void;
  totalCount: number | null;
}

const MyPagination: FunctionComponent<MyPaginationProps> = (props) => {
  const { pagination, setPagination, totalCount } = props;

  const { page } = pagination;
  const totalPages = Math.ceil(Number(totalCount) / 30) || 1;

  return (
    <div className="flex items-center p-1">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={page <= 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: page - 1 }))
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              variant="ghost"
              disabled={page >= totalPages}
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  page: page + 1,
                }))
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPagination;
