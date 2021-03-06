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
* Google Cloud Spanner	
* Google Cloud Pub/Sub
* Google Firestore

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
```
DB_HOST=YOUR_DATABASE_HOST
DB_USER=YOUR_DATABASE_USER
DB_PASS=YOUR_DATABASE_PASSWORD
DB_NAME=YOUR_DATABASE_NAME
```

> Configuration Google Cloud Spanner
- Don't forget to enable [Cloud Spanner API](https://console.cloud.google.com/flows/enableapi?apiid=spanner.googleapis.com), & [create and set up credential](https://cloud.google.com/docs/authentication/getting-started)

- infile .env Change configuration with your spanner configuration
```
PROJECT_ID=YOUR_SPANNER_PROJECT_ID
INSTANCE_ID=YOUR_SPANNER_INSTANCE_ID
DATABASE_ID=YOUR_DATABASE_SPANNER_ID
TABLE_NAME=YOUR_TABLE_SPANNER
```
> Configuration Google Cloud Pub/Sub
- Don't forget to enable [Cloud Pub/Sub API](https://console.cloud.google.com/flows/enableapi?apiid=pubsub.googleapis.com), & [create and set up credential](https://cloud.google.com/docs/authentication/getting-started)

- infile .env Change configuration with your pub/sub configuration
```
TOPIC_NAME=YOUR_PUBSUB_TOPIC_NAME
SUBSCRIPTION_NAME=YOUR_SUBSCRIPTION_NAME
```

> Configuration Google Cloud Firestore
- Don't forget to enable [Cloud Firestore API](https://console.cloud.google.com/flows/enableapi?apiid=firestore.googleapis.com), & [create and set up credential](https://cloud.google.com/docs/authentication/getting-started)

- infile .env Change configuration with your pub/sub configuration
```
COLLECTION_NAME=YOUR_COLLECTION_NAME
```
- Replace keyFirestore.json in 'backend/config/keyFirestore.json' with your Google Cloud Key

> Configuration Google Cloud Storage
- In file .env change with your own configuration : 
```
GCP_PROJECT_ID=YOUR_GCP_PROJECT_ID
BUCKET_NAME=YOUR_BUCKET_NAME
```

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

# to see subscription from google cloud pub/sub
- open another terminal, in backend directory run :
node sub.js

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
????????? Config/                #Config Your Google Cloud Service Account Key For Google Cloud Storage and Google Cloud Firestore
???   ????????? key.json           #upload your credential for google cloud storage bucket 
???   |__ keyFirestore.json  #upload your credential for google cloud firestore 
???__ .env	               #Config database, project id, bucket 
|__ server.js              #define route and endpoint for backend
|
|__ sub.js                 #subscription from google cloud pub/sub
|__ spanner.sql            #SQL for create table in spanner
????????? package.json
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
????????? src /           
???   ????????? Constant.js      #congfiguration backend url
|   ????????? App.js           #define route and component
|   ????????? _nav.js          #configuration sidebar
|   ????????? views	
|	 ????????? Pages       # Configuration per pages	
|
????????? package.json
```

## Features
* Register & Login
* Show and search list all book
* CRUD My Book
* Add and update personal info
* CRUD Note
* CRUD Membership

## Postman Documentation
https://www.getpostman.com/collections/4134b224a4d75aa3fe09
