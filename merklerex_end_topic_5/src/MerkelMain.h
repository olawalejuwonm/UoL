#pragma once

#include <vector>
#include "OrderBookEntry.h"
#include "OrderBook.h"
#include "Wallet.h"
#include "Candlestick.h"

/**
 * @brief The MerkelMain class represents the main class of the MerkleRex application.
 * 
 * This class contains the main functionality of the application, including initializing the simulation,
 * printing the menu, printing help, printing market statistics, entering an ask, entering a bid,
 * printing the wallet, going to the next timeframe, getting the user option, processing the user option,
 * computing the candlestick, and visualizing the plot and graph.
 */
class MerkelMain
{
public:
    /**
     * @brief Constructs a new MerkelMain object.
     * 
     */
    MerkelMain();

    /** 
     * @brief Call this to start the simulation.
     * 
     */
    void init();

private:
    /**
     * @brief Prints the menu options.
     * 
     */
    void printMenu();

    /**
     * @brief Prints the help menu.
     * 
     */
    void printHelp();

    /**
     * @brief Prints the market statistics.
     * 
     */
    void printMarketStats();

    /**
     * @brief Allows the user to enter an ask.
     * 
     */
    void enterAsk();

    /**
     * @brief Allows the user to enter a bid.
     * 
     */
    void enterBid();

    /**
     * @brief Prints the wallet.
     * 
     */
    void printWallet();

    /**
     * @brief Goes to the next timeframe.
     * 
     */
    void gotoNextTimeframe();

    /**
     * @brief Gets the user option.
     * 
     * @return int The user option.
     */
    int getUserOption();

    /**
     * @brief Processes the user option.
     * 
     * @param userOption The user option.
     */
    void processUserOption(int userOption);

    // I wrote this code
    /**
     * @brief Computes the candlestick.
     * 
     * @return std::vector<Candlestick> The computed candlestick.
     */
    std::vector<Candlestick> computeCandlestick();

    /**
     * @brief Visualizes the plot.
     * 
     */
    void visualisePlot();

    /**
     * @brief Visualizes the graph.
     * 
     */
    void visualiseGraph();

    std::string currentTime; // The current time.

    // This will hold the currency and orderType to visualize
    std::vector<Candlestick> computedCandlesticks; // The computed candlesticks.
    // End of code I wrote

    OrderBook orderBook{"20200317.csv"}; // The order book.

    Wallet wallet; // The wallet.
};