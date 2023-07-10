#include "TextPlot.h"
#include "Candlestick.h"
#include <iostream>

// This prints on a column
void columnPrint(int column)
{
    for (int i = 0; i < column; ++i)
    {
        std::cout << " ";
    }
}

TextPlot::TextPlot(std::vector<Candlestick> candlesticks)
{
    calculatePlotValues(candlesticks);
    theCandlesticks = candlesticks;
}

std::vector<std::string> splitString(std::string str, std::string delimiter)
{
    // https://stackoverflow.com/questions/14265581/parse-split-a-string-in-c-using-string-delimiter-standard-c
    std::vector<std::string> splittedString;
    size_t pos = 0;
    std::string token;
    while ((pos = str.find(delimiter)) != std::string::npos)
    {
        splittedString.push_back(str.substr(0, pos));
        str.erase(0, pos + delimiter.length());
    }
    splittedString.push_back(str);
    return splittedString;
}

void TextPlot::calculatePlotValues(std::vector<Candlestick> candlesticks)
{

    // The function split strings
    // https://stackoverflow.com/questions/14265581/parse-split-a-string-in-c-using-string-delimiter-standard-c

    minPrice = candlesticks[0].low;
    maxPrice = candlesticks[0].high;
    // timestamps.push_back({candlesticks[0].timestamp, 0, 2});
    timestamps.push_back({splitString(candlesticks[0].timestamp, " ")[1], 10,
                          static_cast<int>(candlesticks[0].timestamp.length())});

    for (int i = 1; i < candlesticks.size(); i++) // start at 1 because we already have the first value
    {
        if (candlesticks[i].high > maxPrice)
        {
            maxPrice = candlesticks[i].high;
        }
        if (candlesticks[i].low < minPrice)
        {
            minPrice = candlesticks[i].low;
        }
        std::string timestamp = splitString(candlesticks[i].timestamp, " ")[1];
        timestamps.push_back({timestamp,
                              (timestamps[i - 1].end + 1) / 14,
                              timestamps[i - 1].end + 1 +
                                  static_cast<int>(timestamp.length())});
    }
    averagePrice = (maxPrice + minPrice) / 2;
}

void TextPlot::verticalPrint(double price, std::string text)
{
    int numSpaces = (averagePrice - price) / 0.01;
    for (int i = 0; i < numSpaces; i++)
    {
        std::cout << " ";
    }
    std::cout << price;
    std::cout << std::endl;
}

// This function will print | from a start price to an end price
void TextPlot::verticalPrintD(double startPrice)
{
    int numSpaces = (averagePrice - startPrice) / 0.01;
    for (int i = 0; i < numSpaces; i++)
    {
        std::cout << " ";
    }
    std::cout << "|";
    std::cout << std::endl;
}

void TextPlot::horizontalPrint()
{
    for (int i = 0; i < timestamps.size(); i++)
    {
        std::cout << timestamps[i].value;
    }
    std::cout << std::endl;
}

void TextPlot::plot()
{
    int offset = 10;
    std::cout << "Max price: " << maxPrice << std::endl;
    std::cout << "Min price: " << minPrice << std::endl;
    std::cout << "Average price: " << averagePrice << std::endl;
    std::cout << "Timestamps: " << std::endl;
    for (int i = 0; i < timestamps.size(); i++)
    {
        columnPrint(timestamps[i].start);
        std::cout << timestamps[i].value;
    }
    std::cout << std::endl;
    // std::cout << "Horizontal: " << std::endl;

    // std::cout << "Vertical: " << std::endl;
    // for (int i = 0; i < 4; i++)
    // {
    //     std::cout << "|";
    //     verticalPrint(maxPrice, "" + i);
    // }
    // std::cout << "|";
    // verticalPrint(maxPrice, "");
    // std::cout << "|";
    // verticalPrint(averagePrice, "");
    // std::cout << "|";
    // verticalPrint(minPrice, "");

    // for (int i = 0; i < timestamps.size(); i++)
    // {

    //     verticalPrintD(theCandlesticks[i].low);
    //     std::cout << "  ";
    //     std::cout << timestamps[i].value;
    //     std::cout << "  ";
    // }
    // std::cout << std::endl;

    // std::cout << std::endl;
}
