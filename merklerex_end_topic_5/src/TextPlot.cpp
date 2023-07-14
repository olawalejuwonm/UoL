#include "TextPlot.h"
#include "Candlestick.h"
#include <iostream>
#include <cmath>

TextPlot::TextPlot(std::vector<Candlestick> candlesticks)
{
    calculatePlotValues(candlesticks);
    theCandlesticks = candlesticks;
    ROWS = theCandlesticks.size() * 5;
    COLUMNS = theCandlesticks.size() * 20;
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

    minPrice = candlesticks[0].low;
    maxPrice = candlesticks[0].high;
    // timestamps.push_back({candlesticks[0].timestamp, 0, 2});
    timestamps.push_back({splitString(candlesticks[0].timestamp,
                                      " ")[1],
                          10, static_cast<int>(candlesticks[0].timestamp.length())});

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
        int start = (timestamps[i - 1].end + 1) / 14;
        timestamps.push_back({timestamp,
                              start,
                              (start) +
                                  static_cast<int>(timestamp.length())});
    }
    averagePrice = (maxPrice + minPrice) / 2;
}

void TextPlot::printGrid(const Grid &grid)
{
    for (int i = 0; i < ROWS + extension; ++i)
    {
        for (int j = 0; j < COLUMNS + extension; ++j)
        {
            std::cout << grid[i][j];
        }
        std::cout << std::endl;
    }
}

void TextPlot::updateGrid(Grid &grid, int row, int column, char ch)
{
    // I used this wrapper because of segfaults error when accessing the grid memory
    // that is out of bounds
    if (row < 0 || row >= (ROWS + extension) || column < 0 || column >= (COLUMNS + extension))
    {
        std::cout << "Invalid row or column index: " << row << ", " << column << std::endl;
        return;
    }
    grid[row][column] = ch;
}

void TextPlot::enterTextOnGridHorizontlly(Grid &grid, int row, int column, const std::string &text)
{
    // This function calls updateGrid() for each character in the text
    // at the specified row and column
    for (int i = 0; i < text.size(); ++i)
    {
        updateGrid(grid, row, column + i, text[i]);
    }
}

void TextPlot::enterTextOnGridVertically(Grid &grid, int row, int column, const std::string &text)
{
    // This function calls updateGrid() for each character in the text
    // at the specified row and column
    std::cout << "i: " << text << std::endl;

    for (int i = 0; i < text.size(); ++i)
    {
        updateGrid(grid, row + i, column, text[i]);
    }
}
double TextPlot::mapValue(double value, double fromLow, double fromHigh, double toLow, double toHigh)
{
    // This Perform linear mapping
    return (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow) + toLow;
}

// This function will map a value in the range [minValue, maxValue] to a value in the range [0, ROWS - 1]
int TextPlot::mapValueToRow(double value, double minValue, double maxValue)
{
    // Check if the value is in the range [minValue, maxValue]
    if (value < minValue || value > maxValue)
    {
        std::cout << "Value " << value << " is not in the range [" << minValue << ", " << maxValue << "]" << std::endl;
        return 0;
    }
    // int row = (value - minValue) / (maxValue - minValue) * (ROWS - 1);
    int row = mapValue(value, minValue, maxValue, 0, ROWS - 1);
    return row;
}

int TextPlot::mapValueToColumn(double value, double minValue, double maxValue)
{
    // Check if the value is in the range [minValue, maxValue]
    if (value < minValue || value > maxValue)
    {
        std::cout << "Value " << value << " is not in the range [" << minValue << ", " << maxValue << "]" << std::endl;
        return 0;
    }
    int column = (value - minValue) / (maxValue - minValue) * (COLUMNS - 1);
    return column;
}
void TextPlot::fillCandleStick(Grid &grid, int high, int low, int column)
{
    // I noticed that when the high is for instance 34, the candlestick is drawn from the bottom
    // of the grid to the top. This is because the row index increases as we go down the grid.
    // Which should not be the case. So I had to reverse the high and low values.

    int reveredHigh = (ROWS - 1) - high;
    int reveredLow = (ROWS - 1) - low;
    int nonNegativeDiff = std::abs(reveredHigh - reveredLow);
    for (int i = 0; i < nonNegativeDiff; ++i)
    {
        // enterTextOnGridVertically(grid, i, column, "|");
        updateGrid(grid, reveredHigh + i, column, '!');
    }
    // for (int i = reveredHigh; i < reveredLow; ++i)
    // {
    //     // enterTextOnGridVertically(grid, i, column, "|");
    //     updateGrid(grid, i, column, '|');
    // }
    // for (int i = high; i > low; --i)
    // {
    //     enterTextOnGridVertically(grid, i, column, "|");
    //     // updateGrid(grid, i, column, '|');
    // }
    // updateGrid(grid, 0, column, '|');
}

void TextPlot::fillStalk(Grid &grid, int high, int low, int column)
{
    int reveredHigh = (ROWS - 1) - high;
    int reveredLow = (ROWS - 1) - low;
    std::cout << "reveredHigh: " << reveredHigh << std::endl;
    std::cout << "reveredLow: " << reveredLow << std::endl;
    // for (int i = reveredHigh; i < reveredLow; ++i)
    // {
    //     // enterTextOnGridVertically(grid, i, column, "*");
    //     updateGrid(grid, i, column, '#');
    // }

    // This was noticed during testing that i need to ensure that subtracting the reveredHigh
    // from the reveredLow is greater than 0. If not, the loop will not run.

    int nonNegativeDifference = reveredLow - reveredHigh;
    if (nonNegativeDifference < 0)
    {
        nonNegativeDifference = nonNegativeDifference * -1;
    }
    // The stalk picks the lowest value between the high and low
    int start = std::min(reveredHigh, reveredLow);

    for (int i = 0; i < (nonNegativeDifference + 1); ++i)
    {
        // enterTextOnGridVertically(grid, i, column, "*");
        updateGrid(grid, start + i, column, '*');
    }
    // for (int i = high; i > low; --i)
    // {
    //     // enterTextOnGridVertically(grid, i, column, "*");
    //     updateGrid(grid, i, column, '#');
    // }
}

std::string TextPlot::convertCharacterToRepeatedString(char ch, int times)
{
    std::string result = "";
    for (int i = 0; i < times; ++i)
    {
        result += ch;
    }
    return result;
}

void TextPlot::fillTop(Grid &grid, int row, int steps, int column)
{
    // This fills the top of the candlestick horizontally
    int reverseRow = (ROWS - 1) - row;
    int nonNegativeRow = std::abs((ROWS - 1) - row);
    std::cout << "reverseRow: " << reverseRow << std::endl;
    // enterTextOnGridHorizontlly(grid, reverseRow, column, convertCharacterToRepeatedString('"', steps));
    enterTextOnGridHorizontlly(grid, nonNegativeRow, column, convertCharacterToRepeatedString('#', steps));
}

void TextPlot::plot()
{
    int internalROWS = ROWS + extension;
    int internalCOLUMNS = COLUMNS + extension;
    Grid grid(internalROWS, std::vector<char>(internalCOLUMNS, ' '));
    enterTextOnGridHorizontlly(grid, internalROWS - 1, internalCOLUMNS / 2, "TIMESTAMPS");
    enterTextOnGridVertically(grid, (internalROWS / 3) - 2, 0, "PRICE");
    for (int i = 0; i < internalROWS - 2; ++i)
    {
        updateGrid(grid, i, 1, '|'); // Valid row and column index: 0, 0
    }

    for (int i = 2; i < internalCOLUMNS; ++i)
    {
        updateGrid(grid, internalROWS - 3, i, '_'); // Valid row and column index: 0, 0
    }

    // updateGrid(grid, 1.5, 9, 'X'); // Valid column index: 9
    // updateGrid(grid, 1, 11, 'X');  // Valid column index: 5

    int base = 20;

    // enterTextOnGridHorizontlly(grid, ROWS - 2, 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 20 + 9, "14:56:35.210165");
    // enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 20 + 20 + 9, "14:56:35.210165");

    for (int i = 0; i < timestamps.size(); ++i)
    {
        int multiplier = i + 1;
        int minColumn = base * i + 2;
        int maxColumn = minColumn + base;
        enterTextOnGridHorizontlly(grid, internalROWS - 2, (base * i) + 9, timestamps[i].value);
    }

    for (int i = 0; i < theCandlesticks.size(); ++i)
    {
        int multiplier = i + 1;
        int minColumn = base * i + 2;
        int maxColumn = minColumn + base;
        enterTextOnGridHorizontlly(grid, internalROWS - 4, minColumn + 6, "S");
        enterTextOnGridHorizontlly(grid, internalROWS - 4, maxColumn, "E");

        // Print the updated grid

        double open = theCandlesticks[i].open;
        double close = theCandlesticks[i].close;
        double low = theCandlesticks[i].low;
        double high = theCandlesticks[i].high;
        // enterTextOnGridVertically(grid, open, 0, "!");
        std::cout << "high: " << high << std::endl;
        std::cout << "minPrice: " << minPrice << std::endl;
        std::cout << "maxPrice: " << maxPrice << std::endl;

        open = mapValueToRow(open, minPrice, maxPrice);
        close = mapValueToRow(close, minPrice, maxPrice);
        low = mapValueToRow(low, minPrice, maxPrice);
        high = mapValueToRow(high, minPrice, maxPrice);

        std::cout << "open: " << open << std::endl;
        std::cout << "high: " << high << std::endl;
        std::cout << "low: " << low << std::endl;
        std::cout << "close: " << close << std::endl;

        // fillStalk(grid, close, open, (base * multiplier) - 10);
        // fillCandleStick(grid, high, low, ((base * multiplier)) - 5);
        // fillStalk(grid, close, open, (base * multiplier));

        // fillTop(grid, close, (base * multiplier) - 5, (base * multiplier) - 10);
        // fillTop(grid, open, (base * multiplier) - 5, (base * multiplier) - 10);

        // fillStalk(grid, close, open, 5);
        // fillCandleStick(grid, high, low, 10);
        // fillStalk(grid, close, open, 15);

        // fillTop(grid, close, 10, 5);
        // fillTop(grid, open, 10, 5);

        fillCandleStick(grid, high, low, mapValue(10, 0, 15, minColumn, maxColumn));

        fillTop(grid, close, 15, mapValue(5, 0, 15, minColumn, maxColumn));
        fillTop(grid, open, 15, mapValue(5, 0, 15, minColumn, maxColumn));

        fillStalk(grid, close, open, mapValue(5, 0, 15, minColumn, maxColumn));

        fillStalk(grid, close, open, mapValue(15, 0, 15, minColumn, maxColumn));
    }

    enterTextOnGridHorizontlly(grid, 0, 0, std::to_string(maxPrice).substr(0, 8));
    enterTextOnGridHorizontlly(grid, (ROWS / 2), 0, std::to_string(averagePrice).substr(0, 8));
    enterTextOnGridHorizontlly(grid, ROWS - 1, 0, std::to_string(minPrice).substr(0, 8));

    // The code below prints price on the left side of the grid
    // for (int i = 0; i < ROWS; ++i)
    // {
    //     double price = mapValue(i, 0, ROWS, minPrice, maxPrice);
    //     // this round price to 4 decimal places
    //     // The round function is in the cmath library
    //     // price = std::round(price * 100) / 100; // The round function is in the cmath library
    //     // std::cout << "price: " << price << std::endl;
    //     //This turns price to exponential notation 2.3e+05
    //     // std::cout << "price: " << std::scientific << price << std::endl;

    //     // convert price to string
    //     std::string priceString = std::to_string(price);
    //     // This picks the first 5 character of price and return it as string
    //     priceString = priceString.substr(0, 5);
    //     enterTextOnGridHorizontlly(grid, i, 2, priceString);
    // }

    printGrid(grid);
}
