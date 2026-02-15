import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    const result = cn('base', false && 'hidden', true && 'visible');
    expect(result).toBe('base visible');
  });

  it('handles tailwind merge conflicts', () => {
    const result = cn('px-4', 'px-2');
    expect(result).toBe('px-2');
  });

  it('handles undefined and null', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });
});
