import React, { useState } from "react";
import { TrendingUp, TrendingDown, Star } from "lucide-react";
import CoinModal from "./CoinModal";

interface Cryptocurrency {
    id: string;
    rank: number;
    name: string;
    symbol: string;
    price: number;
    change24h: number;
    marketCap: number;
    volume24h: number;
    supply: number;
    logo: string;
    description?: string;
    market_cap_change_24h: number;
    market_cap_rank: number;
    current_price: number;
    market_cap: number;
    high_24h: number;
    price_change_24h: number;
}
interface Cryptocurrencies {
    name: string;
    symbol: string;
    id: string;
    current_price: number;
    market_cap_rank: number;
    image: string;
}
interface CryptoTableProps {
    searchTerm: string;
    isLoading?: boolean;
    cryptosList: Cryptocurrencies[];
}

export default function CryptoTable({
    isLoading = false,
    cryptosList: initialCryptosList,
}: CryptoTableProps) {
    const [sortBy, setSortBy] = useState<keyof Cryptocurrency>("rank");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedCoin, setSelectedCoin] = useState<Cryptocurrency | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSort = (key: keyof Cryptocurrency) => {
        if (sortBy === key) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(key);
            setSortOrder("asc");
        }
        console.log("clciked")
    };

    const handleRowClick = (coin: Cryptocurrency) => {
        setSelectedCoin(coin);
        setIsModalOpen(true);
    };

    const formatPrice = (price: number): string => {
        if (price < 1) {
            return `$${price.toFixed(4)}`;
        }
        return `$${price.toLocaleString()}`;
    };

    const formatNumber = (num: number): string => {
        if (num >= 1e12) return (num / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
        if (num >= 1e9) return (num / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
        if (num >= 1e6) return (num / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
        if (num >= 1e3) return (num / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
        return num.toString();
    };

    const formatNumberMin = (num: number): string => {
        const sign = num < 0 ? "-" : "";
        const absNum = Math.abs(num);

        if (absNum >= 1e12)
            return sign + (absNum / 1e12).toFixed(2).replace(/\.00$/, "") + "T";
        if (absNum >= 1e9)
            return sign + (absNum / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
        if (absNum >= 1e6)
            return sign + (absNum / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
        if (absNum >= 1e3)
            return sign + (absNum / 1e3).toFixed(2).replace(/\.00$/, "") + "K";

        return sign + absNum.toFixed(2).replace(/\.00$/, "");
    };

    const LoadingRow = () => (
        <tr className="animate-pulse">
            {Array.from({ length: 7 }).map((_, i) => (
                <td key={i} className="px-2 py-2 sm:px-4 sm:py-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </td>
            ))}
        </tr>
    );

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        All Cryptocurrencies
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 text-xs sm:text-sm">
                        Track prices and market data for all coins
                    </p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-xs sm:text-sm md:text-base">
                        <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <button onClick={() => handleSort("rank")}>Rank</button>
                                </th>
                                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <button onClick={() => handleSort("name")}>Coin</button>
                                </th>
                                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <button onClick={() => handleSort("price")}>Price</button>
                                </th>
                                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <button onClick={() => handleSort("change24h")}>
                                        24h Change
                                    </button>
                                </th>
                                <th className="hidden md:table-cell px-6 py-4 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Market Cap
                                </th>
                                <th className="hidden md:table-cell px-6 py-4 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    24h Volume
                                </th>
                                <th className="px-2 py-2 sm:px-4 sm:py-3 text-left font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => <LoadingRow key={i} />)
                            ) : (

                                initialCryptosList.map((crypto: any) => (
                                    <tr
                                        key={crypto.id}
                                        onClick={() => handleRowClick(crypto)}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                                    >
                                        <td className="px-2 py-2 sm:px-4 sm:py-3 font-medium">
                                            {crypto.market_cap_rank}
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <div className="flex items-center space-x-2 sm:space-x-3">
                                                <img
                                                    alt={crypto.name}
                                                    className="rounded-full"
                                                    src={crypto.image}
                                                    width={24}
                                                    height={24}
                                                />
                                                <div>
                                                    <div className="font-semibold">{crypto.name}</div>
                                                    <div className="uppercase text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs">
                                                        {crypto.symbol}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3 font-bold">
                                            {formatPrice(crypto.current_price)}
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <div
                                                className={`flex items-center space-x-1 font-semibold ${crypto.price_change_24h >= 0
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-red-600 dark:text-red-400"
                                                    }`}
                                            >
                                                {crypto.price_change_24h >= 0 ? (
                                                    <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                                                ) : (
                                                    <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                                                )}
                                                <span className="hidden sm:inline">
                                                    {formatNumberMin(crypto.price_change_24h)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 font-semibold">
                                            {formatNumber(crypto.market_cap)}
                                        </td>
                                        <td className="hidden md:table-cell px-6 py-4 font-semibold">
                                            {formatNumberMin(crypto.price_change_24h)}
                                        </td>
                                        <td className="px-2 py-2 sm:px-4 sm:py-3">
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors"
                                            >
                                                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <CoinModal
                coin={selectedCoin}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                market_cap_rank={selectedCoin?.market_cap_rank ?? 0}
            />
        </>
    );
}
