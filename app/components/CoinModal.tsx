import React from "react";
import { X, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";

interface Cryptocurrency {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    price: number;
    market_cap_change_24h: number;
    marketCap: number;
    volume24h: number;
    supply: number;
    logo: string;
    description?: string;
    market_cap_rank: number;
    current_price: number;
    change24h: number;
    market_cap: number;
    high_24h: number;
    price_change_24h: number;
}

interface CoinModalProps {
    market_cap_rank: number;
    coin: Cryptocurrency | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function CoinModal({
    coin,
    isOpen,
    onClose,
}: CoinModalProps) {
    if (!isOpen || !coin) return null;

    const formatPrice = (price: number): string => {
        if (price < 1) {
            return `$${price.toFixed(6)}`;
        }
        return `$${price.toLocaleString()}`;
    };

    const formatMarketCap = (marketCap: number): string => {
        if (marketCap >= 1e12) {
            return `$${(marketCap / 1e12).toFixed(2)}T`;
        }
        if (marketCap >= 1e9) {
            return `$${(marketCap / 1e9).toFixed(2)}B`;
        }
        if (marketCap >= 1e6) {
            return `$${(marketCap / 1e6).toFixed(2)}M`;
        }
        return `$${marketCap.toLocaleString()}`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto sm:rounded-2xl sm:w-full">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                {coin.id}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 font-medium text-sm sm:text-base">
                                {coin.symbol} • Rank #{coin.market_cap_rank}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>


                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 gap-2 sm:gap-0">
                        <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                            {formatPrice(coin.current_price)}
                        </div>
                        <div
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto ${coin.change24h >= 0
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                        >
                            {coin.price_change_24h > 0 ? (
                                <TrendingUp className="h-4 w-4" />
                            ) : (
                                <TrendingDown className="h-4 w-4" />
                            )}
                            <span>{coin.market_cap_change_24h.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>

                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Market Cap
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                    {formatMarketCap(coin.market_cap)}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    24h Volume
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                    {formatMarketCap(coin.high_24h)}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Circulating Supply
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                    {coin.symbol}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    Market Rank
                                </p>
                                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                    #{coin.market_cap_rank}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        About {coin.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
                        {coin.description ||
                            `${coin.name} (${coin.symbol}) is a cryptocurrency that has gained significant attention in the digital asset space. It represents innovation in blockchain technology and continues to evolve with market demands and technological advancements.`}
                    </p>


                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-4">
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors w-full sm:w-auto">
                            <ExternalLink className="h-4 w-4" />
                            <span>View on Explorer</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors w-full sm:w-auto">
                            <span>Add to Watchlist</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
