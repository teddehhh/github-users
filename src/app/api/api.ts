import { IPagination } from '../interface/pagination';
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
}: {
  since: string;
  per_page: string;
}) {
  const searchParams = new URLSearchParams({
    since,
    per_page,
  });

  const response = await fetch('https://api.github.com/users?' + searchParams);

  return await response.json();
}
