import { LoaderCircle } from 'lucide-react';
import { FunctionComponent } from 'react';

interface LoaderProps {}

const Loader: FunctionComponent<LoaderProps> = () => {
  return (
    <div className="flex justify-center items-center fixed top-[40px] rounded-t-3xl bg-muted/50 h-full w-full">
      <div className="border-8 border-solid border-t-muted-foreground w-10 h-10 rounded-full animate-backwards" />
    </div>
  );
};

export default Loader;
