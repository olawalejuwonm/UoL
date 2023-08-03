// I wrote this code
#include "TextGraph.h" // Include the header file for the TextGraph class
#include "OrderBook.h" // Include the header file for the OrderBook class

TextGraph::TextGraph(OrderBook orderBook, std::string currentTime, std::string product)
{
    // Get all the orders bidded for the given product and time
    std::vector<OrderBookEntry> ordersBidded = orderBook.getOrders(OrderBookType::bid, product, currentTime);
    // Add each bidded order to the bids vector
    for (OrderBookEntry &order : ordersBidded)
    {
        addBid(order.price, order.amount);
    }

    // Get all the orders asked for the given product and time
    std::vector<OrderBookEntry> ordersAsked = orderBook.getOrders(OrderBookType::ask, product, currentTime);
    // Add each asked order to the asks vector
    for (OrderBookEntry &order : ordersAsked)
    {
        addAsk(order.price, order.amount);
    }
    // Set the current time to the given time
    currentTime = currentTime;

    // Print the total number of bids and asks
    std::cout << "Total bids: " << bids.size() << "\n";
    std::cout << "Total asks: " << asks.size() << "\n";
}

void TextGraph::addBid(double price, double quantity)
{
    // Add a new bid to the bids vector with the given price and quantity
    bids.push_back({price, quantity});
}

void TextGraph::addAsk(double price, double quantity)
{
    // Add a new ask to the asks vector with the given price and quantity
    asks.push_back({price, quantity});
}

// End of code I wrote

// I modified this code
void TextGraph::printGraph()
{
    // Define color codes for console output according to the 
    //ANSI escape codes https://en.wikipedia.org/wiki/ANSI_escape_code
    const std::string reset = "\033[0m";
    const std::string red = "\033[31m";
    const std::string green = "\033[32m";
    const std::string yellow = "\033[33m";
    const std::string blue = "\033[34m";
    const std::string magenta = "\033[35m";
    const std::string cyan = "\033[36m";
    const std::string white = "\033[37m";

    // Print the bids section of the graph
    std::cout << "Bids:\n";
    for (auto it = bids.rbegin(); it != bids.rend(); ++it)
    {
        // Print the bid price in green
        std::cout << green << it->price << " " << reset;
        // Print a number of asterisks equal to the bid quantity in green
        for (int i = 0; i < it->quantity; ++i)
        {
            std::cout << green << "*" << reset;
        }
        std::cout << "\n";
    }

    // Print the asks section of the graph
    std::cout << "Asks:\n";
    for (auto &ask : asks)
    {
        // Print the ask price in red
        std::cout << red << ask.price << " " << reset;
        // Print a number of asterisks equal to the ask quantity in red
        for (int i = 0; i < ask.quantity; ++i)
        {
            std::cout << red << "*" << reset;
        }
        std::cout << "\n";
    }
}
// End of code I modified
