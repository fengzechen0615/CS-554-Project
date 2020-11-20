# Undefined

## Group members listed here:

**Mo Sun, Yuqi Wang, Zechen Feng, Donglin Chen**

-   [Undefined](#undefined)

    -   [Description](#description)
    -   [Core features](#core-features)
    -   [Technologies:](#technologies)

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

### Other

#### Http Status Code

| Status Code | Status Code Name      | Description                                                                                                           |
| :---------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| 200         | OK                    | Standard response for successful HTTP requests. succeeded.                                                            |
| 400         | Bad Request           | The server cannot or will not process the request due to an apparent client error.                                    |
| 401         | Unauthorized          | the user does not have valid authentication credentials for the target resource.                                      |
| 404         | Not Found             | The requested resource could not be found but may be available in the future.                                         |
| 500         | Internal Server Error | A generic error message, given when an unexpected condition was encountered and no more specific message is suitable. |
