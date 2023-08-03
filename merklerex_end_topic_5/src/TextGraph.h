// I wrote this code
#pragma once

#include <iostream>
#include <vector>
#include "OrderBook.h"

// Define a struct to represent an order with a price and quantity
struct Order
{
    double price;    // The price of the order
    double quantity; // The quantity of the order
};

// Define a class to represent a text graph of an order book
class TextGraph
{
public:
    // Constructor that takes an OrderBook object, the current time, and the product name
    TextGraph(OrderBook orderBook, std::string currentTime, std::string product);

    // Method to print the graph to the console
    void printGraph();

private:
    std::vector<Order> bids;                    // Vector to store the bids
    std::vector<Order> asks;                    // Vector to store the asks
    void addBid(double price, double quantity); // Method to add a bid to the bids vector
    void addAsk(double price, double quantity); // Method to add an ask to the asks vector
    std::string currentTime;                    // The current time
};

// End of code I wrote