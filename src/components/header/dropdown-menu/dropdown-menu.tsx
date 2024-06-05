'use client';
import {
  DropdownMenu as DropdownMenuContainter,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FunctionComponent, useState } from 'react';
import { ACCOUNT_MENU_TITLE } from '../lib/const';
import Avatar from './avatar/avatar';
import SignOutButton from './sign-out-button/sign-out-button';
import ThemeSlider from './theme-slider/theme-slider';

interface DropdownMenuProps {}

const DropdownMenu: FunctionComponent<DropdownMenuProps> = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPrevent, setIsPrevent] = useState(false);

  return (
    <DropdownMenuContainter
      open={isOpened}
      onOpenChange={(open) => {
        if (isPrevent) {
          setIsPrevent(false);
          return;
        }
        setIsOpened(open);
      }}
    >
      <DropdownMenuTrigger>
        <Avatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuLabel>{ACCOUNT_MENU_TITLE}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 mb-2 focus:bg-transparent w-full">
          <ThemeSlider
            dropdownOpenHandler={setIsOpened}
            preventOpenHandler={setIsPrevent}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuContainter>
  );
};

export default DropdownMenu;
