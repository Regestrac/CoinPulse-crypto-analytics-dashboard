import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const coinDetails = [
  {
    label: 'Market Cap',
    value: '$1234567',
    link: '',
    linkText: '',
  },
  {
    label: 'Market Cap',
    value: '$1234567',
  },
  {
    label: 'Market Cap',
    value: '$1234567',
  },
  {
    label: 'Market Cap',
    value: '$1234567',
  },
  {
    label: 'Market Cap',
    value: '$1234567',
  },
]

const CoinDetails = async ({ params }: NextPageProps) => {
  const { id } = await params;

  return (
    <main id="coin-details-page">
      <section className="primary">
        <h1>
          Coin <strong>{id}</strong>
        </h1>

        <p>Trend overview</p>

        <p>Recent trades</p>

        <p>Exchange listings</p>
      </section>

      <section className="secondary">
        <h4>Coin details</h4>
        <ul className="details-grid">
          {coinDetails.map(({ label, link, value, linkText }, index) => (
            <li key={index}>
              <p className={label}>{label}</p>

              {link ? (
                <div className="link">
                  <Link href={link} target="_blank">
                    {linkText || label}
                  </Link>
                  <ArrowUpRight size={16} />
                </div>
              ) : (
                <p className="text-base font-medium">{value}</p>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default CoinDetails;