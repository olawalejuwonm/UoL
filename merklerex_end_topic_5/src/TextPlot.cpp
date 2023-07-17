// I wrote this code
#include "TextPlot.h"
#include "Candlestick.h"
#include <iostream>
#include <cmath>

TextPlot::TextPlot(std::vector<Candlestick> candlesticks)
{
    // This check is to make sure that the candlesticks are not empty
    if (candlesticks.size() == 0)
    {
        std::cout << "Error: Candlesticks are empty"
                  << "\n";
        std::cout << "Please compute candlesticks first"
                  << "\n"
                  << std::endl;
        return;
    }
    theCandlesticks = candlesticks;
    printByRange();
}

// End of code I wrote
// I modified this code according to // https://stackoverflow.com/questions/14265581/parse-split-a-string-in-c-using-string-delimiter-standard-c
std::vector<std::string> splitString(std::string str, std::string delimiter)
{
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

// End of code modified

// I wrote this code
/**
 * This function calculates the minimum, maximum and average prices of the given candlesticks.
 * It also calculates the timestamps of each candlestick and stores them in the timestamps vector.
 * @param candlesticks A vector of Candlestick objects.
 */
void TextPlot::calculatePlotValues(std::vector<Candlestick> candlesticks)
{

    // Initialize the minimum and maximum prices to the first candlestick's low and high prices respectively.
    minPrice = candlesticks[0].low;
    maxPrice = candlesticks[0].high;

    // Add the first timestamp to the timestamps vector.
    timestamps.push_back({splitString(candlesticks[0].timestamp,
                                      " ")[1],
                          10, static_cast<int>(candlesticks[0].timestamp.length())});

    // Loop through the remaining candlesticks and update the minimum and maximum prices accordingly.
    // Also, add the timestamp of each candlestick to the timestamps vector.
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

    // Calculate the average price.
    averagePrice = (maxPrice + minPrice) / 2;
}


void TextPlot::setRowsAndColumns(int size)
{
    ROWS = size * 5;
    COLUMNS = size * 20;
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
    // enterTextOnGridHorizontlly(grid, reverseRow, column, convertCharacterToRepeatedString('"', steps));
    enterTextOnGridHorizontlly(grid, nonNegativeRow, column, convertCharacterToRepeatedString('#', steps));
}

void TextPlot::plot(std::vector<Candlestick> tempCandlestick)
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

    int base = 20;

      for (int i = 0; i < tempCandlestick.size(); ++i)
    {
        int multiplier = i + 1;
        int minColumn = base * i + 2;
        int maxColumn = minColumn + base;
        enterTextOnGridHorizontlly(grid, internalROWS - 4, minColumn + 6, "S");
        enterTextOnGridHorizontlly(grid, internalROWS - 4, maxColumn, "E");
        enterTextOnGridHorizontlly(grid, internalROWS - 2, (base * i) + 9, timestamps[i].value);

        double open = tempCandlestick[i].open;
        double close = tempCandlestick[i].close;
        double low = tempCandlestick[i].low;
        double high = tempCandlestick[i].high;
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


        fillCandleStick(grid, high, low, mapValue(10, 0, 15, minColumn, maxColumn));

        fillTop(grid, close, 15, mapValue(5, 0, 15, minColumn, maxColumn));
        fillTop(grid, open, 15, mapValue(5, 0, 15, minColumn, maxColumn));

        fillStalk(grid, close, open, mapValue(5, 0, 15, minColumn, maxColumn));

        fillStalk(grid, close, open, mapValue(15, 0, 15, minColumn, maxColumn));
    }

    enterTextOnGridHorizontlly(grid, 0, 0, std::to_string(maxPrice).substr(0, 8));
    enterTextOnGridHorizontlly(grid, (ROWS / 2), 0, std::to_string(averagePrice).substr(0, 8));
    enterTextOnGridHorizontlly(grid, ROWS - 1, 0, std::to_string(minPrice).substr(0, 8));



    printGrid(grid);
}

void TextPlot::printByRange()
{
    std::cout << "There are " << theCandlesticks.size() << " candlesticks" << std::endl;
    int maxRange = 7;
    std::cout << "For easy visualisation, the maximum range is " << maxRange << std::endl;
    // Get the range of the candlesticks to be plotted via user input
    int start = 0;
    int end = 0;
    std::cout << "Enter the start of the range, starting from 1: ";
    std::cin >> start;
    std::cout << "Enter the end of the range, ending at " << theCandlesticks.size() << ": ";
    std::cin >> end;
    // This ensure that the range is within the size of the candlesticks
    if (end > theCandlesticks.size())
    {
        std::cout << "The end of the range is greater than the size of the candlesticks" << std::endl;
        return;
    }
    // This ensure that the start of the range is not less than 0
    if (start < 1)
    {
        std::cout << "The start of the range is less than 0" << std::endl;
        return;
    }
    // This ensure that the start of the range is not greater than the end of the range
    if (start > end)
    {
        std::cout << "The start of the range is greater than the end of the range" << std::endl;
        return;
    }
    // This ensure that the end of the range is not less than the start of the range
    if (end < start)
    {
        std::cout << "The end of the range is less than the start of the range" << std::endl;
        return;
    }

    start -= 1;
    // Rejects the range if it is greater than the maxRange
    if (end - start > maxRange)
    {
        std::cout << "The range is greater than the maximum range" << std::endl;
        return;
    }
    // Set the ROWS and COLUMNS of the grid
    // Generate a new candlestick grid from the range
    std::vector<Candlestick> candlesticksRange;
    for (int i = start; i < end; ++i)
    {
        candlesticksRange.push_back(theCandlesticks[i]);
    }
    std::cout << "There are " << candlesticksRange.size() << " candlesticks in the range" << std::endl;
    calculatePlotValues(candlesticksRange);
    setRowsAndColumns(maxRange);
    plot(candlesticksRange);
}

// End of code I wrote