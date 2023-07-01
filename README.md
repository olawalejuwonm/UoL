Welcome to my learning hub for programming course at UoL



These are my notes using VS Code:
1. Create a folder and open with VSCode
C:\Users\...\APItutorial
2. Open VS Code in the folder and Run Terminal: Create New Terminal (Ctrl+ `)
3. Create virtual Environment
py -3 -m venv .venv
4. Activate Virual Environment
.venv\scripts\activate
5. Upgrade .venv pip
python -m pip install --upgrade pip
6. Install Django and Rest Framework in .venv
python -m pip install django
python -m pip install djangorestframework
7. Set Interpreter to use Virtual Environment
Ctrl+Shift+P
Type: Python: Select Interpreter , click into
Select the .venv Environment
8. Create the Django Project
//A project is a Django web application, it can consist of one or more apps
django-admin startproject api_project
cd
9. Change Directory to the project folder ( where manage.py is located)
cd api_project
10. Create Django database elements
python manage.py migrate
11. Check tables in command line
python manage.py dbshell
.tables
// to exit Ctrl+D
12. Start Django's development server
python manage.py runserver
// to exit Ctrl + C
13. Create a Django App
// An app is a python package that does a certain feature, includes files like models.py
python manage.py startapp api_app
14. Add app to project settings file /api_project/settings.py
While you are here, also add the Django rest_framework
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'api_app'
]
15. Create a model by updating api_app/models.py from django.db import models
// This model will be used to create the database table
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=20)
16. Create Table and Update the DataBase
// makemigrations is responsible for packaging up your model changes into individual migration files
// and migrate is responsible for applying those to your database
python manage.py makemigrations api_app
python manage.py migrate
17. Check table in DB
python manage.py dbshell
.tables
.schema --indent api_app_user
// to exit Ctrl+D


ALgorithm And Data Scructure - Developed A Sudoku App

Google IT Automation With Python 

Intro To Programming 1
To access sleuth: https://nbaqyoar.labs.coursera.org/
type summary.status = "pro"
https://olawalejuwonm.github.io/Game/rubies/

Intro to Programming 2

Web Development