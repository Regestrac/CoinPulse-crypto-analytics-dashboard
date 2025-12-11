import React from 'react';
import { fetcher } from '@/lib/coingecko.actions';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import CandlestickChart from '@/components/CandlestickChart';
import CoinOverviewFallback from './CoinOverviewFallback';

const CoinOverview = async () => {
  let coin, coinOHLCData;

  const coinDataPromise = fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: 'symbol',
  });

  const ohlcDataPromise = (async () => {
    try {
      return await fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
        vs_currency: 'usd',
        days: 1,
        interval: 'hourly',
        precision: 'full',
      });
    } catch {
      return await fetcher<OHLCData[]>(`/coins/bitcoin/ohlc`, {
        vs_currency: 'usd',
        days: 1,
        precision: 'full',
      });
    }
  })();

  try {
    [coin, coinOHLCData] = await Promise.all([coinDataPromise, ohlcDataPromise]);
  } catch (error) {
    console.error('Error fetching coin overview:', error);
    return <CoinOverviewFallback />;
  }

  return (
    <div id="coin-overview">
      <CandlestickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image src={coin.image.large} alt={coin.name} width={56} height={56} />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
};

export default CoinOverview;
