# Get Movie by ID

**Endpoint:**  
`GET /api/movies/id/:id`

## Description

Fetch details of a movie by its unique ID.

## URL Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| `id`      | The unique ID of the movie being fetched. |

## Query Parameters

| Parameter | Description                                                                      |
| --------- | -------------------------------------------------------------------------------- |
| `reviews` | A boolean value (`true` or `false`) indicating whether to include movie reviews. |

## Response

A JSON object containing data about the movie with the associated ID. Example response:

```json
{
  "id": 118073,
  "title": "A Very Brady Sequel (1996)",
  "description": "The Bradys are surprised when a man claiming to be Carol's long lost first husband shows up at their home. Before long, his strange actions cause them to question his motives.",
  "genre": ["Comedy"],
  "score": 5.6,
  "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYWU3YzYxZTgtMmRmOC00ZDE2LWEyMjAtNTQ4NTExNzE0NDYyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
  "num_ratings": 110
}
```

<br>
<br>
<br>

# Get Movie reviews by ID

**Endpoint:**  
`GET /api/movies/id/:id/reviews`

## Description

Fetch the reviews of a movie by its unique ID.

## URL Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| `id`      | The unique ID of the movie being fetched. |

## Response

A JSON array containing data all the reviews of the movie with the associated ID. Example response:

```json
[
  "A touching portrayal of family dynamics, but the ending feels rushed.",
  "A story about second chances that will leave you smiling, though it’s not without its flaws.",
  "An exploration of love that feels raw and authentic.",
  "The pacing was inconsistent, but the characters were engaging.",
  "A beautifully melancholic film that stays with you long after it ends.",
  "An engaging blend of fantasy and reality, though it sometimes gets lost in itself.",
  "A film that’s more about spectacle than substance, but it’s still enjoyable.",
  "A bold attempt at storytelling that occasionally feels forced.",
  "A highly stylized film that emphasizes mood over substance.",
  "A beautifully melancholic film that lingers in your mind.",
  "A film that’s fun to watch, but doesn’t leave much of an impression.",
  "The tone is inconsistent, but the film has a lot of heart."
]
```

<br>
<br>
<br>

# Post Movie rating

**Endpoint:**  
`POST /api/movies/id/:id/rating/add`

## Description

Add a rating to the average rating of the movie of the associated ID.

## URL Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| `id`      | The unique ID of the movie being fetched. |

## Request Body

| Parameter | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `rating`  | An integer (between `1` and `5`) representing the rating given to the movie. |

<br>
<br>
<br>

# Remove Movie rating

**Endpoint:**  
`GET /api/movies/id/:id/rating/remove`

## Description

Remove a rating from the average rating of the movie of the associated ID.

## URL Parameters

| Parameter | Description                               |
| --------- | ----------------------------------------- |
| `id`      | The unique ID of the movie being fetched. |

## Query Parameters

| Parameter | Description                                                                          |
| --------- | ------------------------------------------------------------------------------------ |
| `rating`  | An integer (between `1` and `5`) representing the rating being taken form the movie. |

<br>
<br>
<br>

# Get Random Movies

**Endpoint:**  
`GET /api/movies/random`

## Description

Fetch details of n random movies at a certain offset in the list.

## Query Parameters

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `n`       | An integer representing the number of movies to be returned. |
| `offset`  | The offset into the list of movies.                          |

## Response

A JSON array containing data about the randomly selected movies. Example response:

```json
[
  {
    "id": 118073,
    "title": "A Very Brady Sequel (1996)",
    "description": "The Bradys are surprised when a man claiming to be Carol's long lost first husband shows up at their home. Before long, his strange actions cause them to question his motives.",
    "genre": ["Comedy"],
    "score": 5.6,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BYWU3YzYxZTgtMmRmOC00ZDE2LWEyMjAtNTQ4NTExNzE0NDYyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "num_ratings": 110
  },
  {
    "id": 274558,
    "title": "The Hours (2002)",
    "description": "The story of how the novel \"Mrs. Dalloway\" affects three generations of women, all of whom, in one way or another, have had to deal with suicide in their lives.",
    "genre": ["Drama", "Romance"],
    "score": 7.6,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY4MDQyNjM2OF5BMl5BanBnXkFtZTcwMjQxOTAzMw@@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "num_ratings": 105
  }
]
```

<br>
<br>
<br>

# Get Ranked Movies

**Endpoint:**  
`GET /api/movies/ranked`

## Description

Fetch details of n movies ranked by score at a certain offset in the list.

## Query Parameters

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `n`       | An integer representing the number of movies to be returned. |
| `offset`  | The offset into the list of movies.                          |

## Response

A JSON array containing data about the ranked movies. Example response:

```json
[
  {
    "id": 111161,
    "title": "The Shawshank Redemption (1994)",
    "description": "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
    "genre": ["Crime", "Drama"],
    "score": 9.308536585365854,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "num_ratings": 82
  },
  {
    "id": 108052,
    "title": "Schindler's List (1993)",
    "description": "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    "genre": ["Biography", "Drama", "History"],
    "score": 8.9,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "num_ratings": 97
  }
]
```

<br>
<br>
<br>

# Get Movies by Genre

**Endpoint:**  
`GET /api/movies/genre/:genre`

## Description

Fetch details of n movies filtered by genre at a certain offset in the list.

## URL Parameters

| Parameter | Description                            |
| --------- | -------------------------------------- |
| `genre`   | The genre of the movies being returned |

## Request Body

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `n`       | An integer representing the number of movies to be returned. |
| `offset`  | The offset into the list of movies.                          |

## Response

A JSON array containing data about the genre filtered movies. Example response:

```json
[
  {
    "id": 139668,
    "title": "True Crime (1999)",
    "description": "Can an over-the-hill journalist uncover the evidence that can prove a death row inmate's innocence just hours before his execution?",
    "genre": ["Crime", "Drama", "Mystery"],
    "score": 6.6,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNjgwMjkxNzY4OV5BMl5BanBnXkFtZTcwNzIyNTY1Mw@@._V1_UY268_CR7,0,182,268_AL_.jpg",
    "num_ratings": 138
  },
  {
    "id": 102426,
    "title": "Mediterraneo (1991)",
    "description": "In WW2, an Italian Army unit of misfits occupies an isolated non-strategic Greek island for the duration of the war.",
    "genre": ["Comedy", "Drama", "War"],
    "score": 7.4,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BNTU0MzcwMjI0M15BMl5BanBnXkFtZTcwODAxNTUyMQ@@._V1_UY268_CR4,0,182,268_AL_.jpg",
    "num_ratings": 96
  }
]
```

<br>
<br>
<br>

# Get All Unique Movie Genres

**Endpoint:**  
`GET /api/movies/id/:id`

## Description

Fetch all different possible movie genres.

## Response

A JSON array containing strings representing all possible movie genres. Example response:

```json
[
  "Crime",
  "Drama",
  "Biography",
  "History",
  "Comedy",
  "Romance",
  "Documentary",
  "Adventure",
  "Fantasy",
  "Action",
  "Sci-Fi",
  "Thriller",
  "Music",
  "Mystery",
  "War",
  "Animation",
  "Family",
  "Short",
  "Western",
  "Sport",
  "Musical",
  "Horror"
]
```

<br>
<br>
<br>

# Get Movies by some Search Query

**Endpoint:**  
`GET /api/movies/search`

## Description

Fetch details of n movies at a certain offset in the a of movies ranked by score.

## Query Parameters

| Parameter | Description                                                  |
| --------- | ------------------------------------------------------------ |
| `q`       | The string used to search for movie titles.                  |
| `n`       | An integer representing the number of movies to be returned. |
| `offset`  | The offset into the list of movies.                          |

## Response

A JSON array containing data about the movies with titles similar to the search value. Example response:

```json
[
  {
    "id": 111161,
    "title": "The Shawshank Redemption (1994)",
    "description": "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
    "genre": ["Crime", "Drama"],
    "score": 9.308536585365854,
    "poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_UX182_CR0,0,182,268_AL_.jpg",
    "num_ratings": 82
  }
]
```
