export class FetchKit {
  headers?: Headers;

  constructor(headers?: Headers) {
    this.headers = headers;
  }

  async fetch(url: string, init?: RequestInit) {
    const headers = new Headers(init?.headers);

    this.headers?.forEach((value, key) => {
      if (!headers.get(key)) {
        headers.append(key, value);
      }
    });

    return await fetch(url, { headers });
  }
}
