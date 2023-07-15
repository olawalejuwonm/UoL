#include "TextGraph.h"
#include "OrderBook.h"

TextGraph::TextGraph(OrderBook orderBook, std::string currentTime, std::string product)
{
    std::vector<OrderBookEntry> ordersBidded = orderBook.getOrders(OrderBookType::bid, product, currentTime);
    for (OrderBookEntry &order : ordersBidded)
    {

        addBid(order.price, order.amount);
    }

    std::vector<OrderBookEntry> ordersAsked = orderBook.getOrders(OrderBookType::ask, product, currentTime);
    for (OrderBookEntry &order : ordersAsked)
    {

        addAsk(order.price, order.amount);
    }
    currentTime = currentTime;

    std::cout << "Total bids: " << bids.size() << "\n";
    std::cout << "Total asks: " << asks.size() << "\n";
}

void TextGraph::addBid(double price, double quantity)
{
    bids.push_back({price, quantity});
}

void TextGraph::addAsk(double price, double quantity)
{
    asks.push_back({price, quantity});
}

void TextGraph::printGraph()
{
    // Define color codes
    const std::string reset = "\033[0m";
    const std::string red = "\033[31m";
    const std::string green = "\033[32m";
    const std::string yellow = "\033[33m";
    const std::string blue = "\033[34m";
    const std::string magenta = "\033[35m";
    const std::string cyan = "\033[36m";
    const std::string white = "\033[37m";

    std::cout << "Bids:\n";
    for (auto it = bids.rbegin(); it != bids.rend(); ++it)
    {
        std::cout << green << it->price << " " << reset;
        for (int i = 0; i < it->quantity; ++i)
        {
            std::cout << green << "*" << reset;
        }
        std::cout << "\n";
    }

    std::cout << "Asks:\n";
    for (auto &ask : asks)
    {
        std::cout << red << ask.price << " " << reset;
        for (int i = 0; i < ask.quantity; ++i)
        {
            std::cout << red << "*" << reset;
        }
        std::cout << "\n";
    }


}
