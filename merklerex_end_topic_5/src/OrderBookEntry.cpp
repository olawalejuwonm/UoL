#include "OrderBookEntry.h"
#include <iostream>

OrderBookEntry::OrderBookEntry( double _price, 
                        double _amount, 
                        std::string _timestamp, 
                        std::string _product, 
                        OrderBookType _orderType, 
                        std::string _username)
: price(_price), 
  amount(_amount), 
  timestamp(_timestamp),
  product(_product), 
  orderType(_orderType), 
  username(_username)
{
  
    
}

OrderBookType OrderBookEntry::stringToOrderBookType(std::string s)
{
  if (s == "ask")
  {
    return OrderBookType::ask;
  }
 
  if (s == "bid")
  {
    return OrderBookType::bid;
  }
  // To avoid error with unaccepted order types, this will throw an exception
  // if the order type is not recognized.
  throw std::runtime_error{"OrderBookEntry::stringToOrderBookType unknown OrderBookType " + s};
  // return OrderBookType::unknown;
}
