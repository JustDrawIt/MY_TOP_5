# Server API

1. [Schema](#schema)
    1. [Movies](#movies)
    1. [Users](#users)
    1. [Reviews](#reviews)
1. [GET](#get)
    1. [/movies](#get-/movies)
    1. [/movies?movieId=](#get-/movies?movieId=)
    1. [/reviews](#get-/reviews)
    1. [/reviews?movieId=](#get-/reviews?movieId=)
    1. [/reviews?userId=](#get-/reviews?userId=)
    1. [/reviews/:reviewId](#get-/reviews/:reviewId)
1. [POST](#post)
    1. [/movies](#post-/movies)
    1. [/favorite](#post-/favorite)
    1. [/reviews](#post-/reviews)

---
## Schema

### Movies
  - _id: __String__ _Mongo Object ID_
  - movieId: __Number__ _The Movie Database API ID_
  - favorites: __Number__ _Number representing amount of users that have favorited this movie_
  - reviews: __Array\<{ reviewId: String }\>__ _Array of reviewIds representing all the reviews a movie has_
### Users
  - _id: __String__ _Mongo Object ID_
  - googleId: __String__ _The user's google id retrieved from google auth_
  - username: __String__ _The user's nickname_
  - favorites: __Array\<{ movieId: Number }\>__ _Array of movieIds representing all the movies a user has favorited_
  - reviews: __Array\<{ reviewId: String }\>__ _Array of reviewIds representing all the reviews a user has made_
### Reviews
  - _id: __String__ _Mongo Object ID_
  - movieId: __Number__ _The Movie Database API ID represening the movie that was given a review_
  - userId: __String__ _The Mongo Object Id representing the user that gave the review_
  - message: __String__ _The actual text of the review_

---
## GET

* ### GET /movies - _Returns all movies_
  #### Response
  - data: __Array\<[Movie](#movies)\>__
  - error: __Null | String__
  ```json
  {
    "data": [....],
    "error": null
  }
  ```

* ### GET /movies?movieId= - _Returns a specific movie with a movieId_
  #### Query
  ```
  ?movieId=342521
  ```
  #### Response
  - data: __[Movie](#movies)__
  - error: __Null | String__
  ```json
  {
    "data": {...},
    "error": null
  }
  ```

* ### GET /reviews - _Returns all reviews_
  #### Response
  - data: __Array\<[Review](#reviews)\>__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### GET /reviews?movieId= - _Returns all the reviews from a movie with movieId_
  #### Query
  ```
  ?movieId=342521
  ```
  #### Response
  - data: __Array\<[Review](#reviews)\>__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### GET /reviews?userId= - _Returns all the reviews from a usre with userId_
  #### Query
  ```
  ?userId=5b22931560ae4d29aac43a72
  ```
  #### Response
  - data: __Array\<[Review](#reviews)\>__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### GET /reviews/:reviewId - _Returns a specific review with a reviewId_
  #### Response
  - data: __[Review](#reviews)__
  - error: __Null | String__
  ```json
  {
    "data": {...},
    "error": null
  }
  ```

---
## POST

* ### POST /movies - _Creates a new movie_
  #### Body
  - movieId: __Number__
  ```json
  {
    "movieId": 283552
  }
  ```
  #### Response
  - data: __[Movie](#movies)__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### POST /favorite - _Updates a movie's favorite count_
  #### Body
  - movieId: __Number__
  - userId: __String__
  ```json
  {
    "movieId": 283552,
    "userId": "5b22931560ae4d29aac43a72"
  }
  ```
  #### Response
  - data: __[Movie](#movies)__
  - error: __Null | String__
  ```json
  {
    "data": {...},
    "error": null
  }
  ```

* ### POST /reviews - _Creates a movie review_
  #### Body
  - message: __String__
  - movieId: __Number__
  - userId: __String__
  ```json
  {
    "message": "Such a wonderful movie!",
    "movieId": 283552,
    "userId": "5b22931560ae4d29aac43a72"
  }
  ```
  #### Response
  - data: __[Review](#reviews)__
  - error: __Null | String__
  ```json
  {
    "data": {...},
    "error": null
  }
  ```
