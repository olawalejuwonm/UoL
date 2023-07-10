#pragma once

#include <vector>
#include "OrderBookEntry.h"
#include "OrderBook.h"
#include "Wallet.h"
#include "Candlestick.h"

class MerkelMain
{
public:
    MerkelMain();
    /** Call this to start the sim */
    void init();

private:
    void printMenu();
    void printHelp();
    void printMarketStats();
    void enterAsk();
    void enterBid();
    void printWallet();
    void gotoNextTimeframe();
    int getUserOption();
    void processUserOption(int userOption);
    std::vector<Candlestick> computeCandlestick();
    void visualisePlot();

    std::string currentTime;

    // This will hold the currency and orderType to visualise
    std::vector<Candlestick> computedCandlesticks;

    OrderBook orderBook{"20200317.csv"};

    Wallet wallet;
};
