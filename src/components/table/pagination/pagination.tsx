'use client';

import { Button } from '@/components/ui/button';
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  NEXT,
  NEXT_TOOLTIP,
  PREV,
  PREV_TOOLTIP,
} from './lib/const';
import { IPagination } from './lib/types';
import { Label } from '@/components/ui/label';

interface PaginationProps {
  pagination: IPagination;
  setPagination: Dispatch<SetStateAction<IPagination>>;
  totalCount: number | null;
}

const Pagination: FunctionComponent<PaginationProps> = (props) => {
  const { pagination, setPagination, totalCount } = props;

  const { page } = pagination;
  const totalPages =
    Math.ceil(Number(totalCount) / DEFAULT_PER_PAGE) || DEFAULT_PAGE;

  return (
    <div className="flex items-center p-1">
      <PaginationContainer>
        <PaginationContent>
          <PaginationItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className="gap-2"
                    variant="ghost"
                    disabled={page <= 1}
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, page: page - 1 }))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <div className="max-sm:hidden">{PREV}</div>
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
                    className="gap-2"
                    variant="ghost"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPagination((prev) => ({
                        ...prev,
                        page: page + 1,
                      }))
                    }
                  >
                    <div className="max-sm:hidden">{NEXT}</div>
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
      </PaginationContainer>
    </div>
  );
};

export default Pagination;
