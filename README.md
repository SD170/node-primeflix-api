# nodeJs-primeflix-api

## Description
It's an api made using Node.js, express.js for the backend server and routes Mongoose as the DB.
It consists of user-register, authentication, posting and a payment gateway with all the payment logs saved in DB.
##Endpoints
### Good URL examples
* Register:
    * POST /api/user/register
* Login:
    * POST /api/user/login
* To create a post with "title, content":
    * POST /api/posts/
* To retrive all posts:
    * GET /api/posts/
* All articles in this magazine in XML format:
    * GET /api/v1/magazines/1234/articles.xml
* Specify optional fields in a comma separated list:
    * GET /api/v1/magazines/1234.json?fields=title,subtitle,date
* Add a new article to a particular magazine:
    * POST /api/v1/magazines/1234/articles



## Responses
### Good examples

* POST /api/user/register
    - Data expected from frontend
    `"username"`: "example-username",
    `"email"`: "example-email",
    `"password"`:"example-password"

    - Response from backend
    `"_id"`: "example-id",
    `"username"`: "example-username",


* POST /api/user/login
    - Data expected from frontend
    `"email"`: "example-email",
    `"password"`:"example-password"

    - Response from backend
    `"message"`: "hi,example-username. You're logged in.",

 * POST /api/posts/
    - Data expected from frontend
    `"title"`: "example-title",
    `"content"`: "exmaple-content"

    - Response from backend
    `"_id"`: "Post id",
    `"authorId"`: "Author id",
    `"title"`: "example-title",
    `"content"`: "exmaple-content",
    `"createdAt"`: "2020-10-02T18:23:15.606Z"

 * GET /api/posts/
    - Response from backend
    [
        {
        `"_id"`: "Post id",
            `"authorId"`: "Author id",
            `"title"`: "example-title",
            `"content"`: "exmaple-content",
            `"createdAt"`: "2020-10-02T18:23:15.606Z"
        },
        {
        `"_id"`: "Post id",
            `"authorId"`: "Author id",
            `"title"`: "example-title",
            `"content"`: "exmaple-content",
            `"createdAt"`: "2020-10-02T18:23:15.606Z"
        }
    ]
