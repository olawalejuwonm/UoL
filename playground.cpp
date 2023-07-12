#include <iostream>
#include <vector>

const int ROWS = 10;
const int COLUMNS = 10;

typedef std::vector<std::vector<char>> Grid;

void printGrid(const Grid& grid) {
    for (int i = 0; i < ROWS; ++i) {
        for (int j = 0; j < COLUMNS; ++j) {
            std::cout << grid[i][j];
        }
        std::cout << std::endl;
    }
}

void clearGrid() {
    std::cout << "\033[2J";
}

void updateGrid(Grid& grid, int row, int column, char ch) {
    grid[row][column] = ch;
}

int main() {
    Grid grid(ROWS, std::vector<char>(COLUMNS, ' '));

    // Clear the console
    clearGrid();

    // Print the initial grid
    printGrid(grid);

    // Update the grid and print
    updateGrid(grid, 2, 10, 'X');
    updateGrid(grid, 4, 10, 'Y');
    // updateGrid(grid, 0, 1, '*');
    // updateGrid(grid, 3, 4, '-');

    // Clear the console
    clearGrid();

    // Print the updated grid
    printGrid(grid);

    return 0;
}
