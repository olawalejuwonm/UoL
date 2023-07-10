#include "Candlestick.h"

struct timestamp {
    std::string value;
    int start;
    int end;
};

class TextPlot
{
public:
    TextPlot(std::vector<Candlestick> candlesticks);
    void plot();

private:
    void calculatePlotValues(std::vector<Candlestick> candlesticks);
    void verticalPrint(double price, std::string text);
    void verticalPrintD(double startPrice);
    void horizontalPrint();
    double maxPrice;
    double minPrice;
    double averagePrice;
    std::vector<timestamp> timestamps;
    std::vector<Candlestick> theCandlesticks;
};