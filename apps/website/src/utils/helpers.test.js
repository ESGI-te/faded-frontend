import { getDirtyValues } from './helpers';

describe('getDirtyValues', () => {
  it('returns only dirty values', () => {
    const dirtyFields = { name: true, age: true };
    const values = { name: 'Alice', age: 30, email: 'alice@example.com' };
    const result = getDirtyValues(dirtyFields, values);
    expect(result).toEqual({ name: 'Alice', age: 30 });
  });

  it('omits fields marked as not dirty', () => {
    const dirtyFields = { name: false, age: true };
    const values = { name: 'Alice', age: 30 };
    const result = getDirtyValues(dirtyFields, values);
    expect(result).toEqual({ age: 30 });
  });

  it('recursively handles nested dirty objects', () => {
    const dirtyFields = { user: { name: true, age: true } };
    const values = { user: { name: 'Alice', age: 30, email: 'alice@example.com' } };
    const result = getDirtyValues(dirtyFields, values);
    expect(result).toEqual({ user: { name: 'Alice', age: 30 } });
  });

  it('handles nested objects with mixed dirty fields', () => {
    const dirtyFields = { user: { name: true, age: false } };
    const values = { user: { name: 'Alice', age: 30 } };
    const result = getDirtyValues(dirtyFields, values);
    expect(result).toEqual({ user: { name: 'Alice' } });
  });

});
