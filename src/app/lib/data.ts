import { Octokit } from 'octokit';
import { auth } from '../api/auth/auth';

export async function fetchFilteredUsers(
  page: number,
  filter: {
    login: string;
    lang: string;
  }
) {
  const { login, lang } = filter;
  const session = await auth();
  const octokit = new Octokit({ auth: session?.accessToken });

  const typeSearch = `type:user`;
  const loginSearch = login ? login + ' in:login' : '';
  const langSearch = lang ? 'language:' + lang : '';

  return await octokit
    .request('GET /search/users', {
      q: [typeSearch, langSearch, loginSearch].join(' '),
      page,
    })
    .then(({ data }) => data);
}
