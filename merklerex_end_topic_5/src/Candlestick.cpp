// I wrote this code
#include "Candlestick.h"
#include "OrderBook.h"
#include "CSVReader.h"
#include <iostream>
#include "OrderBookEntry.h"
#include <algorithm>
#include "vector"

Candlestick::Candlestick(std::string input, std::string currentTime, OrderBook orderBook)
{
    // Tokenize the input string using comma as delimiter
    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    // Check if the input string has two tokens
    if (tokens.size() != 2)
    {
        std::cout << "You entered a bad input! It should be in the form of product,orderType eg ETH/BTC,ask" << std::endl;
        // Terminate the function
        return;
    }
    // Set the product to the first token
    product = tokens[0];
    // Get the list of valid products from the order book
    std::vector<std::string> validProducts = orderBook.getKnownProducts();
    // Check if the product is in the list of valid products
    if (std::find(validProducts.begin(), validProducts.end(), product) == validProducts.end())
    {
        std::cout << "You entered a bad input! Product is not valid" << std::endl;
        return;
    }
    // Set the order type to the second token
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
    // Get the current order book for the given product, order type and time
    currentOrderBook = orderBook.getOrders(
        orderType, product, currentTime);
    // Set the timestamp to the current time
    timestamp = currentTime;
    // Compute the candlestick data
    computeData();
    // Compute the open value for the candlestick
    computeOpen(orderBook, orderType, product, currentTime);
}

void Candlestick::computeOpen(OrderBook orderBook, OrderBookType orderType,
                              std::string product, std::string currentTime)
{
    // Get the previous timestamp
    previousTimestamp = orderBook.getPreviousTime(currentTime);
    // If the previous time stamp is the same as the current time stamp
    // then there is no open value, it is the same as the low value
    if (previousTimestamp == currentTime)
    {
        open = low;
    }
    else
    {
        // Get the previous order book for the given product, order type and time
        previousOrderBook = orderBook.getOrders(orderType, product, previousTimestamp);
        // Compute the total value and total price for the previous order book
        double totalValue = 0;
        double totalPrice = 0;
        for (OrderBookEntry &e : previousOrderBook)
        {
            totalValue += e.amount * e.price;
            totalPrice += e.amount;
        }
        // Compute the open value as the average price of the previous order book
        open = totalValue / totalPrice;
    }
}

void Candlestick::computeData()
{
    // Compute the total value, total price, highest price and lowest price for the current order book
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
    // Compute the close value as the average price of the current order book
    close = totalValue / totalPrice;
    // Set the high value to the highest price in the current order book
    high = highestPrice;
    // Set the low value to the lowest price in the current order book
    low = lowestPrice;
}

// End of code I wrote