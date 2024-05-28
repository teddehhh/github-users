'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';
import { FunctionComponent } from 'react';

interface MyAvatarProps {}

const MyAvatar: FunctionComponent<MyAvatarProps> = () => {
  /** get session */
  const { data } = useSession();

  const img = data?.user.image;
  const name = data?.user.name.slice(0, 2);

  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={img} />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  );
};

export default MyAvatar;
