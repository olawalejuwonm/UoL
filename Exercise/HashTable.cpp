#include "HashTable.hpp"

HashTable::HashTable(long _a, long _c, long _m) {
    a = _a;
    c = _c;
    m = _m;
}

HashTable::~HashTable() {
    for (int i = 0; i < m; i++) {
        if (table[i] != NULL) {
            delete table[i];
        }
    }
}

void HashTable::insert(int key) {
    int index = hash(key);
    if (table[index] == NULL) {
        table[index] = new LinkedList();
    }
    table[index]->insert(key);
}

void HashTable::extend() {
    HashTable* newTable = new HashTable(a, c, m * 2);
    for (int i = 0; i < m; i++) {
        if (table[i] != NULL) {
            LinkedList* list = table[i];
            for (int j = 0; j < list->size(); j++) {
                newTable->insert(list->get(j));
            }
        }
    }
    delete this;
    this = newTable;
}

bool HashTable::find(int key) {
    int index = hash(key);
    if (table[index] == NULL) {
        return false;
    }
    return table[index]->find(key);
  return false;
}

void HashTable::remove(int key){
    int index = hash(key);
    if (table[index] == NULL) {
        return;
    }
    table[index]->remove(key);
}

double HashTable::loadFactor() {
    int count = 0;
    for (int i = 0; i < m; i++) {
        if (table[i] != NULL) {
            count += table[i]->size();
        }
    }
    return (double)count / m;
  return 0.0;
}




