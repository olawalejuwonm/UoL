#include "OrderBook.h"
#include "CSVReader.h"
#include <map>
#include <algorithm>
#include <iostream>

/** construct, reading a csv data file */
OrderBook::OrderBook(std::string filename)
{
    orders = CSVReader::readCSV(filename);
}

// I modified this code
// Based on the code from https://www.geeksforgeeks.org/binary-search/
std::vector<OrderBookEntry> OrderBook::searchByTimestamp(std::vector<OrderBookEntry> &orders, std::string timestamp)
{
    // My modification starts here
    std::vector<OrderBookEntry> filteredOrders;
    // My modification ends here
    int left = 0;
    int right = orders.size() - 1;

    while (left <= right)
    {
        int mid = left + (right - left) / 2;

        // My modification starts here
        if (orders[mid].timestamp == timestamp)
        {
            filteredOrders.push_back(orders[mid]); // Store the order of the matching element

            // Store the index of the matching element
            left = mid + 1;  // Search in the right half
            right = mid - 1; // Search in the left half
        }
        // My modification ends here
        else if (orders[mid].timestamp < timestamp)
        {
            left = mid + 1; // Target is in the right half
        }
        else
        {
            right = mid - 1; // Target is in the left half
        }
    }

    std::cout << "The number of matching elements is: " << filteredOrders.size() << std::endl;
    return filteredOrders; // Target not found in the vector
}
int timeStampBinarySearch(const std::vector<OrderBookEntry> &sortedArray,
                          std::string timestamp,
                          int left,
                          int right)
{

    

    while (left <= right)
    {
        int mid = left + (right - left) / 2;

        if (sortedArray[mid].timestamp == timestamp)
        {
            std::cout << "The matching element is: " << sortedArray[mid].timestamp << std::endl;
            return mid; // Target found at index 'mid'
        }
        else if (sortedArray[mid].timestamp < timestamp)
        {
            left = mid + 1; // Target is in the right half
        }
        else
        {
            right = mid - 1; // Target is in the left half
        }
    }

    std::cout << "No matching element found" << std::endl;
    return -1; // Target not found in the array
}
// End of code that i modified

/** return vector of all know products in the dataset "ETH/USDT", "ETH/BTC", "DOGE/USDT", "DOGE/BTC",
 *
 * "BTC/USDT"
 */
std::vector<std::string> OrderBook::getKnownProducts()
{
    std::vector<std::string> products;

    std::map<std::string, bool> prodMap;

    for (OrderBookEntry &e : orders)
    {
        prodMap[e.product] = true;
    }

    // now flatten the map to a vector of strings
    for (auto const &e : prodMap)
    {
        products.push_back(e.first);
    }

    return products;
}
/** return vector of Orders according to the sent filters*/
std::vector<OrderBookEntry> OrderBook::getOrders(OrderBookType type,
                                                 std::string product,
                                                 std::string timestamp)
{
    std::vector<OrderBookEntry> orders_sub;
    // Start of code that i wrote
    std::vector<OrderBookEntry> filteredOrders = searchByTimestamp(orders, timestamp);
    for (OrderBookEntry &e : filteredOrders)
    {
        std::cout << "getOrders: " << e.timestamp << std::endl;
        if (e.orderType == type &&
            e.product == product)
        {
            orders_sub.push_back(e);
        }
    }
    // End of code that i wrote
    return orders_sub;
}

double OrderBook::getHighPrice(std::vector<OrderBookEntry> &orders)
{
    double max = orders[0].price;
    for (OrderBookEntry &e : orders)
    {
        if (e.price > max)
            max = e.price;
    }
    return max;
}

double OrderBook::getLowPrice(std::vector<OrderBookEntry> &orders)
{
    double min = orders[0].price;
    for (OrderBookEntry &e : orders)
    {
        if (e.price < min)
            min = e.price;
    }
    return min;
}

std::string OrderBook::getEarliestTime()
{
    // this is a wrapper to prevent segmenation fault
    if (orders.size() == 0)
    {
        return "";
    }
    return orders[0].timestamp;
}

// This function returns the next timestamp after the given timestamp
std::string OrderBook::getNextTime(std::string timestamp)
{
    std::string next_timestamp = "";
    for (OrderBookEntry &e : orders)
    {
        if (e.timestamp > timestamp)
        {
            next_timestamp = e.timestamp;
            break;
        }
    }
    if (next_timestamp == "")
    {
        next_timestamp = timestamp; 
        // returns the same timestamp if there is no next timestamp instead of going to the beginning
    }
    return next_timestamp;
}

std::string OrderBook::getPreviousTime(std::string timestamp)
{
    std::string previous_timestamp = "";
    for (OrderBookEntry &e : orders)
    {
        if (e.timestamp < timestamp)
        {
            previous_timestamp = e.timestamp;
        }
    }
    if (previous_timestamp == "")
    {
        previous_timestamp = timestamp; // returns the same timestamp if there is no previous timestamp
    }
    return previous_timestamp;
}

std::vector<std::string> OrderBook::getPreviousTimes(std::string timestamp)
{
    std::vector<std::string> previous_timestamps;
    for (OrderBookEntry &e : orders)
    {
        if (e.timestamp < timestamp)
        {
            // It only push if e.timestamp is not already in the vector
            if (std::find(previous_timestamps.begin(), previous_timestamps.end(), e.timestamp) == previous_timestamps.end())
            {
                previous_timestamps.push_back(e.timestamp);
            }
        }
    }
    return previous_timestamps;
}

void OrderBook::insertOrder(OrderBookEntry &order)
{
    orders.push_back(order);
    std::sort(orders.begin(), orders.end(), OrderBookEntry::compareByTimestamp);
}

std::vector<OrderBookEntry> OrderBook::matchAsksToBids(std::string product, std::string timestamp)
{
    // asks = orderbook.asks
    std::vector<OrderBookEntry> asks = getOrders(OrderBookType::ask,
                                                 product,
                                                 timestamp);
    // bids = orderbook.bids
    std::vector<OrderBookEntry> bids = getOrders(OrderBookType::bid,
                                                 product,
                                                 timestamp);

    // sales = []
    std::vector<OrderBookEntry> sales;

    // I put in a little check to ensure we have bids and asks
    // to process.
    if (asks.size() == 0 || bids.size() == 0)
    {
        std::cout << " OrderBook::matchAsksToBids no bids or asks" << std::endl;
        return sales;
    }

    // sort asks lowest first
    std::sort(asks.begin(), asks.end(), OrderBookEntry::compareByPriceAsc);
    // sort bids highest first
    std::sort(bids.begin(), bids.end(), OrderBookEntry::compareByPriceDesc);
    // for ask in asks:
    std::cout << "max ask " << asks[asks.size() - 1].price << std::endl;
    std::cout << "min ask " << asks[0].price << std::endl;
    std::cout << "max bid " << bids[0].price << std::endl;
    std::cout << "min bid " << bids[bids.size() - 1].price << std::endl;

    for (OrderBookEntry &ask : asks)
    {
        //     for bid in bids:
        for (OrderBookEntry &bid : bids)
        {
            //         if bid.price >= ask.price # we have a match
            if (bid.price >= ask.price)
            {
                //             sale = new order()
                //             sale.price = ask.price
                OrderBookEntry sale{ask.price, 0, timestamp,
                                    product,
                                    OrderBookType::asksale};

                if (bid.username == "simuser")
                {
                    sale.username = "simuser";
                    sale.orderType = OrderBookType::bidsale;
                }
                if (ask.username == "simuser")
                {
                    sale.username = "simuser";
                    sale.orderType = OrderBookType::asksale;
                }

                //             # now work out how much was sold and
                //             # create new bids and asks covering
                //             # anything that was not sold
                //             if bid.amount == ask.amount: # bid completely clears ask
                if (bid.amount == ask.amount)
                {
                    //                 sale.amount = ask.amount
                    sale.amount = ask.amount;
                    //                 sales.append(sale)
                    sales.push_back(sale);
                    //                 bid.amount = 0 # make sure the bid is not processed again
                    bid.amount = 0;
                    //                 # can do no more with this ask
                    //                 # go onto the next ask
                    //                 break
                    break;
                }
                //           if bid.amount > ask.amount:  # ask is completely gone slice the bid
                if (bid.amount > ask.amount)
                {
                    //                 sale.amount = ask.amount
                    sale.amount = ask.amount;
                    //                 sales.append(sale)
                    sales.push_back(sale);
                    //                 # we adjust the bid in place
                    //                 # so it can be used to process the next ask
                    //                 bid.amount = bid.amount - ask.amount
                    bid.amount = bid.amount - ask.amount;
                    //                 # ask is completely gone, so go to next ask
                    //                 break
                    break;
                }

                //             if bid.amount < ask.amount # bid is completely gone, slice the ask
                if (bid.amount < ask.amount &&
                    bid.amount > 0)
                {
                    //                 sale.amount = bid.amount
                    sale.amount = bid.amount;
                    //                 sales.append(sale)
                    sales.push_back(sale);
                    //                 # update the ask
                    //                 # and allow further bids to process the remaining amount
                    //                 ask.amount = ask.amount - bid.amount
                    ask.amount = ask.amount - bid.amount;
                    //                 bid.amount = 0 # make sure the bid is not processed again
                    bid.amount = 0;
                    //                 # some ask remains so go to the next bid
                    //                 continue
                    continue;
                }
            }
        }
    }
    return sales;
}

// std::vector<std::string> OrderBook::getpre