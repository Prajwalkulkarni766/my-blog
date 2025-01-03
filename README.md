# Blog-Sphere


Hello Everyone! I am Prajwal Kulkarni. I have developed this blogging web application which is industry ready to use. This web application helps you to read, listen, post blogs according to your interest.

# Preview

## Admin Panle

![User Report Page](/documentation/pictures/report-1.png "User Report")
![Blog Report Page](/documentation/pictures/report-2.png "Blog Report")
![Push Notificaton](/documentation/pictures/report-3.png "Push Notification")

## Employee Panle

![Index Page](/documentation/pictures/index-page.png "Index Page")
![Home Page](/documentation/pictures/home-page.png "Home Page")
![Blog Page](/documentation/pictures/blog-page.png "Blog Page")
![Blog Write Page](/documentation/pictures/blog-write-page.png "Blog Write Page")
![Notification Page](/documentation/pictures/notification-page.png "Notification Page")
![Profile Page](/documentation/pictures/profile-page.png "Profile Page")


# Tech stacks used

- React js
- Node js
- Python
- Fastapi
- MySQL

# How to setup this project

To setup this project and to use it follow below mentioned steps:

## 1. Prerequisites

To use this web application following applications must be install on your comptuer

1. Node js
2. MySQL
3. Python

## 1. Download or clone

First of all if you want to use this project then you have to clone it ( if you have git installed on you computer) or download it by clicking on code button present on the screen.

\*Note: Suppose If you are facing any issue while installing dependencies then feel free to search on internet. There are lot of resources available there.

## 2. Installing project dependencies for windows

If you downloaded the project from github then need to extract the zip file. After extracting the zip file go to folder and right click. Select option open in terminal.

Then run command

```
cd frontend
```

Then move to frontend folder

```
cd frontend
```

Installing frontend dependencies

```
npm i
```

move backward

```
cd ..
```

Then move to backend folder

```
cd backend
```

Then create a virtual environment

```
python3 -m venv venv
```

Activate created virtual environment

```
venv\Scripts\activate
```

Installing backend dependencies

```
pip install -r requirements.txt
```

Move to root folder

```
cd ..
```

Congratulations! You have successfully installed dependencies of the project.

\*Note: Suppose If you are facing any issue while installing dependencies then feel free to search on internet. There are lot of resources available there.

Your search query will look like according to your problem.

# Setting env variables

Go to backend folder refer .env.sample file and setup env variables according that.

Congratulations you have successfully added env variables to the project.

\*Note: Suppose if you are facing any issue while setting up env variables then feel free to search on internet.

Your search query will look like:

`How to setup env variables in fast api`

# Run project

Open folder in two different terminal. One terminal window for frontend and annother one is for backend

For frontend run this command

```
npm run dev
```

For backend run this command

```
fastapi dev main.py
```

Congratulations! Your project is running. Please visit following url after running project on computer

[BlogSphere](http://localhost:5173/ "BlogSphere")
