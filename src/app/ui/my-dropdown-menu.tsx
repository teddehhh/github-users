'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FunctionComponent, useEffect, useState } from 'react';
import { ACCOUNT_MENU_TITLE } from '../lib/const/header';
import MyAvatar from './my-avatar';
import SignOutButton from './sign-out-button';
import Slider from './slider';

interface MyDropdownMenuProps {}

const MyDropdownMenu: FunctionComponent<MyDropdownMenuProps> = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [isPrevent, setIsPrevent] = useState(false);

  return (
    <DropdownMenu
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
        <MyAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="left">
        <DropdownMenuLabel>{ACCOUNT_MENU_TITLE}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0">
          <SignOutButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-0 mb-2 focus:bg-transparent w-full">
          <Slider
            dropdownOpenHandler={setIsOpened}
            preventOpenHandler={setIsPrevent}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyDropdownMenu;
