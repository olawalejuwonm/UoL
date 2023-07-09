#include <string>

class Candlestick
{
public:
    Candlestick(std::string input, std::string currentTime, OrderBook orderBook);
    void processInput(std::string input, std::string currentTime, OrderBook orderBook);
    Candlestick(const Candlestick &candlestick);
    Candlestick(const std::string &date, double open, double high, double low, double close, double volume);
    ~Candlestick();

    std::string getDate() const;
    double getOpen() const;
    double getHigh() const;
    double getLow() const;
    double getClose() const;
    double getVolume() const;

    void setDate(const std::string &date);
    void setOpen(double open);
    void setHigh(double high);
    void setLow(double low);
    void setClose(double close);
    void setVolume(double volume);

    Candlestick &operator=(const Candlestick &candlestick);

private:
    std::string date;
    double open;
    double high;
    double low;
    double close;
    double volume;
};