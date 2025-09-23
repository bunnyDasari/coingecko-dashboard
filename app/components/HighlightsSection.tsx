'use client';
import React, { useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { on } from 'events';

interface HighlightCoin {
    name: string;
    symbol: string;
    price: number;
    change: number;
    logo: string;
    price_change_24h: number;
}

interface HighlightsSectionProps {
    isLoading?: boolean;
    TopLosers?: () => void;
    TopGainers?: () => void;
    HighestVolume?: () => void;
    topGainers?: HighlightCoin[];
    topLosers?: HighlightCoin[];
    highestVolume?: HighlightCoin[];
}

export default function HighlightsSection({ isLoading = false, TopLosers, TopGainers, HighestVolume, topGainers, topLosers, highestVolume }: HighlightsSectionProps) {


    const LoadingSkeleton = () => (
        <div className="animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
    );
    const onClickHighlightCard = () => {
        TopGainers && TopGainers()
        TopLosers && TopLosers()
        HighestVolume && HighestVolume()
    }
    const HighlightCard = ({
        title,
        coins,
        icon,
        bgGradient
    }: {
        title: string;
        coins: HighlightCoin[];
        icon: React.ReactNode;
        bgGradient: string;
    }) => (
        <div className={`${bgGradient} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer`} onClick={onClickHighlightCard}>
            <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {icon}
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
            </div>

            <div className="space-y-3">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <LoadingSkeleton key={i} />
                    ))
                ) : (
                    coins.map((coin, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                                {/* <span className="text-lg">{coin.logo}</span> */}
                                <div>
                                    <div className="font-medium">{coin.name}</div>
                                    <div className="text-sm opacity-80">{coin.symbol}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">
                                    ${coin.price_change_24h < 1 ? coin.price_change_24h : coin.price_change_24h.toLocaleString()}
                                </div>
                                {/* <div className={`text-sm font-medium ${coin.change >= 0 ? 'text-green-200' : 'text-red-200'
                                    }`}>
                                    {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(2)}%
                                </div> */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <HighlightCard
                title="Top Gainers (24h)"
                coins={topGainers ?? []}
                icon={<TrendingUp className="h-5 w-5" />}
                bgGradient="bg-gradient-to-br from-green-500 to-emerald-600"

            />

            <HighlightCard
                title="Top Losers (24h)"
                coins={topLosers ?? []}
                icon={<TrendingDown className="h-5 w-5" />}
                bgGradient="bg-gradient-to-br from-red-500 to-rose-600"
            />

            <HighlightCard
                title="Highest Volume"
                coins={highestVolume ?? []}
                icon={<Activity className="h-5 w-5" />}
                bgGradient="bg-gradient-to-br from-blue-500 to-indigo-600"
            />
        </div>
    );
}