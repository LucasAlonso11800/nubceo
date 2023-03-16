## How to run the project
Install dependencies with "npm install" on terminal
On terminal run "npm run start"
Proyect will run on http://localhost:5000

- The proyect needs a .env file on the root folder with the following properties
- MONGO_URI: Database URI
- REFRESH_TOKEN_SECRET: Secret for generating and validating refresh jwt token
- ACCESS_TOKEN_SECRET: Secret for generating and validating access jwt token
------------------------------

## Entities

### Movie

{  
    "\_id": ObjectId,  
    "title": string,  
    "genre": string,  
    "director": ObjectId, // One director - Many movies  
    "actors": Actor[], // Many to many  
    "year": string  
}

### TVShow

{  
    "\_id": ObjectId,  
    "title": string,  
    "genre": string,  
    "director": ObjectId, // One director - Many shows  
    "actors": Actor[], // Many to Many  
    "year": string,  
    "seasons": number  
}

### Episode

{  
    "\_id": ObjectId,  
    "title": string,  
    "tvShow": ObjectId, // One show - Many episodes  
    "director": ObjectId, // One director - Many episodes  
    "actors": Actor[], // Many to many  
    "season": number,  
    "length": string (MM:SS),  
    "date": date  
}

### Actor

{  
    "\_id": ObjectId,  
    "firstName": string,  
    "lastName": string,  
    "birthDate": date,  
    "gender": string  
}

### Director

{  
    "\_id": ObjectId,  
    "firstName": string,  
    "lastName": string,  
    "birthDate": date  
},

---

## Endpoints

## AUTH

### POST - /auth/login

- Description: Generates jwt auth tokens
- Request: {
    "username": string
}
- Response: {
    "accessToken": string,
    "refreshToken": string
}

### POST - /auth/refresh

- Description: Refresh jwt access token
- Request: {
    "username": string,
    "refreshToken" string
}
- Response: {
    "accessToken": string
}

---

## MOVIES

### GET - /movie

- Description: Fetches movies, filtering and sorting
- Headers: {
    "authorization": "Bearer accessToken"
}
- Query params: {
    actors: string // Separated by ;
    director: string
    genre: string
    year: string
    title: string
    sort: string
    asc: Y / N // If null defaults to N
}
- Example
http://localhost:5000/movie?genre=Comedy&title=Wolf&actors=6411f8fb5adba37e1752c0aa;6411f9385adba37e1752c0ab&sort=year&asc=Y

- Response: {
  "\_id": string
  "title": string
  "genre": string
  "director": Director
  "actors": Actor[]
  "year": string
  }[]

- Example
  [{
    "\_id": "6411f5a25adba37e1752c0a8",
    "title": "The Wolf of Wall Street",
    "genre": "Comedy",
    "director": {
        "\_id": "6411f61a5adba37e1752c0a9",
        "firstName": "Martin",
        "lastName": "Scorsese",
        "birthDate": "1942-11-17T00:00:00.000Z"
    },
    "actors": [
        {
            "_id": "6411f9385adba37e1752c0ab",
            "firstName": "Margot",
            "lastName": "Robbie",
            "birthDate": "1990-07-02T00:00:00.000Z",
            "gender": "F"
        },
        {
            "_id": "6411f8fb5adba37e1752c0aa",
            "firstName": "Leonardo",
            "lastName": "Di Caprio",
            "birthDate": "1974-11-11T00:00:00.000Z",
            "gender": "M"
        }
    ],
    "year": "2014"
}]

## Episodes

### GET /episode/:id
- Descripcion: Fetches a specific tv episode with its director and show
- Headers: {
    "authorization": "Bearer accessToken"
}
- Request example: http://localhost:5000/episode/6411dc2cecec3371d9f7f533
- Response: {
    "_id": ObjectId
    "title": string
    "season": number
    "length": string (MM:SS)
    "date": date
    "_v": number
    "director": Director
    "tvShow": TVShow
}
- Example: {
    "_id": "6411dc2cecec3371d9f7f533",
    "title": "Winter is Coming",
    "season": 1,
    "length": "45:00",
    "date": "2012-08-01T00:00:00.000Z",
    "__v": 0,
    "director": {
        "_id": "6411dbe95adba37e1752c0a5",
        "firstName": "Guillermo",
        "lastName": "Del Toro",
        "birthDate": "1964-10-09T00:00:00.000Z"
    },
    "tvShow": {
        "actors": [],
        "_id": "6411d1815adba37e1752c0a4",
        "title": "Game of Thrones"
    }
}

### POST /episode
- Description: Add a new episode
- Headers: {
    "authorization": "Bearer accessToken"
}
- Request: {
    "title": string
    "tvShowId": string
    "season": number
    "length": string
    "date": string (YYYY-MM-DD)
    "directorId": string   
}
- Example {
    "title": "Blackwater",
    "tvShowId": "6411d1815adba37e1752c0a4",
    "season": 2,
    "length": "50:12",
    "date": "2014-09-10",
    "directorId": "6411f3c45adba37e1752c0a7"
}

## Error response
{ "message": string }
