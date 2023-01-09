#!/usr/bin/env python
# coding: utf-8

# # Exploratory Anaylysis of Google Play Store Applications

# ## Contents
# 1. [Introduction](#1)
# 2. [Data Overview](#2)
# 3. [Data Cleaning](#3)
# 4. [Exploratory Data Analysis](#4)
# 5. [Predictive Modelling](#5)
# 6. [Conclusion](#6)
# 7. [References](#7)

# <h2 id="1"> 1. Introduction </h2> 
# 
# ### 1.1 Background
# There are quite a number of numerous applications on mobile phone store apps such as apple store, amazon store, google play store etc. These applications have a wide range of characteristics viz classification of apps and games, some paid and most free, all in different categories (Family, Education, Communication etc.) etc.
# As a mobile application developer, I am motivated to explore know how these characteristics/the features of applications listed relates together for a successful deployment of an application in the Android market.
# 
# ### 1.2 Aims
# With the diverse nature of these applications, the reserach <b>aims</b> at exploring
#  the dataset inorder to:
# 
# 1. Determine the app category of the most & least popular and most & least rated applications
# 2. Determine the correlation between rating and review of applications
# 3. How the size of an application affects other features of the application
# 4. How demographics such as content rating, age impact other features of the application
# 5. Analyse Characteristics of rated applications
# 6. Predict what the rating of an application based on other features
# 7. Predict the number of downloads based on other features of the application
# 
# ### 1.3 Objectives
# At the end of this exploratory analysis, the objective is to:
# 
# 1. Perform statistical analysis and data exploration.
# 2. Be able to draw useful facts and inisight from the data.
# 3. Provide insights that will help developers to understand what type and category of apps are likely to attract more users on Google Play.
# 
# 
# ### 1.4 Data Source & Pipeline
# The data set used for this analysis is taken from kaggle which can be found <a href="https://www.kaggle.com/lava18/google-play-store-apps">here</a>. It was initially scraped from the Google Play Store according to the author:
# 
# <blockquote cite="https://www.kaggle.com/lava18/google-play-store-apps">
# While there are a large number of public datasets that provide data from the Apple App Store (such as those found on Kaggle and other similar websites), there are not nearly as many public datasets that provide data from the Google Play Store. After doing some additional research, It was discovered that the page for the iTunes App Store used a beautifully indexed appendix-like structure, which makes it possible for simple and easy web scraping. (Lavanya Gupta, 2018)
# </blockquote> 
# 
# 
# This dataset (in csv) was choosen because it contains the basic properties,characteristics and details needed to describe an application. It has 10841 rows and 13 columns.
# The rows are the applications and the column are the feature of the application for analysis with the following 13 features: App, Category, Rating, Reviews, Size, Installs, Type, Price, Content Rating, Genres, Last Updated, Current Ver, Android Ver.
# 
# Nevertheless, this dataset does not include recently released applications, plans were made to update the data set to the recent playstore data through web scraping.
# The data was scraped on August 2018. The dataset was licensed to be used open and free under the Creative Commons CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
# 
# Facts and findings from this analysis is credited to Lavanya Gupta and Google Play Store because the app information would not have been available without these two entities.
# All outcome are only meant for understanding the android application market and not for any other purpose
# and the accuracy of any findings can't exceed the accuracy of the data used for the analysis.
# 
# The dataset is loaded into the notebook from the base directory of the project and resulting dataset after cleaning is saved in the same base directory of the project. The data is distributed amidst the available application category.
# It was firstly cleaned by replacing/removing the duplicates, inconsistent and null values. Then it was analysed using the pandas library and then visualized using the matplotlib and seaborn libraries in python.
# I have choosen to use the dataset consisting only aggregate reviews of applications and not the detailed review provided from the data source, because no sentiment analysis is intended to be carried out in this analysis.
# At the end of the analysis, the conclusions were made based on the aims and objectives of this research which are deduced from the analysis and visualizations.
# 

# Impoting Libraries

# In[454]:


# import libraries
import seaborn as sns
import statistics as stat
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import warnings
import re
warnings.filterwarnings('ignore') # to ignore warnings in the notebook that are not important


# <h2 id="2"> Data Overview </h2>

# In[455]:


data = pd.read_csv('googleplaystore.csv')  # read the data
data.sample(10)  # this will show 10 random rows from the data


# In[456]:


data.shape  # to see the shape of the data i.e. no. of rows and columns


# In[457]:


data.info()  # see the information of the data and the data types of the columns


# In[458]:


# see the description of the data, the include='O' is used to see the description of the object type columns
data.describe(include='O')


# In[459]:


data.describe()  # to see the description of other data types not object type (Rating)


# In[460]:


# This list total number of applications in each category
data['Category'].value_counts()


# ### Observations after overview

# The datatype of all the features (including price and reviews) are objects except for rating which is float. This is because the price and reviews features contain commas and dollar signs. Removing the commas and dollar signs will be appropriate so as to convert the datatype of the features.
# Some features with missing values are rating, reviews, size, current ver and android ver, with ratings being the highest.
# There are 10841 rows (Apps) with 13 columns (features)
# The name of the apps are expected to be unique but there are $10841 - 9659 = 1182$ 
# apps. All App is expected to be unique throughout, but no, it isn't. 9659 out of 10841 are unique. Others have exactly the same name. Is it possible to have two apps with exactly the same name? I don't think so, but it seems play store uses only app id to identify apps and likewise there is a possibility of having duplicate app info recorded in the data.
# I also observed many irregular data entries, Some current version have non float data type as integers.
# Based on the dataset most category of application falls into the family category, most of the application are installed 1,000,000+ times, most of the application are of free type i.e most of the application are price 0, most of the application are content rating everyone, most of the application are genres family, most of the application are last updated 2018-08-03, most of the application are current ver 1.0 and most of the application are android ver 4.1 and up.
# 
# This observation from the data overview has really helped me to understand the data better and also to know what to expect from the data and it has quickly answered some analytic questions. It has also helped me to know what to do next in the data cleaning process.
# 

# <h2 id="3"> Data Cleaning </h2>
# 
# To easily know data that should be dropped or replaced, visualization will be needed to see the distribution of the data.
# 
# The code fragments below are reusable and useful for the purpose of visualization and cleaning of the data.

# In[461]:


# this plot will show the distribution of the rating
def plot_dist(data, col):
    fig, ax = plt.subplots(figsize=(8, 6))  # to set the size of the plot
    sns.heatmap(data.isnull(), cbar=False, ax=ax)  # to plot the heatmap
    ax.set_yticks([])  # to remove the yticks
    ax.tick_params(bottom='')  # to remove the bottom ticks


def remove_spines_on_plot(ax, spines):  # to remove the spines on the plot
    for spine in spines:
        ax.spines[spine].set_visible(False)


def fill_with_mode(cols):
    for col in cols:  # loop through the columns
        mode = stat.mode(data[col])  # get the mode of the column
        data[col].fillna(mode)  # fill the null values with the mode
    return data


def fill_with_mean(cols):
    for col in cols:  # loop through the columns
        # get the mean of the column excluding the null values
        mean = data[col].mean(skipna=True)
        # print(mean)
        # fill the null values with the mean
        data[col] = data[col].fillna(mean)
    return data


# ### Handling Mising values

# In[462]:


plot_dist(data, 'Rating')


# In[463]:


data.isnull().sum()  # to see the null values in the data


# All object dtypes with missing values will be <b>replaced</b> with the most occuring entry in their column (mode),
# because there is high probability that those values are the most occuring values in their column.
# Rating, a float dtype will be <b>replaced</b> with the mean of Rating column for the gerne each missing value belong to. The mean is used because it is less sensitive to outliers than other measures of central tendency such as the median.
# 
# Replacing this missing values will make the data more coherent and consistent. It will also make the data more reliable and accurate.
# 

# In[464]:


# list of the columns with object data type and having missing values
missing_obj_dype_cols = [
    'Type', 'Content Rating', 'Current Ver', 'Android Ver'
]

# call the function to fill the missing values
fill_with_mode(missing_obj_dype_cols)
# check the null values


# In[465]:


# get the round of average rating per genre
avg_per_gerne = round(data.groupby('Genres').mean(), 1)
# get the dictionary of the average rating per genre for filling the missing values
fill_to = avg_per_gerne.to_dict()['Rating']
# this will set the index of the data to the genre so that we can fill the missing values with the average rating per genre
data.Rating.index = data.Genres.values
# fill the missing values with the average rating per genre
data['Rating'] = pd.Series(data['Rating'].fillna(fill_to).values)


# In[466]:


data.isnull().sum()


# What's with these redundant five nans (missing values)?!
# Let's have a look .
# 

# In[467]:


redundant = data[data.Rating.isnull()] # shows all the rows with null values in the rating column 
redundant


# Their genres belong to either 'Art & Design;Action & Adventure', 'Trivia;Education', 'Books & Reference;Creativity' or 'Role
# Playing;Education'.
# > Let's check for the values these keys belong to in the 'fill_to' dictionary.
# 

# In[468]:


fill_to.values() # show the values of the dictionary


# In[469]:


fill_to['Trivia;Education'] # get the value of the key 'Trivia;Education'


# The average value of these Genres was nan all along. <br>
# These missing values were replaced with a missing value! Hence, the missing value turned redundant. <br>
# There's nothing left to do than to drop these, or fill them with the overall mean.
# 

# In[470]:


# fill the missing values with the mean of the rating column
fill_with_mean(['Rating'])
# data['Rating'] = data['Rating'].fillna(data['Rating'].mean())


# In[471]:


plot_dist(data,'Rating') # plot the heatmap to see the missing values


# In[472]:


data.isnull().sum() # check the null values, we can see that there are no null values in the rating column


# <pre>I noticed that some of the rating are out of bound. Google play rating is usually on a scale of 1 to 5.
# See below.
# </pre>
# 

# In[473]:


# get maximum value of the rating column
data['Rating'].max()


# In[474]:


# get minimum value of the rating column
data['Rating'].min()


# The maximum looks odd. Let's have a look at the distribution of the ratings.

# In[475]:


# Distribution of the rating column
sns.distplot(data['Rating'], bins=10, kde=False)


# With the distribution of the ratings, it is clear that the maximum rating is 5.0. The maximum rating of 19.0 is an outlier. It will be replaced with the mean of the ratings for the genre it belongs to.

# In[476]:


# Replace the values of the rating column with the mean of the rating column
data['Rating'] = data['Rating'].replace(19.0, data['Rating'].mean())
data['Rating'].max()  # check the maximum value of the rating column


# ### Cleaning Inconsistent Data Entries.
# The dtypes of come columns would also be changed here.
# 

# In[477]:


data.sample(10)  # view 10 random rows from the data


# #### Reviewing each column for any irregularities
# App : Seems normal. Anyone could name their app anything.
# Category : I'd love to remove these 'harmless' underscores. Besides, there could be meaningless or repeated categories. We'd check
# for this too.
# Rating : Perfectly filled!
# Reviews : Hmmm, I'm unsure it's perfect. We'd try converting them to integers to be sure. Having a ValueError means the column needs cleaning.
# Size : Nicely filled. I should still check to be sure.
# Installs : Normal. I should still check to be sure.
# Type : Normal too. I should still check to be sure.
# Price : I will remove the dollar sign, change its dtype to float and rename it.
# Content Rating : I found something strange here. See below:
# 

# In[478]:


data.iloc[141:142] # view the row with index 141


# 'Everyone 10+' <br>
# Downloading the game is restricted to those 10 or above. Why then, should Everyone be included? For all occurences similar to this, we'd remove Everyone from there. We'd also check other values to be sure. <br>
# Genre : Seems normal. I will still check to be sure. <br>
# Last Updated : This would be converted to datetime. <br>
# Current Ver : Looks nice. We'd still check to be sure. <br>
# Android Ver : Very perfect, but we'd still check to be sure. <br>
# 

# In[479]:


data['Category']= data['Category'].str.replace('_','  ') # replace the _ with space


# In[480]:


data['Category'].unique() # get the unique values of the category column


# The last element in the output above seems off. <br>
# Let's peep at the whole data of rows with their category being '1.9'.

# In[481]:


data[data['Category']=='1.9'] # get the row with category 1.9


# I observed that: <br>
# __1. Its category is numerical.__ <br>
# __2. Its rating is above 5.__ <br>
# __3. Last Updated is a datetype, but its has a perplexing entry itself.__ <br>
# __4. Its gerne is 'February 11, 2018' - an odd value.__ <br>
# __5. Its type is odd as well.__ <br>
# __6. While most of the entries in Reviews are integers, this one chose to be 3.0M.__
# 
# 

# As a result of the irregularities, the row will be dropped. <br>

# In[482]:


data = data.drop(10472) # drop the row with index 10472


# In[483]:


#Reviews

data['Reviews'] = data['Reviews'].astype('int') # convert the reviews column to int type


# In[484]:


#Size

data['Size'].unique() # get the unique values of the size column


# As expected, everything seems alright.
# 

# In[485]:


#Installs

data['Installs'].unique()   # get the unique values of the installs column


# As expected, everything seems alright.

# In[486]:


# Type
data['Type'].unique()  # get the unique values of the type column


# Nice.

# In[487]:


# Price
# this will remove the $ sign from the price column
data['Price'] = data['Price'].str.replace('$', '')
# this will convert the price column to float type
data['Price'] = data['Price'].astype('float')


# Nice

# In[488]:


# get the unique values of the content rating column
data['Content Rating'].unique()


# Everyones 10+ are absurd for content rating.

# In[489]:


# Content Rating
# this will get the rows with the absurd content rating i.e. Everyone with a space
absurd = data[data['Content Rating'].str.contains('Everyone ')]
absurd


# In[490]:


absurd['Content Rating'].unique() # get the unique values of the absurd content rating


# With this observation <br>
# More than 400 rows are 'absurd'

# In[491]:


data['Content Rating'] = data['Content Rating'].str.replace(
    'Everyone 10', '10')  # replace the absurd content rating with 10

# get the value counts of the content rating column
data['Content Rating'].value_counts()


# 'Unrated' should also fall under 'Everyone'. <br>
# 

# In[492]:


data['Content Rating'] = data['Content Rating'].str.replace(
    'Unrated', 'Everyone')  # replace the absurd content rating with Everyone

# get the value counts of the content rating column
data['Content Rating'].value_counts()


# In[493]:


# Genres
data['Genres'].unique() # get the unique values of the genres column


# It Seems so dirty. <br>
# 

# In[494]:


data['Content Rating'] = data['Content Rating'].str.replace(
    'Unrated', 'Everyone')  # this will replace the unrated with everyone
# get the value counts of the content rating column
data['Content Rating'].value_counts()


# In[495]:


data['Genres'].value_counts()[:20] # this will show the top 20 genres


# Of 117 unique values, the first 20 seem ideal

# In[496]:


data['Genres'].value_counts()[20:40]  # this will show the next 20 genres


# In[497]:


data['Genres'].value_counts()[40:60] # this will show the next 20 genres


# Up till music, everything seems perfect. 'Puzzle;Brain Games' should not be a separate gerne, but should be merged with 'Puzzle'. The same goes for the rest, downwards.

# In[498]:


data['Genres'].value_counts()[60:] # this will show the rest of the genres


# In[499]:


# this will remove the sub genres using regular expression
# will only replace those that match the form ;subgenre
data['Genres'] = data['Genres'].str.replace(r';[a-z &]*', '', flags=re.I)


# In[500]:


data['Genres'].value_counts() # shoe the value counts of the genres column


# Educational should be merged with Education  <br>
# Music & Audio should be merged with Music.
# 

# In[501]:


data['Genres'] = data['Genres'].str.replace('Educational', 'Education').str.replace(
    'Music & Audio', 'Music')  # replace the genres with the same meaning

data['Genres'].unique() # get the unique values of the genres column


# This is nice and clean. <br>

# In[502]:


# Last Updated

# this will convert the last updated column to datetime type
data['Last Updated'] = pd.to_datetime(data['Last Updated'])


# There is an inconsistent data entry here. I will deal with that after this.
# 

# In[503]:


# Current Ver

# this will show the unique values of the android version column
data['Android Ver'].unique()


# In[504]:


# this will remove the W from the android version column
data['Android Ver'] = data['Android Ver'].str.replace('W', '')


# In[505]:


# get the unique values of the android version column
data['Android Ver'].unique()


# __Review Aftermath__

# Removing outliers, if any    <br>
# Outliers can only be seen in number.

# In[506]:


# loop through the int and float columns
for i in data.select_dtypes(['int', 'float']):
    sns.violinplot(y=data[i], color='brown')  # plot the violin plot
    plt.grid()  # show the grid
    plt.show()  # show the plot


# They all seems to be without 'outliers' since they are all within resonable ranges.
# 

# 
# App is expected to be unique throughout, but it isn't. I deal with that here.

# In[507]:


# Before dropping
Apps = data['App'].value_counts()  # get the value counts of the app column
Apps[Apps > 1]  # show the apps that have more than one entry


# There are almost 800 apps repeated.  <br>
# Let's check a few of them.
# 

# In[508]:


data[data['App'] == 'ROBLOX'] # show the rows with the app ROBLOX


# This is definitely a duplicate!

# In[509]:


data[data.App == 'ESPN']  # show the rows with the app ESPN


# In[510]:


# show the rows with the app Clover Dating App
data[data.App == 'Clover Dating App']


# <pre>It would not be too much if an assumption to say that there are many apps were duplicated 
# when gathering the data. This will be problematic and it'll make the analysis inaccurate.
# I'd, therefore, be dropping duplicates.</pre>
# 

# In[511]:


# Before dropping
data.shape # get the shape of the data


# In[512]:


duplicate = data[data.App.duplicated()]  # get the duplicate rows
duplicate


# In[513]:


data = data.drop(duplicate.index) # drop the duplicate rows


# In[514]:


# After dropping
data.shape  # get the shape of the data


# In[515]:


# After dropping
Apps = data['App'].value_counts()  # get the value counts of the app column
Apps[Apps > 1]  # show the apps that have more than one entry


# __Data Cleaned.__  <br>
# I'd go ahead and save the cleaned version of it.
# 

# In[516]:


# save the cleaned data to a csv file
data.to_csv('Cleaned Google Playstore App Dataset.csv')


# <h2 id="4"> Exploratory Data Analysis. </h2>
# 

# Google Play Store has a whole lot of category. I'm curious to know which category most of the apps there fall to.
# 

# In[517]:


# sets the size of the plot as 12 by 15
fig, ax = plt.subplots(figsize=(12, 15))
plot = sns.countplot(y=data['Category'], ax=ax,
                     color='grey')  # plots the countplot
for i in plot.patches:  # this will loop through the patches
    # this will annotate the countplot and add the count on the plot
    plot.annotate(i.get_width(), (i.get_width()+30, i.get_y()+0.6))
    # this will highlight the maximum value
    if i.get_width() == data['Category'].value_counts().max():
        i.set_color('brown')
    # this will highlight the minimum value
    if i.get_width() == data['Category'].value_counts().min():
        i.set_color('brown')
remove_spines_on_plot(ax, ['left', 'right', 'top'])  # this will remove the spines on the plot
# this will remove the ticks on the plot
ax.tick_params(bottom=False, left="", labelsize='large')
plt.title('A Barplot Showing the Number of Apps Made in Each Category.\n\n',
          fontsize=20, color='grey')  # this will set the title of the plot


# Family! <br>
# Most of the Google Play Store Apps are of the Family category, while the least is Comics.

# Of the Family Category, which genre (sub-category) is the most famous?

# In[518]:


# sets the size of the plot as 12 by 15
fig, ax = plt.subplots(figsize=(12, 15))
# this will get the genres of the family category
Family_genre = data['Genres'][data['Category'] == 'FAMILY']
plott = Family_genre.value_counts()[:10].plot.bar(  # plots the barplot
    color=['brown', 'brown', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'])

for i in plott.patches:  # this will loop through the patches
    # this will annotate the barplot and add the count on the plot
    plott.annotate(i.get_height(), (i.get_x()+0.1, i.get_height()+4))
# this will remove the spines on the plot
remove_spines_on_plot(ax, ['left', 'top', 'right'])
# this will remove the ticks on the plot
ax.tick_params(bottom=False, left=False, labelsize='large')


# "Around the world in 2018, a larger fraction of developers are developing apps in the Family Category to majorly educate or <br>
# entertain them." - The data just revealed this! 

# Do they sell most of their apps or place them for free?

# In[519]:


fig, ax = plt.subplots(figsize=(10, 7))  # sets the size of the plot as 10 by 7
# this will get the type of the family category
Family_Type = data['Type'][data['Category'] == 'FAMILY']
plottt = Family_Type.value_counts().plot.bar(color='brown', width=.18)
for i in plottt.patches:
    # this will annotate the plot and add the percentage on the plot
    plottt.annotate('{}%'.format(
        round(i.get_height()/len(Family_Type)*100)), (i.get_x()+0.03, i.get_height()+3))
remove_spines_on_plot(ax, ['top', 'right'])  # this will remove the spines on the plot
plt.ylabel('Counts\n\n')
plt.yticks([0, 400, 800, 1200, 1600])
ax.tick_params(bottom=False, left=False, labelsize='larger')
plt.title('A Barplot Showing the Proportion of the Type of Apps Made in the FAMILY Category.\n\n',
          fontsize=20, color='grey')


# A whole lot of the apps made under this 'popular' category are free! Infact, most apps from our data are free to download.
# 

# Do they get a high rating for their apps, compared to other categories?

# In[520]:


Family_Rating = data['Rating'].groupby(
    data['Category']).mean().sort_values(ascending=False)  # get the mean rating of each category
Family_Rating


# In[521]:


fig, ax = plt.subplots(figsize=(12, 7))  # sets the size of the plot as 12 by 7
# this plots the lineplot and sets the color to grey for the first 16 values
ax.plot(Family_Rating[:16], color='grey',)
# this plots the lineplot and sets the color to brown for the last 3 values
ax.plot(Family_Rating[15:18], color='brown', alpha=1, marker=2, ls=':')
# this plots the lineplot and sets the color to grey for the last 3 values
ax.plot(Family_Rating[17:], color='grey')
# this plots the barplot and sets the color to grey
plot = Family_Rating.plot.bar(color='grey')
for i in plot.patches:
    if i.get_height() == Family_Rating[16]:
        i.set_color('brown')

for i in ['top', 'right', 'left', 'bottom']:
    ax.spines[i].set_visible(False)
ax.tick_params(left=False, labelsize='large')
plt.xticks(['EVENTS', 'FAMILY', 'DATING'], rotation=0)
plt.xlabel('\n\nCategory')
plt.ylabel('Ratings\n\n')
plt.title('A Barplot Showing the Average Rating Rank of Each Category.\n\n',
          fontsize=20, color='grey')
plt.yticks([4.1, 4.3, 4.5])


# Though the FAMILY Category has the highest number of apps, it has no important Rating rank among other categories. <br>
# EVENTS and DATING have the highest and lowest ranks, respectively.
# 

# __Still on the FAMILY Category:__ <br>
# What is the minimum number of Installs they get? What's the maximum? What's the avarage, with respect to the other categories?

# In[522]:


# this will get the minimum number of installs in each category
data['Installs'].groupby(data['Category']).min().sort_values(ascending=False)


# The FAMILY Category ranks the lowest in both Series. Its maximum Installs value is so low!
# 

# Which apps in the Google Play Store are famous? Apps with the highest installs would reveal this. 
# 

# Under which category do most of them fall?
# 

# In[523]:


# get the apps with the maximum number of installs
famous_apps = data[data.Installs == data.Installs.max()]
famous_apps


# __As expected, they are all free to download, and most of them do not limit any age group from downloading them.__

# In[524]:


fig, ax = plt.subplots(figsize=(10, 8))  # sets the size of the plot as 10 by 8
plot = sns.countplot(famous_apps['Category'],
                     color='grey')  # plots the countplot
for i in plot.patches:  # this will loop through the patches
    i.set_width(0.4)  # this will set the width of the patches
    # this will highlight the maximum value
    if i.get_height() == famous_apps['Category'].value_counts().max():
        # this will set the color of the maximum value to brown
        i.set_color('brown')
# this will remove the spines on the plot
remove_spines_on_plot(ax, ['left', 'top', 'right'])
# this will remove the ticks on the plot
ax.tick_params(bottom=False, left=False)
plt.xticks(rotation=40)  # this will rotate the xticks by 40 degrees
plt.ylabel('')  # this will remove the ylabel
plt.title('A Barplot Showing the Number of Apps With Over 500 Million Installs Per Category.\n\n',
          fontsize=15, color='grey', loc='left')  # this will set the title of the plot


# A whole lot of people have downloaded more apps in the COMMUNICATION and TOOLS Categories, than any other Category. <br>
# W'd look deeper into the apps under these 'famous' Categories. 

# In[525]:



famous_apps[(famous_apps['Category'] == 'COMMUNICATION') |
            (famous_apps['Category'] == 'TOOLS')]['App'].values
# this will get the apps with the maximum number of installs in the communication category


# __These are popular apps indeed.__

# Which app(s) in the Google Play Store are the least famous?

# In[526]:


# get the apps with the minimum number of installs
infamous_apps = data[data.Installs == data.Installs.min()]
infamous_apps


# Though it is free to download, it still has no downloads.
# 

# __About how many years does this data span about? When is the latest date?__

# In[527]:


# get the minimum and maximum date
data['Last Updated'].min(), data['Last Updated'].max()


# __Last Updated spans for about eight years, from the 21st of May 2010, to the 8th of August, 2018.__
# 

# __No app was updated beyond this range.__  <br>
# The highest number of updates took place in what year?

# In[528]:


# sets the size of the plot as 15 by 10
fig, ax = plt.subplots(figsize=(15, 10))
# this plots the kdeplot and sets the color to brown
data['Last Updated'].dt.year.plot(kind='kde', color='brown')
remove_spines_on_plot(ax, ['left', 'top', 'right'])  # this will remove the spines on the plot
# this will remove the ticks on the plot
ax.tick_params(bottom=False, left=False, labelleft='')
plt.ylabel('')  # this will remove the ylabel
plt.xlabel('\n\nYears')  # this will set the xlabel
plt.grid(axis='x')  # this will add a grid to the plot
plt.title('Distribution of Apps Over Last Updated Years.\n\n\n',
          loc='left', color='grey', fontsize=17)  # this will set the title of the plot


# Which month does updates occur more frequently? Least freqently?
# The answer to the latter question would be deduced from years having complete months (Years excluding 2010 and 2018).
# 

# If my app has a high number of reviews, will it be highly rated?
# 

# In[529]:


fig, ax = plt.subplots(figsize=(15, 7)) # sets the size of the plot as 15 by 7
plot = sns.lineplot(x=data['Rating'], y=data['Reviews'], color='brown', ax=ax) # plots the lineplot
remove_spines_on_plot(ax, ['top', 'right']) # this will remove the spines on the plot
ax.tick_params(bottom=False, left=False, labelsize='large') # this will remove the ticks on the plot
plt.title('Total Reviews Made For Each App Vs. App Ratings.\n\n',
          loc='left', color='grey', fontsize=17)


# In[530]:


# this will get the index of the apps with ratings greater than 5
np.where(data['Rating'] > 5.0)


# Yes, a highly rated app has a lot of people passing down their reviews.
# The higher the Rating , the higher the Reviews .
# Between free and paid apps, which one of them has a higher chance of being highly rated?
# 

# Between free and paid apps, which one of them has a higher chance of being highly rated?
# 

# In[531]:


fig, ax = plt.subplots(figsize=(15, 7))  # sets the size of the plot as 15 by 7
sns.stripplot(y='Rating', x='Type', color='brown',
              marker='.', data=data)  # plots the stripplot
remove_spines_on_plot(ax, ['right', 'top', 'bottom'])  
# this will remove the ticks on the plot
ax.tick_params(bottom=False, left=False, labelsize='large')
plt.xlabel('')  # this will remove the xlabel
plt.title('A Stripplot Showing How Ratings Vary With App Type\n\n',
          loc='left', color='grey', fontsize=20) # this will set the title of the plot


# Content Rating - What is the proportion of each group?

# In[532]:


fig, ax = plt.subplots(figsize=(10, 7))  # sets the size of the plot as 10 by 7
plot = sns.countplot(y=data['Content Rating'],
                     color='brown')  # plots the countplot
for i in plot.patches:  # this will loop through the patches
    # this will get the percentage of each category
    text = i.get_width()*100/data.shape[0]
    # this will annotate the plot
    plot.annotate('{:.2f}%'.format(text), (i.get_width()+70, i.get_y()+0.4))
remove_spines_on_plot(ax, ['right', 'top', 'bottom'])
ax.tick_params(bottom=False, left=False, labelsize='large',
               labelbottom='')  # this will remove the ticks on the plot
plt.xlabel('')  # this will remove the xlabel
plt.title('A Barplot Showing the Count of the Various Content Rating Groups.\n\n',
          loc='left', color='grey', fontsize=17)  # this will set the title of the plot


# Most apps have no age group restriction. Anyone can download them.
# However, a few apps are solely for adults. A closer peep, please.

# In[533]:


# this will get the apps with the adult content rating
data[data['Content Rating'] == 'Adults only 18+']


# These apps have an average high rating, are free to download, and are of two Genres - Comics and Sports.
# 

# For apps with the following:
# 1. maximum rating
# 2. minimum rating <br>
# Most of them fall under which Category ? <br>
# Most of them are of which Type ?

# In[534]:


# this will get the apps with the minimum rating
minimum = data[data.Rating == data.Rating.min()]
# this will get the apps with the maximum rating
maximum = data[data.Rating == data.Rating.max()]


# In[535]:


# this will get the number of apps with the maximum rating per category
maximum.Category.value_counts()


# In[536]:


# this will get the number of apps with the minimum rating per category
minimum.Category.value_counts()


# <b>The highest rated apps, as well as the least rated apps are found mainly in the FAMILY Category and are definitely free to
# download.</b>
# 

# Considering Size
# 

# In[537]:


data.Size.value_counts().head()  # this will get the top 5 sizes of apps


# Most of the sizes recorded are not definite. Hence, we cannot really work with this column as we ought to.
# I'd create a temporal custom dataframe with rows having "Varies with device" as Size filtered out

# In[538]:


# this will get the apps with a fixed size
dataframe = data[data.Size != 'Varies with device']
dataframe.Size.value_counts().head()  # this will get the top 5 sizes of apps


# <pre>This can now be work with.
# The target is to make Size column an integer type. 
# This column should have megabyte as its unit.
# First, 'M' (symbolizing megabyte) will be removed.
# Second, those ending with 'k' (symbolizing kilobyte) will have their integer part divided by 1024 (1024Kb makes 1Mb)
# Third, 'k' will be removed.
# Lastly, the column would be converted to a float type and renamed.
# Doing all these will make the column have only megabyte as its unit, so that correct analysis can be done.
# </pre>

# In[539]:


# the lamda function converts the size of the app to megabytes
dataframe.Size = dataframe.Size.str.replace('M', '').apply(lambda x: float(x[:-1])/1024 if x[-1] == 'k' else x).astype(
    'float')  # this replaces the M with nothing and converts the size to megabytes
# add a new column to the dataframe called Size in Mb
dataframe['Size In Mb'] = dataframe.Size


# In[540]:


# this will get the summary statistics of the size of the apps
dataframe['Size In Mb'].describe()


# Based on the dataset, the average size an app from Play Store has is about 20 Mb.
# 

# Does the Category an app belong to affect how sized the app is? Which category has the least app size? Which one has the highest?

# In[541]:


# this sets the size of the plot as 10 by 12
fig, ax = plt.subplots(figsize=(10, 12))
sns.pointplot('Size In Mb', 'Category', data=dataframe, hue='Type', color='brown',
              ci=None, markers=[8, '.'], ax=ax)  # this plots the pointplot
# this adds the legend to the plot
plt.legend(ncol=2, frameon=False, fontsize='x-large')
remove_spines_on_plot(ax, ['right', 'top'])  # this will remove the spines on the plot
# this removes the ticks on the plot
ax.tick_params(bottom=False, left=False, labelsize='large')
plt.xlabel('Size in Mb', color='grey', fontsize=17)  # this sets the xlabel
plt.ylabel('Category', color='grey', fontsize=17)  # this sets the ylabel
plt.xticks(np.arange(0, 56, 5))  # this sets the xticks
plt.grid(color='purple', ls=':', alpha=.4)  # this adds a grid to the plot
plt.title('How App Sizes Vary In Each Category and Each Type.\n\n',
          loc='left', color='grey', fontsize=17)  # this sets the title of the plot


# <pre>For Paid apps (brown colored line), two spikes are seen in the ENTERTAINMENT and TRADE AND LOCAL Categories with
# average sizes of about 53 Mb and 42 Mb respectively.
# Free apps' (most apps fall under this type, denoted by the black colored line), however has a lower spike and this is found in the
# GAME Category. It has an average size of about 43 Mb.
# Paid apps are usually larger in size. </pre>
# 

# <h2 id="5"> Predictive Modelling </h2>
# 

# To choose a suitable model to train our data with, checking out for the correlation between these features is essential.
# 

# In[542]:


dataframe.corr()  # this will get the correlation between the numerical columns


# <pre>
# Aim is to predict how many installs an app will have, based on other features.
# Spltting the data into dependent (y) and independent (X) features.
# To determine which feature could affect Installs , I will examine each of the features.
# </pre>

# ### Review
# <pre>
# App : The name of the app definitely has no impact on if I'd get 20 or 200000 Installs.
# Category : The number of Installs could depend on the category an app is.
# Rating : A highly installed app could attract high ratings.
# Reviews : Ealier on (in the EDA section), we saw that a highly rated app attracts
# more reviews. Thus, an app is meant to have a lot of users (pontential reviewers) 
# because it has a high number of reviews
# Size : Installs would definitely depend on the app size. 'Varies with device' 
# as an entry would have no certain impact on Installs, thus would be dropped 
# ('dataframe' would be used for the data modelling rather than 'data', for obvious reasons).
# Type : A free app could have more users installing them.
# Price : The same thing goes for this feature.
# Content Rating : This, as well.
# Last Updated : The number of installs cannot be predicted from when last an app was updated.
# Current Ver : Likewise this.
# Android Ver : This could affect Installs. If my android version is not compatible with the 
# app's required version, I would decide not to download it. I'd rather go with 
# an alternative app.
# </pre>
# 

# In[543]:


# Importing libraries from scikit learn.
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score, accuracy_score


# In[544]:


# this will drop the columns that are not needed
X = dataframe.drop(['App', 'Last Updated', 'Current Ver'], axis=1)
y = dataframe['Installs']  # this will set the target variable


# In[545]:


Encoder = LabelEncoder()  # this will instantiate the label encoder
for i in X.select_dtypes('O'):  # this will loop through the categorical columns
    # this will encode the categorical columns
    X[i] = Encoder.fit_transform(X[i])


# In[546]:


# this will split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, stratify=y, random_state=0)


# In[547]:


# this will instantiate the decision tree classifier for fitting
model = DecisionTreeClassifier()
model.fit(X_train, y_train)  # this will fit the model to the training data


# In[548]:


y_pred = model.predict(X_test)  # this will make predictions on the test data


# In[549]:


accuracy_score(y_test, y_pred)  # this will get the accuracy score


# Accurate!

# ### Regression Model
# The aim is to predict what the rating of an app will be, based on other features

# ### Review
# <pre>
# App : The name of the app definitely has no impact on if I'd get a star or 5 stars.
# Category : The rating could depend on the category an app is.
# Installs : A highly installed app could attract high ratings.
# Reviews : Everone who drops a review drops a rating.
# Size : Rating would definitely depend on the app size.
# Type : A free app could have more users highly rating it.
# Price : The same thing goes for this feature.
# Content Rating : This, as well.
# Last Updated : Rating cannot be predicted from when last an app was updated.
# Current Ver : Likewise this.
# Android Ver : This could affect Rating . If my android version is not compatible
# with the app's required version, I could get furious and give it just a star.
# </pre>

# In[556]:


# this will drop the columns that are not needed
X = dataframe.drop(['App', 'Last Updated', 'Current Ver'], axis=1)
y = dataframe['Rating']  # this will set the target variable


# In[551]:


Encoder = LabelEncoder()  # this will instantiate the label encoder
for i in X.select_dtypes('O'):  # this will loop through the categorical columns
    # this will encode the categorical columns
    X[i] = Encoder.fit_transform(X[i])


# In[552]:


# this will split the data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=2)


# In[553]:


# this will instantiate the decision tree regressor
model = DecisionTreeRegressor(random_state=2)
model.fit(X_train, y_train)  # this will fit the model to the training data


# In[554]:


y_pred = model.predict(X_test)  # this will make predictions on the test data


# In[557]:


r2_score(y_test, y_pred)  # this will evaluate the model


# Great! This is accurate!.

# <h2 id="6"> Conclusion </h2>

# Based on the exploratory data analysis, I can conclude that:
# 1. Most of the Google Play Store Apps are of the Family category, while the least is Comics.
# 2. A whole lot of the apps made under that are popular are free!.
# 3. "In 2018, a larger fraction of developers are developing apps in the Family Category to majorly educate or 
# entertain them." 
# 4. A highly rated app has a lot of people passing down their reviews.
# 5. The higher the Rating, the higher the Reviews.
# 6. Most apps have no age group restriction. Anyone can download them.
# 7. The highest rated apps, as well as the least rated apps are found mainly in the FAMILY Category and are definitely free to download.
# 8. Paid apps are usually larger in size.
# 

# <h2 id="7"> References </h2>
# 
# * Google Play Store Dataset [Kaggle](https://www.kaggle.com/lava18/google-play-store-apps)
# * [Google Play Store](https://play.google.com/store/apps)
# * Visualizations [Seaborn](https://seaborn.pydata.org/)
# * [Pandas](https://pandas.pydata.org/)
# * Dr Sean Mc Grath Labs
# * [Stack Overflow](https://stackoverflow.com/)
# * Cephas ICT HUB Lab Notes - [Cephas ICT HUB](https://www.cephasict.com/)
# 
