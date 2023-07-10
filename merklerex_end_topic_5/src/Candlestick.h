#pragma once

#include <string>
#include "OrderBook.h"
#include "OrderBookEntry.h"

class Candlestick
{
public:
    Candlestick(std::string input, std::string currentTime, OrderBook orderBook);
    double open;
    double high;
    double low;
    double close;
    std::string timestamp;


private:
    // Previous time stamp used for calculating open value
    std::string previousTimestamp;
    // All order based on the current time stamp
    std::vector<OrderBookEntry> currentOrderBook;
    // All order based on the previous time stamp
    std::vector<OrderBookEntry> previousOrderBook;
    // Order Type is either ask or bid
    OrderBookType orderType;
    // Product is the currency pair eg ETH/BTC
    std::string product;
    // Calculates the average price per unit in the previous time frame
    //  calculated as Total value/Total price. Total value is sum of each price
    //  multiplied by the amount. Total price is the sum of the amount.
    void computeOpen(OrderBook orderBook, OrderBookType orderType, std::string product, std::string currentTime);
    // Calculates the close, low and high value for currentTime
    void computeData();
};