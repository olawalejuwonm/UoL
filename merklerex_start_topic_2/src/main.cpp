#include <iostream>
#include <string>
#include <vector>

enum class OrderBookType
{
    bid,
    ask
};

class OrderBookEntry
{
public:
    OrderBookEntry(double _price,
                   double _amount,
                   std::string _timestamp,
                   std::string _product,
                   OrderBookType _orderType)
        : price(_price), amount(_amount), timestamp(_timestamp), product(_product), orderType(_orderType){

                                                                                    };

    double price;
    double amount;
    std::string timestamp;
    std::string product;
    OrderBookType orderType;
};

void printMenu()
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

void printHelp()
{
    std::cout << "Help - your aim is to make money. Analyse the market and make bids and offers. " << std::endl;
}

void printMarketStats()
{
    std::cout << "Market looks good. " << std::endl;
}

void enterOffer()
{
    std::cout << "Mark and offer - enter the amount " << std::endl;
}

void enterBid()
{
    std::cout << "Make a bid - enter the amount" << std::endl;
}

void printWallet()
{
    std::cout << "Your wallet is empty. " << std::endl;
}

void gotoNextTimeframe()
{
    std::cout << "Going to next time frame. " << std::endl;
}

int getUserOption()
{
    int userOption;

    std::cout << "Type in 1-6" << std::endl;
    std::cin >> userOption;
    std::cout << "You chose: " << userOption << std::endl;
    return userOption;
}

void processUserOption(int userOption)
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

int main()
{
    // while (true)
    // {
    //     printMenu();
    //     int userOption = getUserOption();
    //     processUserOption(userOption);
    // }

    // double price = 5319.450000;
    // double amount = 0.00200750;
    // std::string timestamp{"2019-04-02T12:00:00.000Z"};
    // std::string product{"BTC-GBP"};
    // // std::string orderType{"buy"};
    // OrderBookType orderType = OrderBookType::bid;

    // // Using Vector
    // std::vector<double> prices;
    // std::vector<double> amounts;
    // std::vector<std::string> timestamps;
    // std::vector<std::string> products;
    // std::vector<OrderBookType> orderTypes;

    // prices.push_back(5319.450000);
    // amounts.push_back(0.00200750);
    // timestamps.push_back("2019-04-02T12:00:00.000Z");
    // products.push_back("BTC-GBP");
    // orderTypes.push_back(OrderBookType::bid);

    // prices.push_back(5319.450000);
    // amounts.push_back(0.00200750);
    // timestamps.push_back("2019-04-02T12:00:00.000Z");
    // products.push_back("BTC-GBP");
    // orderTypes.push_back(OrderBookType::bid);

    // std::cout << "Prices: " << prices[0] << std::endl;
    // unsigned short i = 655399;
    // std::cout << "size of short i: " << sizeof(unsigned short) << std::endl;
    // std::cout << "i: " << i << std::endl;

    // OrderBookEntry order1(5319.450000, 0.00200750, "2019-04-02T12:00:00.000Z", "BTC-GBP", OrderBookType::bid);

    // order1.price = 5319.450000;
    // order1.amount = 0.00200750;
    // order1.timestamp = "2019-04-02T12:00:00.000Z";
    // order1.product = "BTC-GBP";
    // order1.orderType = OrderBookType::bid;

    // std::cout << "Price: " << order1.price << std::endl;

    std::vector<OrderBookEntry> orders;
    orders.push_back(OrderBookEntry(5319.450000, 0.00200750, "2019-04-02T12:00:00.000Z", "BTC-GBP", OrderBookType::bid));
    orders.push_back(OrderBookEntry(5320.450000, 0.00200750, "2019-04-02T12:00:00.000Z", "BTC-GBP", OrderBookType::bid));

    // std::cout << "Price: " << orders[0].price << std::endl;

    for (OrderBookEntry &order : orders) // The & is a reference to the object in the vector (not a copy)
    {
        std::cout << "Price: " << order.price << std::endl;
    }

    for (unsigned int i = 0; i < orders.size(); i++)
    {
        std::cout << "Price: " << orders[i].price << std::endl;
    }

    for (unsigned int i = 0; i < orders.size(); i++)
    {
        std::cout << "Price: " << orders.at(i).price << std::endl;
    }

    return 0;
}
