#include "MerkelMain.h"
#include <iostream>
#include <vector>
#include "OrderBookEntry.h"
#include "CSVReader.h"
#include "Candlestick.h"
#include "TextPlot.h"
#include "TextGraph.h"

MerkelMain::MerkelMain()
{
}

void MerkelMain::init()
{
    int input;
    currentTime = orderBook.getEarliestTime();

    wallet.insertCurrency("BTC", 10);

    while (true)
    {
        printMenu();
        input = getUserOption();
        processUserOption(input);
    }
}

void MerkelMain::printMenu()
{
    // 1 print help
    std::cout << "1: Print help " << std::endl;
    // 2 print exchange stats
    std::cout << "2: Print exchange stats" << std::endl;
    // 3 make an offer
    std::cout << "3: Make an offer " << std::endl;
    // 4 make a bid
    std::cout << "4: Make a bid " << std::endl;
    // 5 print wallet
    std::cout << "5: Print wallet " << std::endl;
    // 6 continue
    std::cout << "6: Continue " << std::endl;
    // 7 Compute
    std::cout << "7: Compute Candle Stick " << std::endl;
    // 8 Visualise plot
    std::cout << "8: Visualise plot " << std::endl;
    // 9 Visualise Ask and Bid
    std::cout << "9: Visualise Ask and Bid " << std::endl;

    std::cout << "============== " << std::endl;

    std::cout << "Current time is: " << currentTime << std::endl;
}

void MerkelMain::printHelp()
{
    std::cout << "Help - your aim is to make money. Analyse the market and make bids and offers. " << std::endl;
}

void MerkelMain::printMarketStats()
{
    for (std::string const &p : orderBook.getKnownProducts())
    {
        std::cout << "Product: " << p << std::endl;
        std::vector<OrderBookEntry> entries = orderBook.getOrders(OrderBookType::ask,
                                                                  p, currentTime);
        std::cout << "Asks seen: " << entries.size() << std::endl;
        std::cout << "Max ask: " << OrderBook::getHighPrice(entries) << std::endl;
        std::cout << "Min ask: " << OrderBook::getLowPrice(entries) << std::endl;
    }
    // std::cout << "OrderBook contains :  " << orders.size() << " entries" << std::endl;
    // unsigned int bids = 0;
    // unsigned int asks = 0;
    // for (OrderBookEntry& e : orders)
    // {
    //     if (e.orderType == OrderBookType::ask)
    //     {
    //         asks ++;
    //     }
    //     if (e.orderType == OrderBookType::bid)
    //     {
    //         bids ++;
    //     }
    // }
    // std::cout << "OrderBook asks:  " << asks << " bids:" << bids << std::endl;
}

void MerkelMain::enterAsk()
{
    std::cout << "Make an ask - enter the amount: product,price, amount, eg  ETH/BTC,200,0.5" << std::endl;
    std::string input;
    std::getline(std::cin, input);

    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 3)
    {
        std::cout << "MerkelMain::enterAsk Bad input! " << input << std::endl;
    }
    else
    {
        try
        {
            OrderBookEntry obe = CSVReader::stringsToOBE(
                tokens[1],
                tokens[2],
                currentTime,
                tokens[0],
                OrderBookType::ask);
            obe.username = "simuser";
            if (wallet.canFulfillOrder(obe))
            {
                std::cout << "Wallet looks good. " << std::endl;
                orderBook.insertOrder(obe);
            }
            else
            {
                std::cout << "Wallet has insufficient funds . " << std::endl;
            }
        }
        catch (const std::exception &e)
        {
            std::cout << " MerkelMain::enterAsk Bad input " << std::endl;
        }
    }
}

void MerkelMain::enterBid()
{
    std::cout << "Make an bid - enter the amount: product,price, amount, eg  ETH/BTC,200,0.5" << std::endl;
    std::string input;
    std::getline(std::cin, input);

    std::vector<std::string> tokens = CSVReader::tokenise(input, ',');
    if (tokens.size() != 3)
    {
        std::cout << "MerkelMain::enterBid Bad input! " << input << std::endl;
    }
    else
    {
        try
        {
            OrderBookEntry obe = CSVReader::stringsToOBE(
                tokens[1],
                tokens[2],
                currentTime,
                tokens[0],
                OrderBookType::bid);
            obe.username = "simuser";

            if (wallet.canFulfillOrder(obe))
            {
                std::cout << "Wallet looks good. " << std::endl;
                orderBook.insertOrder(obe);
            }
            else
            {
                std::cout << "Wallet has insufficient funds . " << std::endl;
            }
        }
        catch (const std::exception &e)
        {
            std::cout << " MerkelMain::enterBid Bad input " << std::endl;
        }
    }
}

void MerkelMain::printWallet()
{
    std::cout << wallet.toString() << std::endl;
}

void MerkelMain::gotoNextTimeframe()
{
    std::cout << "Going to next time frame. " << std::endl;
    for (std::string p : orderBook.getKnownProducts())
    {
        std::cout << "matching " << p << std::endl;
        std::vector<OrderBookEntry> sales = orderBook.matchAsksToBids(p, currentTime);
        std::cout << "Sales: " << sales.size() << std::endl;
        for (OrderBookEntry &sale : sales)
        {
            std::cout << "Sale price: " << sale.price << " amount " << sale.amount << std::endl;
            if (sale.username == "simuser")
            {
                // update the wallet
                wallet.processSale(sale);
            }
        }
    }

    currentTime = orderBook.getNextTime(currentTime);
}

int MerkelMain::getUserOption()
{
    int userOption = 0;
    std::string line;
    std::cout << "Type in 1-6" << std::endl;
    std::getline(std::cin, line);
    try
    {
        userOption = std::stoi(line);
    }
    catch (const std::exception &e)
    {
        //
    }
    std::cout << "You chose: " << userOption << std::endl;
    return userOption;
}

void MerkelMain::processUserOption(int userOption)
{
    if (userOption == 0) // bad input
    {
        std::cout << "Invalid choice. Choose 1-6" << std::endl;
    }
    if (userOption == 1)
    {
        printHelp();
    }
    if (userOption == 2)
    {
        printMarketStats();
    }
    if (userOption == 3)
    {
        enterAsk();
    }
    if (userOption == 4)
    {
        enterBid();
    }
    if (userOption == 5)
    {
        printWallet();
    }
    if (userOption == 6)
    {
        gotoNextTimeframe();
    }
    if (userOption == 7)
    {
        computeCandlestick();
    }
    if (userOption == 8)
    {
        visualisePlot();
    }

    if (userOption == 9)
    {
        visualiseGraph();
    }
}

// I wrote this code
// This function computes the candlestick for a given product and orderbook type at the current time frame and all previous time frames.
// It returns a vector of candlesticks.
std::vector<Candlestick> MerkelMain::computeCandlestick()
{
    // empty vector of candlesticks
    std::vector<Candlestick> candlesticks;

    // Prompt the user to enter the product and orderbook type
    std::cout << "Enter the product and orderbook type eg ETH/BTC,ask" << std::endl;
    std::string input;
    std::getline(std::cin, input);

    // Print the product and orderbook type being computed
    std::cout << "Computing candlestick for " << input << " at time " << currentTime << std::endl;

    // Compute the candlestick for the current time frame
    Candlestick candlestick{input, currentTime, orderBook};
    candlesticks.push_back(candlestick);

    // Get all previous time frames relative to the current time frame
    std::vector<std::string> previousTimes = orderBook.getPreviousTimes(currentTime);

    // Loop through the previous time frames to generate their history
    for (std::string &previousTime : previousTimes)
    {
        // Print the product and orderbook type being computed for each previous time frame
        std::cout << "Computing candlestick for " << input << " at time " << previousTime << std::endl;

        // Compute the candlestick for each previous time frame
        Candlestick candlestick(input, previousTime, orderBook);
        candlesticks.push_back(candlestick);
    }

    // Print the number of candlesticks computed
    std::cout << "Number of candlesticks computed: " << candlesticks.size() << std::endl;

    // Store the computed candlesticks in the class member variable
    computedCandlesticks = candlesticks;

    // Return the vector of computed candlesticks
    return candlesticks;
}

// This function visualizes the computed candlestick data as a plot.
void MerkelMain::visualisePlot()
{
    // Print a message indicating that the plot is being visualized.
    std::cout << "Visualising plot" << std::endl;

    // Create a TextPlot object using the computed candlestick data.
    TextPlot plot{computedCandlesticks};
}

// This function visualizes the order book data as a graph for a given product.
void MerkelMain::visualiseGraph()
{
    // Print a message prompting the user to enter the product to visualize.
    std::cout << "Visualising graph" << std::endl;
    std::cout << "Enter the product to visualise eg ETH/BTC" << std::endl;

    // Read the user input for the product to visualize.
    std::string input;
    std::getline(std::cin, input);

    // Create a TextGraph object using the order book data, current time frame, and the product to visualize.
    TextGraph graph{orderBook, currentTime, input};

    // Print the graph to the console.
    graph.printGraph();
}


// End of code I wrote