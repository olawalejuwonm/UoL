#include "Candlestick.h"
#include "OrderBook.h"
#include "CSVReader.h"
#include <iostream>
#include "OrderBookEntry.h"
#include <algorithm>
#include "vector"

Candlestick::Candlestick(std::string input, std::string currentTime, OrderBook orderBook)
{
    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 2)
    {
        std::cout << "You entered a bad input! It should be in the form of product,orderType eg ETH/BTC,ask" << std::endl;
        // Terminate the function

        return;
    }
    // TODO: check if the product is valid
    product = tokens[0];
    std::vector<std::string> validProducts = orderBook.getKnownProducts();
    // This checks if the product is in the list of valid products
    if (std::find(validProducts.begin(), validProducts.end(), product) == validProducts.end())
    {
        std::cout << "You entered a bad input! Product is not valid" << std::endl;
        return;
    }
    std::string type = tokens[1];
    try
    {
        orderType = OrderBookEntry::stringToOrderBookType(type);
    }
    catch (const std::exception &e)
    {
        std::cout << "You entered a bad input! Order type should be either ask or bid" << std::endl;
        return;
    }

    currentOrderBook = orderBook.getOrders(
        orderType, product, currentTime);

    timestamp = currentTime;

    computeData();

    // console the system time and date for the machine
    // std::cout << "The current time is: " << std::time(nullptr) << std::endl;
    std::cout << "Compute open starts" << std::endl;
    computeOpen(orderBook, orderType, product, currentTime);
    std::cout << "Compute open completed" << std::endl;
}

void Candlestick::computeOpen(OrderBook orderBook, OrderBookType orderType,
                              std::string product, std::string currentTime)
{
    previousTimestamp = orderBook.getPreviousTime(currentTime);
    // If the previous time stamp is the same as the current time stamp
    // then there is no open value, it is the same as the close value
    if (previousTimestamp == currentTime)
    {
        open = close;
    }
    else
    {
        previousOrderBook = orderBook.getOrders(orderType, product, previousTimestamp);

        double totalValue = 0;
        double totalPrice = 0;
        for (OrderBookEntry &e : previousOrderBook)
        {
            totalValue += e.amount * e.price;
            totalPrice += e.amount;
        }
        open = totalValue / totalPrice;
    }

}

void Candlestick::computeData()
{
    double totalValue = 0;
    double totalPrice = 0;
    double highestPrice = 0;
    double lowestPrice = INT_MAX; // INT_MAX is the maximum value for an int
    // This was done so that the lowest price can be found
    for (OrderBookEntry &e : currentOrderBook)
    {
        totalValue += e.amount * e.price;
        totalPrice += e.amount;
        if (e.price > highestPrice)
        {
            highestPrice = e.price;
        }
        if (e.price < lowestPrice)
        {
            lowestPrice = e.price;
        }
    }

    close = totalValue / totalPrice;
    high = highestPrice;
    low = lowestPrice;
}