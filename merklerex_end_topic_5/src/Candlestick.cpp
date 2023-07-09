#include "Candlestick.h"
#include "OrderBook.h"
#include "CSVReader.h"
#include <iostream>
#include "OrderBookEntry.h"

Candlestick::Candlestick(std::string input, std::string currentTime, OrderBook orderBook)
{
    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 2)
    {
        std::cout << "You entered a bad input! It should be in the form of product,orderType eg ETH/BTC,ask" << std::endl;
        return;
    }
    // TODO: check if the product is valid
    std::string product = tokens[0];
    std::vector<std::string> validProducts = orderBook.getKnownProducts();
    std::string type = tokens[1];
    OrderBookType orderType;
    try
    {
        orderType = OrderBookEntry::stringToOrderBookType(type);
    }
    catch (const std::exception &e)
    {
        std::cout << "You entered a bad input! Order type should be either ask or bid" << std::endl;
        return;
    }

    std::vector<OrderBookEntry> currentOrderBook = orderBook.getOrders(
        orderType, product, currentTime);

    //NEXT get the top, bottom, open, close, high, low.

}