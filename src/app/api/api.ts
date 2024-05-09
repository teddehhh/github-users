import { IFilter } from '../slices/filter';
import { FetchKit } from './fetchkit';

const fetchKit = new FetchKit(
  new Headers([['authorization', process.env.NEXT_PUBLIC_OCTOKIT_TOKEN ?? '']])
);

export async function getUsersCount() {
  const response = await fetchKit.fetch(
    'https://api.github.com/search/users?q=type:org'
  );
  const { total_count } = await response.json();

  return total_count;
}

export async function getUsers({
  since,
  per_page,
  filter: { login, userType },
}: {
  since: string;
  per_page: string;
  filter: IFilter;
}) {
  const searchParams = new URLSearchParams({
    since,
    per_page,
    q: [
      login ? `${login} in:login` : '',
      userType.length ? `type:${userType}` : '',
    ].join(' '),
  });

  const response = await fetchKit.fetch(
    'https://api.github.com/search/users?' + searchParams
  );

  return await response.json();
}
