const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
  test('capitalizes each word in a normal string', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('returns an empty string for empty input', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('capitalizes a single word', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });

  test('capitalizes words separated by special characters', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });

  test('keeps already capitalized words unchanged', () => {
    expect(capitalizeWords('Hello World')).toBe('Hello World');
  });
});

describe('filterActiveUsers', () => {
  test('returns only active users from a mixed array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Carol', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Carol', isActive: true },
    ]);
  });

  test('returns an empty array when all users are inactive', () => {
    const users = [
      { name: 'Bob', isActive: false },
      { name: 'Dave', isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  test('returns an empty array for an empty input array', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });

  test('returns all users when all are active', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Carol', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual(users);
  });
});

describe('logAction', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2024-11-27T12:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('generates the correct log string for valid inputs', () => {
    expect(logAction('login', 'Alice')).toBe(
      'User Alice performed login at 2024-11-27T12:00:00.000Z'
    );
  });

  test('includes the username and action in the log', () => {
    const result = logAction('logout', 'Bob');
    expect(result).toContain('Bob');
    expect(result).toContain('logout');
  });

  test('handles empty strings as inputs', () => {
    expect(logAction('', '')).toBe(
      'User  performed  at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles a missing action', () => {
    expect(logAction(undefined, 'Alice')).toBe(
      'User Alice performed undefined at 2024-11-27T12:00:00.000Z'
    );
  });

  test('handles a missing username', () => {
    expect(logAction('login')).toBe(
      'User undefined performed login at 2024-11-27T12:00:00.000Z'
    );
  });
});