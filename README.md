# Undefined

## Group members listed here:

**Mo Sun, Yuqi Wang, Zechen Feng, Donglin Chen**

-   [Undefined](#undefined)
    -   [Description](#description)
    -   [Get Started](#get-started)
    -   [Core Features](#core-features)
    -   [Technologies](#technologies)
    -   [Database](#database)
        -   [Users Collection](#users-collection)
        -   [Product Collection](#product-collection)
        -   [Quesiton Collection](#quesiton-collection)
        -   [Order Collection](#order-collection)
    -   [API](#api)
        -   [Users](#users)
            -   [GET](#get)
            -   [POST](#post)
            -   [PUT](#put)
            -   [PATCH](#patch)
        -   [Products](#products)
            -   [GET](#get-1)
            -   [POST](#post-1)
            -   [PATCH](#patch-1)
            -   [DELETE](#delete)
        -   [Orders](#orders)
            -   [GET](#get-2)
            -   [POST](#post-2)
            -   [PATCH](#patch-2)
    -   [Other](#other)
        -   [Format](#format)
        -   [Http Status Code](#http-status-code)
        -   [Environments](#Environments)

### Description

We will build an e-commerce web application like amazon. On this website, users can post
their products to sell and buy products from other users.

### Get Started

Execute the following commands to download the source code

```
git clone https://github.com/fengzechen0615/CS-554-Project.git
```

Install dependencies for backend application.

```
cd CS-554-Project
npm install
```

Install dependencies for frontend application.

```
cd client
npm install
```

Make sure you have opened redis-server.

```
redis-server
```

Also, please download the GraphicsMagick locally at the following link and make sure the version is right for your operation system.

> http://www.graphicsmagick.org/

Start the frontend application

```
npm start
```

Start the backend application

```
cd ../
npm start
```

All finished, have fun!

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
    "avatar": "avatar.png",
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
    "productName": "Product",
    "description": "This is product",
    "categoryArr": ["product1", "product2"],
    "imageUrl": "productImg.png",
    "stock": 10,
    "price": 10000,
    "time": "2020-11-23T23:51:33.927Z"
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
    "sellerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "nickName": "nickName",
    "question": "This is a question.",
    "answer": "This is an answer."
}
```

| Name      | Type   | Description                                             |
| :-------- | :----- | :------------------------------------------------------ |
| \_id      | string | A globally unique identifier to represent the question. |
| productId | string | product's id.                                           |
| sellerId  | string | product's id.                                           |
| nickName  | string | The id of the product seller.                           |
| answer    | string | The answer from seller/.                                |

#### Order Collection

```json
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "productId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "sellerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "buyerId": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "address": "1 Castle Point Terrace, Hoboken",
    "orderTime": "2020-11-23T23:51:33.927Z",
    "isCompleted": false,
    "price": 2,
    "dealNumber": 2,
    "productName": "Product",
    "description": "This is a product",
    "imageUrl": "productImg.png"
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

#### Users

##### GET

-   **get('v1/users/users')**  
    _Access_: authenticated, admin
-   **get('v1/users/logout')**  
    _Access_: authenticated

##### POST

-   **post('v1/users/signin')**  
    _Access_: null
    ```json
    {
        "email": "String",
        "password": "String"
    }
    ```
-   **post('v1/users/signup')**  
    _Access_: null
    ```json
    {
        "email": "String",
        "nickname": "String",
        "password": "String"
    }
    ```
-   **post('v1/users/admin/signup')**  
    _Access_: null
    ```json
    {
        "email": "String",
        "nickname": "String",
        "password": "String"
    }
    ```
-   **post('v1/users/password)**  
    _Access_: authenticated
    ```json
    {
        "idToken": "String",
        "newPassword": "String"
    }
    ```
-   **post('v1/users/userinfo')**  
    _Access_: authenticated
    ```json
    {
        "idToken": "String"
    }
    ```

##### PUT

-   **put('v1/users/userstate)**  
    _Access_: authenticated, admin

    ```json
    {
        "userid": "String"
    }
    ```

-   **put('v1/users/userinfo/avatar)**  
    _Access_: authenticated
    ```json
    {
        "avatar": "String"
    }
    ```

##### PATCH

-   **patch('v1/users/userinfo')**  
    _Access_: authenticated
    ```json
    {
        "nickname": "String",
        "phoneNumber": "String",
        "address": "String",
        "zipCode": "String"
    }
    ```

#### Products

##### GET

-   **get('v1/products)**  
    _Access_: authenticated
-   **get('v1/products/:id')**  
    _Access_: authenticated
-   **get('v1/products/user/seller')**  
    _Access_: authenticated

##### POST

-   **post('v1/products/')**  
    _Access_: authenticated
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
    _Access_: authenticated
    ```json
    {
        "productId": "String",
        "nickName": "String",
        "question": "String"
    }
    ```
-   **post('v1/products/answer/:quesitonId')**  
    _Access_: authenticated, seller
    ```json
    {
        "answer": "String"
    }
    ```

##### PATCH

-   **patch('v1/products/:productId')**  
    _Access_: authenticated, seller
    ```json
    {
        "price": "Number"
    }
    ```

##### DELETE

-   **delete('v1/products/quesitons/:questionId)**  
    _Access_: authenticated, seller, admin
-   **delete('v1/products/:productId')**  
    _Access_: authenticated, seller, admin

#### Orders

##### GET

-   **get('v1/orders/buyer')**  
    _Access_: authenticated
-   **get('v1/orders/seller')**  
    _Access_: authenticated

##### POST

-   **post('v1/orders/')**  
    _Access_: authenticated
    ```json
    {
        "productId": "String",
        "sellerId": "String",
        "adress": "String",
        "price": "Number",
        "dealNumber": "Number",
        "productName": "String",
        "discription": "String",
        "imgUrl": "String"
    }
    ```

##### PATCH

-   **patch('v1/orders/:id')**  
    _Access_: authenticated

### Other

#### Format

-   **userName**: 3-16 characters, only contains lower case word, upper case word & number
-   **email**: basic email format
-   **password**:
    1. 8-16 characters
    2. Should only contains lower case word, upper case word & number

#### Http Status Code

| Status Code | Status Code Name      | Description                                                                                                           |
| :---------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 200         | OK                    | Standard response for successful HTTP requests. succeeded.                                                            |
| 400         | Bad Request           | The server cannot or will not process the request due to an apparent client error.                                    |
| 401         | Unauthorized          | the user does not have valid authentication credentials for the target resource.                                      |
| 404         | Not Found             | The requested resource could not be found but may be available in the future.                                         |
| 500         | Internal Server Error | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. |

#### Environments

If you want to run the program, you should install GraphicsMagick locally.  
You can download it at http://www.graphicsmagick.org/  
Please note that the installation package should corresponds to your OS.
