import { useRef, useState, ComponentProps, ChangeEvent, KeyboardEvent } from 'react';
import { Input } from './input';

type Props = Omit<ComponentProps<'input'>, 'type' | 'value' | 'onChange'> & {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

function ExpiryDate({ placeholder, value: controlledValue, onChange: onControlledChange, ...props }: Props) {
  const [ internalValue, setInternalValue ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;
  const onChange = onControlledChange ?? setInternalValue;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!inputRef.current) {
      return;
    }

    const newValue = event.target.value.replace(/\D/g, '');
    const matches = newValue.match(/^(\d{0,2})(\d{0,2})$/);
    if (!matches) {
      onChange('');
      return;
    }

    const [ , month = '', year = '' ] = matches;

    // Handle delete
    if (newValue.length < value.replace(/\D/g, '').length) {
      onChange(newValue.length <= 2 ? month : `${month}/${year}`);
      return;
    }

    if (month) {
      const monthNum = parseInt(month, 10);
      const correctedMonth = monthNum > 12 ? '12' : month;

      if (year) {
        onChange(`${correctedMonth}/${year}`);
      } else {
        onChange(correctedMonth);
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === '/' && value.length === 2) {
      event.preventDefault();
      onChange(`${value}/`);
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      placeholder={placeholder ?? 'MM/YY'}
      maxLength={5}
      {...props}
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

export { ExpiryDate };
