import { Octokit } from 'octokit';
import { auth } from '../api/auth/auth';

export async function fetchFilteredUsers(
  page: number,
  filter: {
    login: string;
    lang: string;
  },
  sorting: {
    sort: string;
    order: string;
  },
  accessToken: string
) {
  const { login, lang } = filter;
  const { sort, order } = sorting;

  const typeSearch = `type:user`;
  const loginSearch = login ? login + ' in:login' : '';
  const langSearch = lang ? 'language:' + lang : '';

  const q = [typeSearch, loginSearch, langSearch]
    .filter((item) => item)
    .join(' ');

  const searchParams = new URLSearchParams({
    q,
    p: String(page),
  });

  if (sort) {
    searchParams.append('s', sort);
  }

  if (order) {
    searchParams.append('o', order);
  }

  const data = await fetch(
    'https://api.github.com/search/users?' + searchParams,
    {
      headers: [['Authorization', accessToken]],
    }
  ).then(async (res) => {
    return res.json() as Promise<{
      total_count: number;
      items: { login: string; avatar_url: string }[];
    }>;
  });

  return data;
}

export async function fetchUser(username: string) {
  const session = await auth();

  const data = await fetch(`https://api.github.com/users/${username}`, {
    headers: [['Authorization', session?.accessToken ?? '']],
  }).then(
    (res) =>
      res.json() as Promise<{
        login: string;
        avatar_url: string;
        public_repos: string;
        followers: string;
      }>
  );

  return data;
}
