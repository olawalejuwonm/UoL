#include <iostream>


class Thing
{
    public:
        Thing(float x, float y)
        {
            this->x = x;
            this->y = y;
        }
        float getX()
        {
            return this->x;
        }
    private:
        float x;
        float y;

};

int addOne(int input) 
{
    return input + 1;
}
int main() {
    int x = 10;
    float myFloat = 10.0f;
    // printf("x = %i \n", x);

    // printf("f = %f \n", myFloat);

    int myInts[5] = {2, 4, 6, 8, 10};
    // myInts[0] = 25;

    // printf("f = %i \n", myInts[0]);
    myInts[0] = addOne(myInts[0]);

    for (int i = 0; i<5; ++i)
    {
        printf("f = %i \n", myInts[i]);
    }

    Thing aThing {10.2f, 10.5f};
    printf("Thing's x: %f \n", aThing.getX());

    std::cout << "Thing's x is " << aThing.getX() << std::endl;


}