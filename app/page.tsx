import DataTable from '@/components/DataTable'
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';

const trendingCoinData: TrendingCoin[] = [
  {
    item: {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      market_cap_rank: 1,
      thumb: 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png',
      large: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      data: {
        price: 89133,
        price_change_percentage_24h: { usd: 2.34 },
      },
    },
  },
  {
    item: {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      market_cap_rank: 2,
      thumb: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
      large: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      data: {
        price: 3456.78,
        price_change_percentage_24h: { usd: -1.21 },
      },
    },
  },
  {
    item: {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      market_cap_rank: 5,
      thumb: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png',
      large: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      data: {
        price: 145.23,
        price_change_percentage_24h: { usd: 5.67 },
      },
    },
  },
  {
    item: {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      market_cap_rank: 8,
      thumb: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png',
      large: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
      data: {
        price: 0.62,
        price_change_percentage_24h: { usd: -3.45 },
      },
    },
  },
  {
    item: {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      market_cap_rank: 12,
      thumb: 'https://assets.coingecko.com/coins/images/877/thumb/chainlink.png',
      large: 'https://assets.coingecko.com/coins/images/877/large/chainlink.png',
      data: {
        price: 18.91,
        price_change_percentage_24h: { usd: 1.12 },
      },
    },
  },
]

const columns: DataTableColumn<TrendingCoin>[] = [
  {
    header: 'Name',
    cellClassName: 'name-cell',
    cell: (coin) => {
      const item = coin?.item;
      return (
        <Link href={`/coins/${item.id}`}>
          <Image src={item.large} alt={item.name} width={36} height={36} />
          <p>{item.name}</p>
        </Link>
      );
    },
  },
  {
    header: '24h Change',
    cellClassName: 'change-cell',
    cell: (coin) => {
      const item = coin.item;
      const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;

      return (
        <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
          <p className="flex items-center">
            {formatPercentage(item.data.price_change_percentage_24h.usd)}
            {isTrendingUp ? (
              <TrendingUp width={16} height={16} />
            ) : (
              <TrendingDown width={16} height={16} />
            )}
          </p>
        </div>
      );
    },
  },
  {
    header: 'Price',
    cellClassName: 'price-cell',
    cell: (coin) => formatCurrency(coin.item.data.price),
  },
]

const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <div id="coin-overview">
          <div className="header pt-2">
            <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt='' width={56} height={56} />
            <div className='info'>
              <p>Bitcoin / BTC</p>
              <h1>$89,133.00</h1>
            </div>
          </div>
        </div>
        <p>Trending Coins</p>
        <DataTable
          columns={columns}
          data={trendingCoinData}
          rowKey={(coin) => coin?.item?.id}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </section>
      <section className="w-full mt-7 space-y-4">
        Categories
      </section>
    </main>
  )
}

export default page