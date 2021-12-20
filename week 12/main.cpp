#include <iostream>
void looper()
{
printf("In main");
for(int i=0; i<5;++i)
{
printf("Value of i %i \n", i);
}
}
int main()
{
printf("In main, calling looper \n");
looper();
printf("Back in main again \n");
}
