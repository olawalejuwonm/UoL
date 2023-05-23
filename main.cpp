#include <iostream>

void printMenu()
{
    std::cout << "Hello, BSc CS!" << std::endl;

    std::cout << "1: Print Help" << std::endl;

    std::cout << "2: Print exchange stats" << std::endl;

    std::cout << "3: Make an offer" << std::endl;

    std::cout << "4: Make a bid" << std::endl;

    std::cout << "5: Print wallet" << std::endl;

    std::cout << "6: Continue" << std::endl;

    std::cout << "============ " << std::endl;
    std::cout << "Type in 1 - 6" << std::endl;
}

void printHelp()
{
    std::cout << "Help - your aim is to make money, analyse the market and make offers and bids" << std::endl;
}

void printMarketStats()
{
    std::cout << "Exchange stats - print the current exchange stats" << std::endl;
}

void enterOffer()
{
    std::cout << "Make an offer - make an offer to sell your coins" << std::endl;
}

void enterBid()
{
    std::cout << "Make a bid - make a bid to buy coins" << std::endl;
}

void printWallet()
{
    std::cout << "Print wallet - print your wallet" << std::endl;
}

void nextTimeFrame()
{
    std::cout << "Continue - continue to the next day" << std::endl;
}

int getUserOption()
{
    int userOption;
    std::cin >> userOption;
    std::cout << "You typed in: " << userOption << std::endl;

    return userOption;
}

void processUserOption(int userOption)
{
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
        enterOffer();
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
        nextTimeFrame();
    }
}

int main()
{
    while (true)
    {

        printMenu();

        int userOption = getUserOption();

        processUserOption(userOption);
    }
    return 0;
}