import { auth } from '../auth/auth';
import { ISorting } from '@/components/table/control-panel/sorting/lib/types';
import { IFilter } from '@/components/table/control-panel/filter/lib/types';
import { IUser } from '@/components/table/lib/types/user';
import axios from 'axios';
import { GITHUB_USERS_URL } from './lib/const';

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

  try {
    const data = await axios
      .get(GITHUB_USERS_URL + '?' + searchParams, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(({ data }) => data);

    return data;
  } catch (error) {
    throw error;
  }
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
