#include "CSVReader.h"
#include <iostream>
#include <fstream>
CSVReader::CSVReader()
{
}
std::vector<OrderBookEntry> CSVReader::readCSV(std::string csvFilename)
{
    std::vector<OrderBookEntry> entries;
    std::ifstream csvFile(csvFilename);
    std::string line;
    if (csvFile.is_open())
    {
        while (std::getline(csvFile, line))
        {
            try
            {
                std::vector<std::string> tokens = tokenise(line, ',');
                OrderBookEntry obe = stringsToOBE(tokens);
                entries.push_back(obe);
            }
            catch (const std::exception &e)
            {
                std::cout << "CSVReader::readCSV bad data" << std::endl;
            }
        }
        csvFile.close();
    }
    else
    {
        std::cout << "Unable to open file";
    }
    std::cout << "There are " << entries.size() << " entries in the CSV file" << std::endl;
    return entries;
}
std::vector<std::string> CSVReader::tokenise(std::string csvLine, char separator)
{
    std::vector<std::string> tokens;
    std::string token;

    signed int start, end;

    start = csvLine.find_first_not_of(separator, 0);

    do
    {
        end = csvLine.find_first_of(separator, start);
        if (start == csvLine.length() || start == end)
        {
            break;
        }
        if (end >= 0)
        {
            tokens.push_back(csvLine.substr(start, end - start));
        }
        else
        {
            tokens.push_back(csvLine.substr(start, csvLine.length() - start));
        }
        start = end + 1;
    } while (end > 0);

    // for (char &c : csvLine)
    // {
    //     if (c != separator)
    //     {
    //         token += c;
    //     }
    //     else
    //     {
    //         tokens.push_back(token);
    //         token.clear();
    //     }
    // }
    // tokens.push_back(token);
    return tokens;
}
OrderBookEntry CSVReader::stringsToOBE(std::vector<std::string> tokens)
{
    double price, amount;
    if (tokens.size() != 5) // bad
    {
        std::cout << "Bad line " << std::endl;
        throw std::exception{};
    }
    // we have 5 tokens
    try
    {
        price = std::stod(tokens[3]);
        amount = std::stod(tokens[4]);
    }
    catch (const std::exception &e)
    {
        std::cout << "Bad float! " << tokens[3] << std::endl;
        std::cout << "Bad float! " << tokens[4] << std::endl;
        throw;
    }
    OrderBookEntry obe{price,
                       amount,
                       tokens[0],
                       tokens[1],
                       OrderBookEntry::stringToOrderBookType(tokens[2])};
    return obe;
}