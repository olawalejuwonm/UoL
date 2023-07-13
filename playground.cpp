#include <iostream>
#include <vector>

const int ROWS = 25;
const int COLUMNS = 145;
// double maxPrice = 0.022270419999999999;
// double minPrice = 0.021890929999999999;
// double open = 0.022000816785073856;
// double close = 0.022000816785073856;
// double low = 0.021890929999999999;
// double high = 0.022270419999999999;

// double maxPrice = 130;
// double minPrice = 70;
// double open = 100;
// double high = 120;
// double low = 80;
// double close = 110;
struct GridRep
{
    double maxPrice;
    double minPrice;
    double open;
    double high;
    double low;
    double close;
};

std::vector<GridRep> candles = {
    {130, 70, 100, 120, 80, 110},
    {130, 70, 110, 130, 100, 120},
    {130, 70, 90, 100, 70, 80},
    {130, 70, 95, 110, 70, 100},
    {130, 70, 80, 120, 75, 115},
    //    {130, 70, 95, 110, 70, 100},
    // {130, 70, 80, 120, 75, 115},
    // {130, 70, 110, 130, 100, 120},
    // {130, 70, 90, 100, 70, 80},

};

typedef std::vector<std::vector<char>>
    Grid;

void printGrid(const Grid &grid)
{
    for (int i = 0; i < ROWS; ++i)
    {
        for (int j = 0; j < COLUMNS; ++j)
        {
            std::cout << grid[i][j];
        }
        std::cout << std::endl;
    }
}

void clearGrid()
{
    std::cout << "\033[2J";
}

void updateGrid(Grid &grid, double row, double column, char ch)
{
    // I used this wrapper because of segfaults error when accessing the grid memory
    // that is out of bounds
    if (row < 0 || row >= ROWS || column < 0 || column >= COLUMNS)
    {
        std::cout << "Invalid row or column index: " << row << ", " << column << std::endl;
        return;
    }
    grid[row][column] = ch;
}

void enterTextOnGridHorizontlly(Grid &grid, int row, int column, const std::string &text)
{
    // This function calls updateGrid() for each character in the text
    // at the specified row and column
    for (int i = 0; i < text.size(); ++i)
    {
        updateGrid(grid, row, column + i, text[i]);
    }
}

void enterTextOnGridVertically(Grid &grid, int row, int column, const std::string &text)
{
    // This function calls updateGrid() for each character in the text
    // at the specified row and column
    for (int i = 0; i < text.size(); ++i)
    {
        updateGrid(grid, row + i, column, text[i]);
    }
}
double mapValue(double value, double fromLow, double fromHigh, double toLow, double toHigh)
{
    // Perform linear mapping
    return (value - fromLow) / (fromHigh - fromLow) * (toHigh - toLow) + toLow;
}

// This function will map a value in the range [minValue, maxValue] to a value in the range [0, ROWS - 1]
int mapValueToRow(double value, double minValue, double maxValue)
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

int mapValueToColumn(double value, double minValue, double maxValue)
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
void fillCandleStick(Grid &grid, int high, int low, int column)
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
        updateGrid(grid, reveredHigh + i, column, '|');
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

void fillStalk(Grid &grid, int high, int low, int column)
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

    for (int i = 0; i < (nonNegativeDifference); ++i)
    {
        // enterTextOnGridVertically(grid, i, column, "*");
        updateGrid(grid, reveredHigh + i, column, '#');
    }
    // for (int i = high; i > low; --i)
    // {
    //     // enterTextOnGridVertically(grid, i, column, "*");
    //     updateGrid(grid, i, column, '#');
    // }
}

std::string convertCharacterToRepeatedString(char ch, int times)
{
    std::string result = "";
    for (int i = 0; i < times; ++i)
    {
        result += ch;
    }
    return result;
}

void fillTop(Grid &grid, int row, int steps, int column)
{
    // This fills the top of the candlestick horizontally
    int reverseRow = (ROWS - 1) - row;
    int nonNegativeRow = std::abs((ROWS - 1) - row);
    std::cout << "reverseRow: " << reverseRow << std::endl;
    // enterTextOnGridHorizontlly(grid, reverseRow, column, convertCharacterToRepeatedString('"', steps));
    enterTextOnGridHorizontlly(grid, nonNegativeRow, column, convertCharacterToRepeatedString('"', steps));
}

int main()
{
    Grid grid(ROWS, std::vector<char>(COLUMNS, ' '));
    enterTextOnGridHorizontlly(grid, ROWS - 1, COLUMNS / 2, "TIMESTAMPS");
    enterTextOnGridVertically(grid, ROWS / 3, 0, "PRICE");
    for (int i = 0; i < ROWS - 2; ++i)
    {
        updateGrid(grid, i, 1, '|'); // Valid row and column index: 0, 0
    }
    for (int i = 2; i < COLUMNS; ++i)
    {
        updateGrid(grid, ROWS - 3, i, '_'); // Valid row and column index: 0, 0
    }

    // updateGrid(grid, 1.5, 9, 'X'); // Valid column index: 9
    // updateGrid(grid, 1, 11, 'X');  // Valid column index: 5

    enterTextOnGridHorizontlly(grid, ROWS - 2, 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 20 + 9, "14:56:35.210165");
    enterTextOnGridHorizontlly(grid, ROWS - 2, 20 + 20 + 20 + 20 + 20 + 20 + 9, "14:56:35.210165");

    int base = 20;
    for (int i = 2; i < 3; ++i)
    {
        int multiplier = i + 1;
        int minColumn = base * i + 2;
        int maxColumn = minColumn + base;
        enterTextOnGridHorizontlly(grid, ROWS - 4, minColumn, "S");
        enterTextOnGridHorizontlly(grid, ROWS - 4, maxColumn - 1, "E");

        // Print the updated grid

        double minPrice = candles[i].minPrice;
        double maxPrice = candles[i].maxPrice;
        double open = candles[i].open;
        double close = candles[i].close;
        double low = candles[i].low;
        double high = candles[i].high;
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

        fillStalk(grid, close, open, mapValue(5, 0, 15, minColumn, maxColumn));
        fillCandleStick(grid, high, low, mapValue(10, 0, 15, minColumn, maxColumn));
        fillStalk(grid, close, open, mapValue(15, 0, 15, minColumn, maxColumn));

        fillTop(grid, close, 15, mapValue(5, 0, 15, minColumn, maxColumn));
        fillTop(grid, open, 15, mapValue(5, 0, 15, minColumn, maxColumn));

        //  fillTop(grid, close,
        //         mapValueToRow(10, minPrice, maxPrice), mapValueToColumn(5, minColumn, maxColumn));
        // fillTop(grid, open,
        //         mapValueToRow(10, minPrice, maxPrice),
        //         mapValueToColumn(5, minColumn, maxColumn));
    }

    printGrid(grid);

    return 0;
}
