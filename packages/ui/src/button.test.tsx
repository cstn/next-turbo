import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('renders a button with the correct text', () => {
    render(<Button appName="test">click me</Button>);

    const button = screen.getByRole('button', { name: 'click me' });

    expect(button).toBeInTheDocument();
  })
})
