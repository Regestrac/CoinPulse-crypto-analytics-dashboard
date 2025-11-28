import CoinOverview from '@/components/home/CoinOverview';
import CoinOverviewFallback from '@/components/home/CoinOverviewFallback';
import TrendingCoins from '@/components/home/TrendingCoins';
import { Suspense } from 'react';

const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<div>Loading Trending Coins...</div>}>
          <TrendingCoins />
        </Suspense>
      </section>
      <section className="w-full mt-7 space-y-4">
        Categories
      </section>
    </main>
  )
}

export default page