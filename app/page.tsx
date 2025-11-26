import Image from 'next/image'

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
      </section>
      <section className="w-full mt-7 space-y-4">
        Categories
      </section>
    </main>
  )
}

export default page