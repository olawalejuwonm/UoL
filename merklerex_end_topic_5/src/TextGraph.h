#pragma once

#include <iostream>
#include <vector>
#include "OrderBook.h"

struct Order
{
    double price;
    double quantity;
};

class TextGraph
{
public:
    TextGraph(OrderBook orderBook, std::string currentTime, std::string product);
    void printGraph();

private:
    std::vector<Order> bids;
    std::vector<Order> asks;
    void addBid(double price, double quantity);

    void addAsk(double price, double quantity);

    std::string currentTime;
};