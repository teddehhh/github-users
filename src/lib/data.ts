import { Octokit } from 'octokit';
import { auth } from './auth';
import { IFilter, ISorting, IUser } from './interface';

/**
 * Получение списка пользователей
 * @param page Номер страницы
 * @param filter Фильтр
 * @param sorting Сортировка: sort - тип, order - порядок
 * @param accessToken Токен текущего пользователя
 * @returns Список пользователей
 */
export async function fetchFilteredUsers(
  page: number,
  filter: IFilter,
  sorting: ISorting,
  accessToken: string
) {
  const { login, language } = filter;
  const { sort, order } = sorting;

  const typeSearch = `type:user`;
  const loginSearch = login ? login + ' in:login' : '';
  const langSearch = language ? 'language:' + language : '';

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
  ).then((res) => {
    if (res.ok) {
      return res.json() as Promise<{
        total_count: number;
        items: IUser[];
      }>;
    }

    return res.text().then((text) => {
      throw new Error(text);
    });
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
