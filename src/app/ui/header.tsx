import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { FunctionComponent, Suspense } from 'react';
import MyAvatar from './my-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import SignOutButton from './sign-out-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ACCOUNT_MENU_TITLE, HEADER_TITLE } from '../lib/const/header';

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = (props) => {
  return (
    <div className="flex justify-between items-center py-1 px-4">
      <Label>{HEADER_TITLE}</Label>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MyAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="left">
          <DropdownMenuLabel>{ACCOUNT_MENU_TITLE}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
