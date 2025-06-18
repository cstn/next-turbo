import { describe, expect, it } from 'vitest';
import { Username } from './username';

describe('Username validator', () => {
  it('should accept valid username', () => {
    const result = Username.safeParse('validUsername');
    expect(result.success).toBe(true);
  });

  it('should reject empty username', () => {
    const result = Username.safeParse('');
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe('usernameRequired');
  });

  it('should reject undefined username', () => {
    const result = Username.safeParse(undefined);
    expect(result.success).toBe(false);
    expect(result?.error?.errors?.[0]?.message).toBe('usernameRequired');
  });
});
