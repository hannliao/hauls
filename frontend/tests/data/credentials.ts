const timestamp = Date.now();

export const credentials = {
  valid: {
    firstName: 'test',
    lastName: 'account',
    username: 'tester',
    datedUsername: `tester_${timestamp}`,
    password: 'hello123',
  },
  invalid: {
    username: 'nottester',
    existingUsername: 'tester',
    password: 'nothello123',
    shortPwd: 'a',
  },
 };