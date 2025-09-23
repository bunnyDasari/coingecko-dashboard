import React from "react";
import { Search, Settings, Bell, User, TrendingUp } from "lucide-react";

interface HeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    searchHandler: () => void;
}

export default function Header({
    searchTerm,
    onSearchChange,
    searchHandler,
}: HeaderProps) {
    const onClickBtn = () => {
        searchHandler();
    };

    return (
        <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 gap-3 sm:gap-0 py-3 sm:py-0">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                                CryptoDash
                            </h1>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Market Tracker
                            </p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="w-full sm:flex-1 sm:max-w-2xl sm:mx-8">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search cryptocurrencies..."
                                value={searchTerm}
                                onChange={(e) => onSearchChange(e.target.value)}
                                className="w-full pl-12 pr-20 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500 text-sm sm:text-base"
                            />
                            <button
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base transition-all"
                                onClick={onClickBtn}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                            <Bell className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                            <Settings className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all">
                            <User className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
