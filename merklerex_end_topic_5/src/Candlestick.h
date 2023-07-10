#pragma once

#include <string>
#include "OrderBook.h"
#include "OrderBookEntry.h"

class Candlestick
{
public:
    Candlestick(std::string input, std::string currentTime, OrderBook orderBook);

private:
    std::string timestamp;
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
    double computeOpen(OrderBook orderBook, OrderBookType orderType, std::string product, std::string currentTime);
    // Calculates the average price per unit in the current time frame
    // calculated as Total value/Total price. Total value is sum of each price
    // multiplied by the amount. Total price is the sum of the amount.
    void computeData();
    double open;
    double high;
    double low;
    double close;
};