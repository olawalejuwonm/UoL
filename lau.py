my_string="Hello"
def exclamation(my_string):
    my_string+="!!" + my_string + "!!"
    return my_string
exclamation(my_string)
print(my_string)

#write a function that generates a random password. The password should have a 
#random length of between 7 and 10 characters. Each character should be randomly
#selected from positions 33 to 126 in the ASCII table. Your function will not
#take any parameters. It will return the randomly generated password as its only
#result. Display the randomly generated password in your file's main program.
#Your main program should only run when your file has not been imported into
#another file

import random
def random_password():
    password=""
    for i in range(random.randint(7,10)):
        password+=chr(random.randint(33,126))
    if __name__=="__main__":
        print(password)
    return password
random_password()