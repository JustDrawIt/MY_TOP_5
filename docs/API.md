# Server API

1. [Schema](#schema)
    1. [Movies](#movies)
    1. [Users](#users)
    1. [Reviews](#reviews)
1. [GET](#get)
    1. [/movies](#get-movies)
    1. [/movies?movieId=](#get-moviesmovieid)
    1. [/users/:userId](#get-usersuserid)
    1. [/reviews](#get-reviews)
    1. [/reviews?movieId=](#get-reviewsmovieid)
    1. [/reviews?userId=](#get-reviewsuserid)
    1. [/reviews/:reviewId](#get-reviewsreviewid)
1. [POST](#post)
    1. [/movies](#post-movies)
    1. [/favorite](#post-favorite)
    1. [/reviews](#post-reviews)

---
## Schema

### Movies
  - _id: __String__ Mongo Object ID
  - movieId: __Number__ The Movie Database API ID
  - favorites: __Number__ Number representing amount of users thathave favorited this movie_
  - reviews: __Array\<{ reviewId: String }\>__ Array of reviewIdsrepresenting all the reviews a movie has_
### Users
  - _id: __String__ Mongo Object ID
  - googleId: __String__ The user's google id retrieved from googleauth_
  - username: __String__ The user's nickname
  - favorites: __Array\<{ movieId: Number }\>__ Array of movieIdsrepresenting all the movies a user has favorited_
  - reviews: __Array\<{ reviewId: String }\>__ Array of reviewIdsrepresenting all the reviews a user has made_
### Reviews
  - _id: __String__ Mongo Object ID
  - movieId: __Number__ The Movie Database API ID represening themovie that was given a review_
  - userId: __String__ The Mongo Object Id representing the user thatgave the review_
  - message: __String__ The actual text of the review

---
## GET

* ### GET /movies
  > Returns all movies
  #### Response
  - data: __Array\<[Movie](#movies)\>__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### GET /movies?movieId=
  > Returns a specific movie with movieId
  #### Query
  - movieId: __Number__
  ```http
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

* ### GET /users/:userId
  > Returns a specific user with userId
  ### Request
  - userId: __String__
  ```http
  /users/5b22931560ae4d29aac43a72
  ```
  #### Response
  - data: __[User](#users)__
  - error: __Null | String__
  ```json
  {
    "data": {...},
    "error": null
  }
  ```

* ### GET /reviews
  > Returns all reviews
  #### Response
  - data: __Array\<[Review](#reviews)\>__
  - error: __Null | String__
  ```json
  {
    "data": [...],
    "error": null
  }
  ```

* ### GET /reviews?movieId=
  > Returns all the reviews from a movie with movieId
  #### Query
  - movieId: __Number__
  ```http
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

* ### GET /reviews?userId=
  > Returns all the reviews from a user with userId
  #### Query
  - userId: __Number__
  ```http
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

* ### GET /reviews/:reviewId
  > Returns a specific review with reviewId
  #### Request
  - reviewId: __String__
  ```http
  /reviews/5b22ca535bcb3f3c9089e570
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

---
## POST

* ### POST /movies
  > Creates a new movie
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

* ### POST /favorite
  > Updates a movie's favorite count
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

* ### POST /reviews
  > Creates a movie review
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
