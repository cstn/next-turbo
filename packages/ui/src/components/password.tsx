import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { cn } from "../lib/utils";
import { Input } from './input';
import { Button } from './button';

function Password({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  const [ isVisible, setIsVisible ] = React.useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <Input
        className={cn(className, 'pr-8')}
        type={isVisible ? 'text' : 'password'}
        {...props}
      />
      <Button type="button" variant="ghost" size="icon" className="absolute bottom-1 right-1 h-7 w-7" onClick={toggleVisibility} aria-label="Toggle password visibility">
        {isVisible ? <EyeOffIcon className="h-4 w-4"/> : <EyeIcon className="h-4 w-4"/>}
        <span className="sr-only">Toggle password visibility</span>
      </Button>
    </div>
  );
}

export { Password };
