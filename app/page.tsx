import Categories from '@/components/home/Categories';
import CoinOverview from '@/components/home/CoinOverview';
import CoinOverviewFallback from '@/components/home/CoinOverviewFallback';
import TrendingCoins from '@/components/home/TrendingCoins';
import TrendingCoinsFallback from '@/components/home/TrendingCoinsFallback';
import { Suspense } from 'react';

const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinsFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        <Categories />
      </section>
    </main>
  )
}

export default page