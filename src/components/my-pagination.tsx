'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DEFAULT_PER_PAGE,
  NEXT_TOOLTIP,
  PREV_TOOLTIP,
} from '@/lib/const/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { IPagination } from '../lib/interface';
import { Label } from './ui/label';

interface MyPaginationProps {
  pagination: IPagination;
  setPagination: Dispatch<SetStateAction<IPagination>>;
  totalCount: number | null;
}

const MyPagination: FunctionComponent<MyPaginationProps> = (props) => {
  const { pagination, setPagination, totalCount } = props;

  const { page } = pagination;
  const totalPages = Math.ceil(Number(totalCount) / DEFAULT_PER_PAGE) || 1;

  return (
    <div className="flex items-center p-1">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={page <= 1}
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: page - 1 }))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{PREV_TOOLTIP}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PaginationItem>
          <PaginationItem className="flex justify-center w-10">
            <Label>{page}</Label>
          </PaginationItem>
          <PaginationItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>{NEXT_TOOLTIP}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPagination;
