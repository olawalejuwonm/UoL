// I wrote this code
#pragma once // Ensures that this header file is only included once during compilation

#include "Candlestick.h"

// Define a struct to store timestamp information
struct timestamp
{
    std::string value; // The timestamp value
    int start;         // The starting index of the timestamp in the grid
    int end;           // The ending index of the timestamp in the grid
};

// Define an alias for a 2D vector of chars
// I used this typdef as an alias to define a new name for a vector of vectors of chars
// The grid is a 2D vector (or array) of chars that will be used to store the
// candlestick plot. It's helpful instead of writing std::vector<std::vector<char>>
// every time i want to sepcify the data type of the grid
typedef std::vector<std::vector<char>> Grid;

// Define a class for creating a text-based candlestick plot
class TextPlot
{
public:
    // Constructor that takes a vector of Candlestick objects
    TextPlot(std::vector<Candlestick> candlesticks);

private:
    // Private member functions
    void calculatePlotValues(std::vector<Candlestick> candlesticks);
    int mapValueToRow(double value, double minValue, double maxValue);
    int mapValueToColumn(double value, double minValue, double maxValue);
    void setRowsAndColumns(int size);
    void printGrid(const Grid &grid);
    void updateGrid(Grid &grid, int row, int column, char value);
    void enterTextOnGridHorizontlly(Grid &grid, int row, int column, const std::string &text);
    void enterTextOnGridVertically(Grid &grid, int row, int column, const std::string &text);
    void fillCandleStick(Grid &grid, int high, int low, int column);
    void fillStalk(Grid &grid, int high, int low, int column);
    void plot(std::vector<Candlestick> tempCandlestick);
    void printByRange();
    void fillTop(Grid &grid, int row, int steps, int column);
    static double mapValue(double value, double fromLow, double fromHigh, double toLow, double toHigh);
    static std::string convertCharacterToRepeatedString(char ch, int times);

    // Private member variables
    double maxPrice;                          // The maximum price of all the candlesticks
    double minPrice;                          // The minimum price of all the candlesticks
    double averagePrice;                      // The average price of all the candlesticks
    std::vector<timestamp> timestamps;        // A vector of timestamps
    std::vector<Candlestick> theCandlesticks; // A vector of Candlestick objects
    int ROWS;                                 // The number of rows in the grid
    int COLUMNS;                              // The number of columns in the grid
    int extension = 5;                        // The number of extra columns to add to the grid
};

// End of code I wrote