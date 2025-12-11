'use client';

import { Separator } from "@/components/ui/separator"
import CandlestickChart from "@/components/CandlestickChart"
import { useCoinGeckoWebSocket } from "@/hooks/useCoinGeckoWebSocket";
import { cn, formatCurrency, timeAgo } from "@/lib/utils";
import DataTable from "@/components/DataTable";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import CoinHeader from "./CoinHeader";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

const LiveDataWrapper = ({ coinId, poolId, coin, coinOHLCData }: LiveDataProps) => {
  const [liveInterval, setLiveInterval] = useState<'1s' | '1m'>('1s');
  const router = useRouter();
  const [isRefreshing, startTransition] = useTransition();

  const { trades, ohlcv, price, isConnected } = useCoinGeckoWebSocket({ coinId, poolId, liveInterval });

  const tradeColumns: DataTableColumn<Trade>[] = [
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: (trade) => (trade.price ? formatCurrency(trade.price) : '-'),
    },
    {
      header: 'Amount',
      cellClassName: 'amount-cell',
      cell: (trade) => trade.amount?.toFixed(4) ?? '-',
    },
    {
      header: 'Value',
      cellClassName: 'value-cell',
      cell: (trade) => (trade.value ? formatCurrency(trade.value) : '-'),
    },
    {
      header: 'Buy/Sell',
      cellClassName: 'type-cell',
      cell: (trade) => (
        <span className={trade.type === 'b' ? 'text-green-500' : 'text-red-500'}>
          {trade.type === 'b' ? 'Buy' : 'Sell'}
        </span>
      ),
    },
    {
      header: 'Time',
      cellClassName: 'time-cell',
      cell: (trade) => (trade.timestamp ? timeAgo(trade.timestamp) : '-'),
    },
  ];

  return (
    <section id='live-data-wrapper'>
      {!isConnected && (
        <div className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertTriangle className="size-4 shrink-0" />
          <span className="flex-1">
            Live data update is unavailable because you are using CoinGecko demo API. You can try manual refresh with the button.
          </span>
          <Button variant="outline" size="xs" disabled={isRefreshing} onClick={() => startTransition(() => router.refresh())}>
            <RefreshCw className={cn("size-3", isRefreshing && "animate-spin")} />
            Refresh
          </Button>
        </div>
      )}

      <CoinHeader
        name={coin.name}
        image={coin.image.large}
        livePrice={price?.usd ?? coin.market_data.current_price.usd}
        livePriceChangePercentage24h={
          price?.change24h ?? coin.market_data.price_change_percentage_24h_in_currency.usd
        }
        priceChangePercentage30d={coin.market_data.price_change_percentage_30d_in_currency.usd}
        priceChange24h={coin.market_data.price_change_24h_in_currency.usd}
      />

      <Separator className="divider" />

      <div className="trend">
        <CandlestickChart
          coinId={coinId}
          data={coinOHLCData}
          liveOhlcv={ohlcv}
          mode="live"
          initialPeriod="daily"
          liveInterval={liveInterval}
          setLiveInterval={setLiveInterval}
          isWSReady={isConnected}
        >
          <h4>Trend Overview</h4>
        </CandlestickChart>
      </div>

      <Separator className="divider" />

      {tradeColumns && trades?.length > 0 ? (
        <div className="trades">
          <h4>Recent Trades</h4>

          <DataTable
            columns={tradeColumns}
            data={trades}
            rowKey={(_, index) => index}
            tableClassName="trades-table"
          />
        </div>
      ) : null}
    </section>
  )
}

export default LiveDataWrapper;