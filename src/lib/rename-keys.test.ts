/**
 * @jest-environment jsdom
 */
import { renameKeys } from './rename-keys';

const CHANGE_SOME_FIELDS_MOCK = {
  initialObj: {
    login: 'githubteacher',
    type: 'user',
    avatar_url: 'https://avatars.githubusercontent.com/u/2132216?v=4',
  },
  keysMap: { login: 'user_login', avatar_url: 'avatar' },
  result: {
    user_login: 'githubteacher',
    type: 'user',
    avatar: 'https://avatars.githubusercontent.com/u/2132216?v=4',
  },
};

describe('renameKeys function', () => {
  it('change some fields', () => {
    // Arrange
    const { initialObj, keysMap, result } = CHANGE_SOME_FIELDS_MOCK;

    // Act
    const newObj = renameKeys(keysMap, initialObj);

    // Arrange
    expect(newObj).toMatchObject(result);
  });
});
