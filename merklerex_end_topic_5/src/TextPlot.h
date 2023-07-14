#include "Candlestick.h"

struct timestamp
{
    std::string value;
    int start;
    int end;
};

// I used this typdef as an alias to define a new name for a vector of vectors of chars
// The grid is a 2D vector (or array) of chars that will be used to store the
// candlestick plot. It's helpful instead of writing std::vector<std::vector<char>>
// every time i want to sepcify the data type of the grid
typedef std::vector<std::vector<char>>
    Grid;
class TextPlot
{
public:
    TextPlot(std::vector<Candlestick> candlesticks);
    void plot();

private:
    void calculatePlotValues(std::vector<Candlestick> candlesticks);
    double maxPrice;
    double minPrice;
    double averagePrice;
    std::vector<timestamp> timestamps;
    std::vector<Candlestick> theCandlesticks;
    void printGrid(const Grid &grid);
    void updateGrid(Grid &grid, int row, int column, char value);
    void enterTextOnGridHorizontlly(Grid &grid, int row, int column, const std::string &text);
    void enterTextOnGridVertically(Grid &grid, int row, int column, const std::string &text);
    void fillCandleStick(Grid &grid, int high, int low, int column);
    void fillStalk(Grid &grid, int high, int low, int column);
    int mapValueToRow(double value, double minValue, double maxValue);
    int mapValueToColumn(double value, double minValue, double maxValue);

    static double mapValue(double value, double fromLow, double fromHigh, double toLow, double toHigh);

    static std::string convertCharacterToRepeatedString(char ch, int times);

    void fillTop(Grid &grid, int row, int steps, int column);
    // int ROWS = 35;
    // int COLUMNS = 140;
     int ROWS;
    int COLUMNS;
    int extension = 5;
};