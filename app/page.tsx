import CoinOverview from '@/components/home/CoinOverview';
import TrendingCoins from '@/components/home/TrendingCoins';

const page = () => {
  return (
    <main className='main-container'>
      <section className='home-grid'>
        <CoinOverview />

        <TrendingCoins />
      </section>
      <section className="w-full mt-7 space-y-4">
        Categories
      </section>
    </main>
  )
}

export default page