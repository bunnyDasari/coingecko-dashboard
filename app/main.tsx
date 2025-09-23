'use client';
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HighlightsSection from './components/HighlightsSection';
import CryptoTable from './components/CryptoTable';

function Main() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [cryptosList, setCryptosList] = useState([]);
    const [topGainers, settopGainers] = useState([])
    const [topLosers, settopLosers] = useState([])
    const [highestVolume, sethighestVolume] = useState([])

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        onClickBtn()

        return () => clearTimeout(timer);

    }, []);

    const onClickBtn = async () => {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        setCryptosList(data)
        TopLosers()
        console.log({ data })
    }

    const searchHandler = () => {
        const filteredCryptos = cryptosList.filter((crypto: any) =>
            crypto.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredCryptos.length === 0) {
            alert("No matching cryptocurrencies found.");
            return;
        }
        setCryptosList(filteredCryptos)
    }

    const TopLosers = () => {
        const filterArrray = cryptosList.filter((crypto: any) => {
            if (crypto.price_change_percentage_24h < 0) {
                return crypto
            }
        })
        settopLosers(filterArrray)
        console.log(filterArrray)
    }

    const TopGainers = () => {
        const filterArrray = cryptosList.filter((crypto: any) => {
            if (crypto.price_change_percentage_24h > 0) {
                return crypto
            }
        })
        settopGainers(filterArrray)
        console.log(filterArrray)
    }

    const HighestVolume = () => {
        const filterArrray = cryptosList.filter((crypto: any) => {
            if (crypto.total_volume > 0) {
                return crypto
            }
        })
        sethighestVolume(filterArrray)
        console.log(filterArrray)
    }



    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} searchHandler={searchHandler} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Cryptocurrency Market Overview
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Track real-time prices, market caps, and trading volumes for all cryptocurrencies
                    </p>
                </div>


                <HighlightsSection isLoading={isLoading} TopLosers={TopLosers} TopGainers={TopGainers} HighestVolume={HighestVolume} topGainers={topGainers} topLosers={topLosers} highestVolume={highestVolume} />

                <CryptoTable searchTerm={searchTerm} isLoading={isLoading} cryptosList={cryptosList} />
            </main>
        </div >
    );
}

export default Main;