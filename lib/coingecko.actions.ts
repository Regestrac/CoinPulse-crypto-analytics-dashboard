'use server';

import qs from 'query-string';

function getBaseUrl() {
  const url = process.env.COINGECKO_BASE_URL;
  if (!url) throw new Error('Could not get base url');
  return url;
}

function getApiKey() {
  const key = process.env.COINGECKO_API_KEY;
  if (!key) throw new Error('Could not get api key');
  return key;
}

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60,
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${getBaseUrl()}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true },
  );

  const response = await fetch(url, {
    headers: {
      'x-cg-demo-api-key': getApiKey(),
      'Content-Type': 'application/json',
    } as Record<string, string>,
    next: { revalidate },
  });

  if (!response.ok) {
    const errorBody: CoinGeckoErrorBody = await response.json().catch(() => ({}));

    throw new Error(`API Error: ${response.status}: ${errorBody.error || response.statusText} `);
  }

  return response.json();
};

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null,
): Promise<PoolData> {
  const fallback: PoolData = {
    id: '',
    address: '',
    name: '',
    network: '',
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`,
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>('/onchain/search/pools', { query: id });

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
};

export async function getTrendingCoins(): Promise<TrendingCoin[]> {
  const data = await fetcher<{ coins: TrendingCoin[] }>('/search/trending');

  return data.coins ?? [];
};

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  const data = await fetcher<{ coins: SearchCoin[] }>('/search', { query });

  return data.coins ?? [];
};