#include <string>
#include <vector>
#include <iostream>
#include <fstream>

std::vector<std::string> tokenise(
    std::string csvLine,
    char separator = ',')
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

int main()
{

    std::string csvLine = "BTC/USDT,1000,0.02,2020/03/17 17:01:24.884492,bid";
    std::vector<std::string> tokens = tokenise(csvLine);

    for (std::string &token : tokens)
    {
        std::cout << token << std::endl;
    }

    std::ifstream csvFile("20200317.csv");
    std::string line;

    if (!csvFile.is_open())
    {
        std::cout << "File not found" << std::endl;
        return 1;
    }
    else
    {
        std::cout << "File found" << std::endl;
        
        while (std::getline(csvFile, line))
        {
            // std::vector<std::string> tokens = tokenise(line);
            // for (std::string &token : tokens)
            // {
            //     std::cout << token << std::endl;
            // }
            std::cout << line << std::endl;
        }
        

        csvFile.close();
    }
    
    return 0;
}