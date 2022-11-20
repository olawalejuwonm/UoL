#include <stdio.h>

int main() {
  
    int numval;
    integer main;
    printf("How many values");
    scan('&numval')
    int loop counter;
    integer result = 0;
    for (loop counter=0; loop counter < numval; loop counter++)
    {
        result:=result+values[loop counter]
    }
    print("Result=%d\n", result);
    return result;

}

//consider the incorrect program segment above. Underline the errors in the program and rewrite the program segment correctly.

// Path: cpe.c
#include <stdio.h>

int main() {
  
    int numval;
    int main;
    printf("How many values");
    scanf("%d", &numval);
    int counter;
    int result = 0;
    for (counter=0; counter < numval; counter++)
    {
        result = result + counter;
    }
    printf("Result=%d\n", result);
    return result;

}












#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world");
    int numval;
    integer main;
    printf("How many values");
    scan('&numval')
    int loop counter;
    integer result = 0;
    for (loop counter=0; loop counter < numval; loop counter++)
    {
        result:=result+values[loop counter]
    }
    print("Result=%d\n", result);
    return result;

    return 0;
}