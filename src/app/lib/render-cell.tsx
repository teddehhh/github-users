import Image from 'next/image';

export const renderCell = (item: any, field: string, type: string) => {
  switch (type) {
    case 'text':
      return item[field];
    case 'img':
      return (
        <Image
          className="rounded-full"
          src={item[field]}
          alt={field}
          width={28}
          height={28}
        />
      );
    case 'boolean':
      return Boolean(item[field]) ? 'True' : 'False';
    default:
      break;
  }
};
