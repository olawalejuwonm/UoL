// I wrote this code
#pragma once

#include <string>
#include "OrderBook.h"
#include "OrderBookEntry.h"

// Candlestick class represents a candlestick chart for a given currency pair
class Candlestick
{
public:
    // Constructor for Candlestick class
    // input: the product for which the candlestick is being created
    // currentTime: the current time for which the candlestick is being created
    // orderBook: the order book for the given product
    Candlestick(std::string input, std::string currentTime, OrderBook orderBook);

    // Open value for the current time frame
    double open;
    // High value for the current time frame
    double high;
    // Low value for the current time frame
    double low;
    // Close value for the current time frame
    double close;
    // Timestamp for the current time frame
    std::string timestamp;

private:
    // Previous time stamp used for calculating open value
    std::string previousTimestamp;
    // All orders based on the current time stamp
    std::vector<OrderBookEntry> currentOrderBook;
    // All orders based on the previous time stamp
    std::vector<OrderBookEntry> previousOrderBook;
    // Order Type is either ask or bid
    OrderBookType orderType;
    // Product is the currency pair eg ETH/BTC
    std::string product;

    // Calculates the average price per unit in the previous time frame
    // calculated as Total value/Total price. Total value is sum of each price
    // multiplied by the amount. Total price is the sum of the amount.
    void computeOpen(OrderBook orderBook, OrderBookType orderType,
                     std::string product, std::string currentTime);

    // Calculates the close, low and high value for currentTime
    void computeData();
};

// end of code I wrote