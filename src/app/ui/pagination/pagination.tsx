import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { IPagination } from '@/app/lib/interface/pagination';
import { Dispatch, SetStateAction } from 'react';

interface PaginationTableProps {
  setPagination: Dispatch<SetStateAction<IPagination>>;
  pagination: IPagination;
  usersCount: number;
  className?: string;
}

export function TablePagination({
  setPagination,
  pagination,
  usersCount,
  className,
}: PaginationTableProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              pagination.page || 'pointer-events-none text-gray-500'
            )}
            href="#"
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page - 1 })
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={cn(
              pagination.page + 1 <
                Math.ceil(usersCount / pagination.pageSize) ||
                'pointer-events-none'
            )}
            href="#"
            onClick={() =>
              setPagination({ ...pagination, page: pagination.page + 1 })
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}