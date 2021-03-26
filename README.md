## General info
This project is Website where show catalog of book that availible to borrow. If you want to read a book, you don't need to buy book, you can borrow from people arround you. 

## Image
![image](https://user-images.githubusercontent.com/38047246/112643528-091bc780-8e77-11eb-922d-d7efb42e65a8.png)

![image](https://user-images.githubusercontent.com/38047246/112262253-f4390b80-8c9f-11eb-890b-86974ae5d250.png)

![image](https://user-images.githubusercontent.com/38047246/112262131-b2a86080-8c9f-11eb-9105-423b0ff0198b.png)

![image](https://user-images.githubusercontent.com/38047246/112262231-e84d4980-8c9f-11eb-8d4d-ac693bd75fa2.png)


## Technologies
Project is created with:
* Node version: V12.18.4
* NPM version: V6.14.6
* Google Cloud SQL
* Google Cloud Storage
* Goole App Engine
	
## Setup
To run this project, install it locally using npm:

``` bash
# clone the repo
$ git clone https://github.com/anonymousliem/solution-challenge solution-challenge

# go into app's directory
$ cd solution-challenge

```

## Setup Backend
```
# go into backend's directory
$ cd backend
```

> Configuration Database
- Rename sample.copy.env to .env
- Change configuration with your database (this app using MySQL) : 
DB_HOST=YOUR_DATABASE_HOST
DB_USER=YOUR_DATABASE_USER
DB_PASS=YOUR_DATABASE_PASSWORD
DB_NAME=YOUR_DATABASE_NAME

> Configuration Google Cloud Key
- In file .env change with your own configuration : 
GCP_PROJECT_ID=YOUR_GCP_PROJECT_ID
BUCKET_NAME=YOUR_BUCKET_NAME
 
- Make sure you already create Google Cloud Service Account With 2 Roles : API Keys Admin & Storage Admin
- Replace key.json in 'backend/config/key.json' with your Google Cloud Key
- Make sure your bucket can accsess with public

> Configuration Node Module
```
# in backend directory

# to install all depedencies
npm install

# to run backend
npm start
```

> Deploy backend to Google Cloud App Engine
```
# In backend directory

# Make sure you already install GOOGLE CLOUD SDK
# Deploy to Google Cloud App Engine
gcloud app deploy

```
## What's included in backend

```
├── Config/            #Config Your Google Cloud Service Account Key For Google Cloud Storage
│   ├── key.json/      #Upload Your key.json
│   
│__ .env	       #Config database, project id, bucket 
|__ server.js          #define route and endpoint for backend
|
|
└── package.json
```

## Setup Frontend
```
# go into backend's directory
$ cd frontend
```

> Configuration Constant
- change your backend url in '../frontend/src/Constant'
 
> Configuration Node Module
```
# in frontend directory

# to install all depedencies
npm install

# to run frontend
npm start
```

## What's included in Frontend
Frontend using template from <a href="https://coreui.io/"> core ui </a>
```
├── src /           
│   ├── Constant.js      #congfiguration backend url
|   ├── App.js           #define route and component
|   ├── _nav.js          #configuration sidebar
|   ├── views	
|	 ├── Pages       # Configuration per pages	
|
└── package.json
```

## Features
* Register & Login
* Show and search list all book
* CRUD My Book
* Add and update personal info

## Info
Demo : http://35.232.74.17
