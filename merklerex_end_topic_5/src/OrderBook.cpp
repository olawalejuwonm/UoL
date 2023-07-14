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

    std::cout << "Timestamp not found in the vector" << std::endl;
    return filteredOrders; // Target not found in the vector
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
    std::string next_timestamp = ""; // Initialize an empty string to store the next timestamp
    int l = 0, r = orders.size() - 1; // Initialize left and right indices for binary search
    while (l <= r) // Continue until left index is greater than right index
    {
        int mid = l + (r - l) / 2; // Calculate the middle index
        if (orders[mid].timestamp == timestamp) // If the timestamp at the middle index is equal to the given timestamp
        {
            if (mid + 1 < orders.size()) // If there is a next timestamp
            {
                next_timestamp = orders[mid + 1].timestamp; // Set the next timestamp to the timestamp at the next index
            }
            break; // Exit the loop
        }
        else if (orders[mid].timestamp < timestamp) // If the timestamp at the middle index is less than the given timestamp
        {
            l = mid + 1; // Update the left index to search the right half of the array
        }
        else // If the timestamp at the middle index is greater than the given timestamp
        {
            next_timestamp = orders[mid].timestamp; // Set the next timestamp to the timestamp at the middle index
            r = mid - 1; // Update the right index to search the left half of the array
        }
    }
    if (next_timestamp == "") // If there is no next timestamp
    {
        next_timestamp = timestamp; // Set the next timestamp to the given timestamp
        // returns the same timestamp if there is no next timestamp instead of going to the beginning
    }
    std::cout << "getNextTime: " << next_timestamp << std::endl; // Print the next timestamp
    return next_timestamp; // Return the next timestamp
}

// This function returns the previous timestamp before the given timestamp
std::string OrderBook::getPreviousTime(std::string timestamp)
{
    std::string previous_timestamp = ""; // Initialize an empty string to store the previous timestamp
    int l = 0, r = orders.size() - 1;    // Initialize left and right indices for binary search
    while (l <= r)                       // Continue until left index is greater than right index
    {
        int mid = l + (r - l) / 2;              // Calculate the middle index
        if (orders[mid].timestamp == timestamp) // If the timestamp at the middle index is equal to the given timestamp
        {
            if (mid - 1 >= 0) // If there is a previous timestamp
            {
                previous_timestamp = orders[mid - 1].timestamp; // Set the previous timestamp to the timestamp at the previous index
            }
            break; // Exit the loop
        }
        else if (orders[mid].timestamp < timestamp) // If the timestamp at the middle index is less than the given timestamp
        {
            previous_timestamp = orders[mid].timestamp; // Set the previous timestamp to the timestamp at the middle index
            l = mid + 1;                                // Update the left index to search the right half of the array
        }
        else // If the timestamp at the middle index is greater than the given timestamp
        {
            r = mid - 1; // Update the right index to search the left half of the array
        }
    }
    if (previous_timestamp == "") // If there is no previous timestamp
    {
        previous_timestamp = timestamp; // Set the previous timestamp to the given timestamp
        // returns the same timestamp if there is no previous timestamp instead of going to the end
    }
    std::cout << "getPreviousTime: " << previous_timestamp << std::endl; // Print the previous timestamp
    return previous_timestamp;                                           // Return the previous timestamp
}

// Returns a vector of previous timestamps before the given timestamp
std::vector<std::string> OrderBook::getPreviousTimes(std::string timestamp)
{
    std::vector<std::string> previous_timestamps; // Initialize an empty vector to store previous timestamps
    int l = 0, r = orders.size() - 1;             // Initialize left and right indices for binary search
    while (l <= r)                                // Continue until left index is greater than right index
    {
        int mid = l + (r - l) / 2;             // Calculate the middle index
        if (orders[mid].timestamp < timestamp) // If the timestamp at the middle index is less than the given timestamp
        {
            // Add the timestamp to the vector if it's not already there
            if (previous_timestamps.empty() || previous_timestamps.back() != orders[mid].timestamp)
            {
                previous_timestamps.push_back(orders[mid].timestamp);
            }
            l = mid + 1; // Update the left index to search the right half of the array
        }
        else // If the timestamp at the middle index is greater than or equal to the given timestamp
        {
            r = mid - 1; // Update the right index to search the left half of the array
        }
    }
    std::cout << "getPreviousTimes: " << previous_timestamps.size() << std::endl;
    return previous_timestamps; // Return the vector of previous timestamps
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