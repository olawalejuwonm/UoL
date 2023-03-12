# print(type("3"))

# lis = [0.001897551842619749, 0.36665401210408377, 0.500231585811176, 0.2335408085353584, 0.13013973930730338, 0.9541308488663596, 0.5094259633880269, 0.47659169935611745, 0.4892149525599945, 0.5274724260328211]
# #calculate the mean
# mean = sum(lis)/len(lis)
# print(mean)

# # Question 3
# # What is the mean of the values in data?

# x = [2,4,6,8,10]

# data = [v*2 for v in x]

# mean = sum(data)/len(data)
# # print(mean)

# testSet = set([11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10])
# testSet2 = set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
# testSet.pop()
# print(testSet)
# print(2 in testSet2)
# compare the two sets
# print(testSet == testSet2)

testTuple = (2, 1, 2, "3", 2, 3, 4, 5, 6, 7, 8, 9, 10)
print(testTuple)

def checkIsValidEmail(email):
    import re
    if re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return True
    else:
        return False

# Describe three examples where using sklearn to create some values in place, replacing with the most frequent values
# 1. when you want to replace missing values in a column with the most frequent value in that column such as the example below
# import pandas as pd
# from sklearn.impute import SimpleImputer
# df = pd.DataFrame({"A": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "B": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "C": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]})
# imputer = SimpleImputer(missing_values=np.nan, strategy='most_frequent')
# imputer = imputer.fit(df)
# df = imputer.transform(df)
# print(df)

# print(checkIsValidEmail("olawalejuwon@gmail.com"))
# pip install arrow
# What does a

# nltk predefined rules for sentiment analysis are
# 1. positive or negative words using a lexicon
# when use for sentence I love sandwiches. I hate cheese. it will give the result: {'neg': 0.374, 'neu': 0.202, 'pos': 0.424, 'compound': 0.128}
# 2. subjectivity or objectivity of the text using subjectivity 
#   
# 4. binary classification of the text using a NaiveBayesClassifier
# when use for sentence I love sandwiches. I hate cheese. it will give the result: {'neg': 0.0, 'neu': 0.0, 'pos': 1.0, 'compound': 1.0}


#  Describe and provide three examples where utilising
# Numpy might create undesirable outcomes
# 1. when you want to use a list of strings as a numpy array 
# an example is below
# import numpy as np
# testList = ["1", "2", "3"]
# testArray = np.array(testList)
# print(testArray)

# # 2. When numpy is used to create a 2D array of strings
# # an example is below
# import numpy as np
# testList = [["1", "2", "3"], ["4", "5", "6"]]
# testArray = np.array(testList)
# print(testArray)
# # this will give the output
# # [['1' '2' '3']

# Describe three examples where dropping data might pose a problem
# 1. when you are trying to predict the price of a house and you drop the price column

#Challenges with 2D plotting are
#1 It is difficult to see the relationship between the data at some points.
# An example is a dataset with 2 columns and 1000 rows. It is difficult to see the relationship between the data at some points.

#challenges of working with date and time data type include
#1. it is difficult to extract the year, month, day, hour, minute, second, etc from a date and time column
#2. it is difficult to convert a date and time column to a different time zone
#3. it is difficult to convert a date and time column to a different format
