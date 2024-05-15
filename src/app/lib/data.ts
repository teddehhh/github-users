import { auth } from '../api/auth/auth';
import { octokit } from './octokit';

export async function fetchFilteredUsers(login: string, type?: string) {
  const session = await auth();

  const search = login + ' in:login';

  const types = type ? 'type:' + type : '';

  return await octokit
    .request('GET /search/users', {
      headers: {
        authorization: session?.accessToken,
      },
      q: [search, types].join(' '),
    })
    .then(({ data }) => data.items);
}

export async function fetchUsers() {
  const session = await auth();

  return await octokit
    .request('GET /users', {
      headers: {
        authorization: session?.accessToken,
      },
    })
    .then(({ data }) => data);
}
