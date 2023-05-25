#include "MerkelMain.h"
#include <iostream>
#include "OrderBookEntry.h"
#include <vector>


MerkelMain::MerkelMain()
{
    std::cout << "MerkelMain constructor called" << std::endl;
}

void MerkelMain::loadOrderBook()
{
    std::cout << "Loading order book. " << std::endl;
    orders.push_back(OrderBookEntry(5319.450000, 0.00200750, "2019-04-02T12:00:00.000Z", "BTC-GBP", OrderBookType::bid));
    orders.push_back(OrderBookEntry(5320.450000, 0.00200750, "2019-04-02T12:00:00.000Z", "BTC-GBP", OrderBookType::bid));
}

void MerkelMain::init()
{
    loadOrderBook();
    int input;
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

    std::cout << "============== " << std::endl;
}

void MerkelMain::printHelp()
{
    std::cout << "Help - your aim is to make money. Analyse the market and make bids and offers. " << std::endl;
}

void MerkelMain::printMarketStats()
{
    std::cout << "Order book contains : " << orders.size() << " entries. " << std::endl;
}

void MerkelMain::enterOffer()
{
    std::cout << "Mark and offer - enter the amount " << std::endl;
}

void MerkelMain::enterBid()
{
    std::cout << "Make a bid - enter the amount" << std::endl;
}

void MerkelMain::printWallet()
{
    std::cout << "Your wallet is empty. " << std::endl;
}

void MerkelMain::gotoNextTimeframe()
{
    std::cout << "Going to next time frame. " << std::endl;
}

int MerkelMain::getUserOption()
{
    int userOption;

    std::cout << "Type in 1-6" << std::endl;
    std::cin >> userOption;
    std::cout << "You chose: " << userOption << std::endl;
    return userOption;
}

void MerkelMain::processUserOption(int userOption)
{
    if (userOption == 0) // bad input
    {
        std::cout << "Invalid choice. Choose 1-6" << std::endl;
    }
    if (userOption == 1) // bad input
    {
        printHelp();
    }
    if (userOption == 2) // bad input
    {
        printMarketStats();
    }
    if (userOption == 3) // bad input
    {
        enterOffer();
    }
    if (userOption == 4) // bad input
    {
        enterBid();
    }
    if (userOption == 5) // bad input
    {
        printWallet();
    }
    if (userOption == 6) // bad input
    {
        gotoNextTimeframe();
    }
}
