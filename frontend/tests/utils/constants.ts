const timestamp = Date.now();

export const CREDENTIALS = {
  valid: {
    firstName: 'test',
    lastName: 'account',
    username: `tester_${timestamp}`,
    password: 'hello123',
  },
  invalid: {
    username: 'nottester',
    existingUsername: 'tester',
    password: 'nothello123',
    shortPwd: 'a',
  },
 } as const;
