## General info
This project is Website where show catalog of book that availible to borrow. If you want to read a book, you don't need to buy book, you can borrow from people arround you. 

## Image

![image](https://user-images.githubusercontent.com/38047246/78897567-961a1500-7a9c-11ea-9250-e2a666799474.png)

![image](https://user-images.githubusercontent.com/38047246/78909424-b30b1400-7aad-11ea-9cd7-549193c1fcd1.png)

![image](https://user-images.githubusercontent.com/38047246/83380256-b6fd4780-a407-11ea-93b6-094f8248070e.png)

![image](https://user-images.githubusercontent.com/38047246/78911408-77257e00-7ab0-11ea-94b5-57a5f81989ea.png)

![image](https://user-images.githubusercontent.com/38047246/78897466-69fe9400-7a9c-11ea-907f-cc71129ef1fa.png)

## Technologies
Project is created with:
* Node version: V12.18.4
* NPM version: V6.14.6
* Google SQL
* Google Cloud Storage
* Goole App Service
	
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
#in backend directory

# to install all depedencies
npm install

# to run backend
npm start
```

## Next step

``` bash
# in your app directory
# generate laravel APP_KEY
$ php artisan key:generate

# run database migration and seed
$ php artisan migrate:refresh --seed

# generate mixing
$ npm run dev

# and repeat generate mixing
$ npm run dev
```

## Usage

``` bash
# start local server
$ php artisan serve
``` 

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:


```
├── public/          #static files
│   ├── uploads/      #your upload file will save in this directory
│   └── index.html   #html template
│
|__ app/Http/Controller #configuration controller
|
|
├── routes/             #config route
│   
│__ resources/views     #code view
|
|
└── package.json
|
|__ composer.json
```

## Features
in this system any 3 role : admin, operator, user
* Admin and user can create, read, update, delete Maps from table
* Admin and user can add, delete marker from maps
* Admin and user can draw polygon in maps and can download file .geojson from polygon
* Admin and user can export table from maps table to excel
* Admin and user can upload file csv to insert in database
* Admin and operator can create, read, delete account
* Admin and user can create polygon from maps
* Admin and user can create, read, update, detele polygon from table

## Info
if you want to show data from geojson, you can drag and drop your geojson file to https://developers.google.com/maps/documentation/javascript/examples/layer-data-dragndrop
<br>
<br>
open folder '../samplefiles' to get .sql or if you want to use sample file
<br>
> list User
* admin -> admin@gmail.com, password : admin
* operator -> operator.com, password : operator
* user -> user@gmail.com, password : user
