# Undefined

## Group members listed here:

**Mo Sun, Yuqi Wang, Zechen Feng, Donglin Chen**

-   [Undefined](#undefined)
    -   [Description](#description)
    -   [Core Features](#core-features)
    -   [Technologies](#technologies)
    -   [Database](#database)
        -   [Users Collection](#users-collection)
        -   [Product Collection](#product-collection)
        -   [Quesiton Collection](#quesiton-collection)
        -   [Order Collection](#order-collection)
    -   [API](#api)
        -   [Sign in/up Page](#sign-in-up-page)
        -   [Main Page](#main-page)
        -   [Product Page](#product-page)
        -   [User Information Page](#user-information-page)
    -   [Other](#other)
        -   [Http Status Code](#http-status-code)

### Description

We will build an e-commerce web application like amazon. On this website, users can post
their products to sell and buy products from other users.

### Core Features

1. Register and login - Use firebase authentication to allow users to register and login via
   email/password, Google. - There will be two types of users: ordinary users and admin. Ordinary
   users can buy and sell products. Admins can delete products, seal
   ordinary users’ accounts, and users’ comments.
2. Main Page - Show the latest released products. - Provide with search, sort, and categories so that users can find the product
   they want.
3. Product Page
    - Including product details, seller information, FAQ section, etc.
    - Buyers can buy this product or ask questions about this product.
    - Sellers can delete or change the price. Sellers can also reply to buyers' questions on this page.
4. User info Page
    - info page
        - Display basic user information.
        - Users can edit their information such as address and phone number.
    - Selling
        - Users can view and edit their own selling items.
        - Users can check his sold items.
    - Purchase history
        - Users can check the items they have purchased

### Technologies

-   React
    -   We will use React as our single-page web application framework.
    -   We will create components for the elements that we include on our pages.
-   Redis
    -   Redis will be used to cache data and HTML to improve user experience.
-   Redux
    -   We will use redux to do global variables management.
-   Sagas
    -   We will use redux-saga to make side effects like asynchronous data fetching easier and more efficient.
-   React Bootstrap
    -   React Bootstrap will make our website prettier.
-   Firebase
    -   Firebase Authentication is a framework that allows authentication via email/password credentials or other identity providers.
    -   We will be utilizing the Firebase authentication system to authorize users for the site. This will include email/password, Google, and Facebook login.
-   ImageMagick
    -   ImageMagick is a library that is used for manipulating images.
    -   We will use ImageMagick to allow users to edit the profile photos that they upload to the site.

### Database

#### Users Collection

```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "userName": "JJ Doeny",
    "email": "JDoe@gmail.com",
    "phoneNumber": "5513008708",
    "address": "1 Castle Point Terrace, Hoboken",
    "zipCode": "07030",
    "avatar": "",
    "isAdmin": false,
    "state": true
}
```

| Name        | Type    | Description                                         |
| :---------- | :------ | :-------------------------------------------------- |
| \_id        | string  | A globally unique identifier to represent the user. |
| userName    | string  | User name.                                          |
| email       | string  | User email address.                                 |
| phoneNumber | string  | User phone number.                                  |
| address     | string  | User address.                                       |
| zipCode     | string  | User address zip code.                              |
| avatar      | string  | User avatar.                                        |
| isAdmin     | boolean | User is noraml user or admin user.                  |
| state       | boolean | User account state.                                 |

#### Product Collection

```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sellerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "productName": "",
    "description": "",
    "categoryArr": ["", ""],
    "imageUrl": "",
    "stock": 10,
    "price": 10000,
    "time": "new Date()"
}
```

| Name        | Type   | Description                                            |
| :---------- | :----- | :----------------------------------------------------- |
| \_id        | string | A globally unique identifier to represent the product. |
| sellerId    | string | seller's id.                                           |
| productName | string | The name/title of product.                             |
| description | string | a text describes the product in detail.                |
| categoryArr | Array  | An array of the catagories of the product.             |
| imageUrl    | string | The image of the product                               |
| stock       | number | The number of the product in stock.                    |
| price       | number | The price of each product.                             |
| time        | Date   | The time the product is posted.                        |

#### Quesiton Collection

```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "productId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "nickName": "",
    "question": "",
    "answer": ""
}
```

| Name      | Type   | Description                                             |
| :-------- | :----- | :------------------------------------------------------ |
| \_id      | string | A globally unique identifier to represent the question. |
| productId | string | product's id.                                           |
| nickName  | string | The nickname of the Questioner.                         |
| answer    | string | The answer from seller/.                                |

#### Order Collection

```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "productId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sellerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "buyerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "address": "",
    "orderTime": "new Date()",
    "isCompleted": false,
    "price": 2,
    "dealNumber": 2,
    "productName": "",
    "description": "",
    "imageUrl": ""
}
```

| Name        | Type    | Description                                          |
| :---------- | :------ | :--------------------------------------------------- |
| \_id        | string  | A globally unique identifier to represent the order. |
| productId   | string  | product's id.                                        |
| buyerId     | string  | buyer's id.                                          |
| sellerId    | string  | seller's id.                                         |
| adress      | string  | buyer's adress                                       |
| orderTime   | Date    | The time the product is buyed.                       |
| isCompleted | boolean | if buyer recieved products,the true; else false.     |
| price       | number  | The price of each product.                           |
| dealNumber  | number  | The number of the product buyer bought.              |
| productName | string  | The name/title of product.                           |
| description | string  | a text describes the product in detail.              |
| imageUrl    | string  | The image of the product                             |

### API

#### Sign in/up Page

-   **post('v1/users/signin')**
    ```json
    {
        "email": "String",
        "password": "String"
    }
    ```
-   **post('v1/users/signup')**
    ```json
    {
        "email": "String",
        "nickname": "String",
        "password": "String"
    }
    ```

#### Main Page

-   **get('v1/products)**

#### Product Page

-   **get('v1/products/:id')**
-   **get('v1/products/user/:id')**
-   **post('v1/products/')**
    ```json
    {
        "sellerId": "String",
        "productName": "String",
        "description": "String",
        "categoryArr": "Array",
        "imageUrl": "String",
        "stock": "Number",
        "price": "Number"
    }
    ```
-   **post('v1/products/questions')**
    ```json
    {
        "productId": "String",
        "nickName": "String",
        "question": "String"
    }
    ```
-   **post('v1/products/answer')**
    ```json
    {
        "productId": "String",
        "answer": "String"
    }
    ```
-   **patch('v1/products/:id')**
    ```json
    {
        "price": "Number"
    }
    ```
-   **delete('v1/products/quesitons/:id)**
-   **delete('v1/products/:id')**

-   **get('v1/orders/buyer/:id')**
-   **get('v1/orders/seller/:id')**
-   **post('v1/orders/')**
    ```json
    {
        "productId": "String",
        "sellerId": "String",
        "buyerId": "String",
        "adress": "String",
        "price": "Number",
        "dealNumber": "Number",
        "productName": "String",
        "discription": "String",
        "imgUrl": "String"
    }
    ```
-   **patch('v1/orders/:id')**

#### User Information Page

-   **get('v1/user/:id')**
-   **get('v1/user/:id/orders')**
-   **get('v1/user/:id/products')**
-   **patch('v1/user/:id')**
    ```json
    {
        "userName": "String",
        "email": "String",
        "phoneNumber": "String",
        "address": "String",
        "zipCode": "String",
        "password": "String",
        "avatar": "String"
    }
    ```
-   **post('v1/user/password)**
    ```json
    {
        "idToken": "String",
        "newPassword": "String"
    }
    ```
-   **post('v1/user/products')**
    ```json
    {
        "seller": "String",
        "name": "String",
        "description": "String",
        "category": ["String", "String"],
        "imageUrl": "String",
        "stock": "Number",
        "price": "Number"
    }
    ```
-   **delete('v1/user/products/:id')**

### Other

#### Http Status Code

| Status Code | Status Code Name      | Description                                                                                                           |
| :---------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 200         | OK                    | Standard response for successful HTTP requests. succeeded.                                                            |
| 400         | Bad Request           | The server cannot or will not process the request due to an apparent client error.                                    |
| 401         | Unauthorized          | the user does not have valid authentication credentials for the target resource.                                      |
| 404         | Not Found             | The requested resource could not be found but may be available in the future.                                         |
| 500         | Internal Server Error | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. |

#### Authority
