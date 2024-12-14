
# Multi-Tenant E-Commerce API Documentation

## Project Overview

This API allows vendors to register, manage products, and handle orders in a multi-tenant e-commerce platform. Built with Node.js, Express.js, and MongoDB, the system includes authentication, role-based access control, and pagination for efficient operations.9

### Key Features:

#### Vendor Management
Register and log in with secure JWT authentication.
Manage personal products and view associated orders.
#### Product Management
Add, update, delete, and list products with pagination support.
Products are tied to individual vendors.
#### Order Management
Vendors can view orders related to their products.
Mark orders as "shipped" for status updates.
#### Security
JWT authentication protects all routes.
Vendors can only access their own data (authorization enforced).
#### Error Handling
Validation of input using Joi or express-validator.
Graceful error responses with appropriate HTTP status codes.

## All API :-
```
1)Vondors Registertion:-    https://ovs-innovation-pvt-lid.onrender.com/api/vendors/register
2)Vondors otp:-             https://ovs-innovation-pvt-lid.onrender.com/api/vendors/verify
3)Vondors login:-           https://ovs-innovation-pvt-lid.onrender.com/api/vendors/login
4)products add:-            https://ovs-innovation-pvt-lid.onrender.com/api/products/add
5)products delete:-         https://ovs-innovation-pvt-lid.onrender.com/api/products/deleteProduct/675ca1ae22d8826fb6fbb42c
6)get all products:-        https://ovs-innovation-pvt-lid.onrender.com/api/products/getAll
7)get id by products        https://ovs-innovation-pvt-lid.onrender.com/api/products/getAll/675ca079497ca528e1348d92
8)Update products:-         https://ovs-innovation-pvt-lid.onrender.com/api/products/updateProduct/675ca079497ca528e1348d92
9)oders :-                  https://ovs-innovation-pvt-lid.onrender.com/api/orders/Orders
10)oders Id:-               https://ovs-innovation-pvt-lid.onrender.com/api/orders/Orders/675ca079497ca528e1348d92
```

## Instructions to Run the Project Locally

### Prerequisites

1) Node.js installed on your system.

3) npm (Node Package Manager) for installing dependencies.

### staps
Clone the Repository
```bash
  https://github.com/Aayushajs/Ovs-Innovation-Pvt-Lid
   cd ./backend
```
Install Dependencies
```bash
npm install
```
 
Run the Server
```
npm start
```
The server will start on the specified port (default is 7000) and connect to the MongoDB database

### Access the API
Use a web browser to visit http://localhost:7000 and explore the application’s features.




## Technologies Used
## Schema Design

```
Field	        Type	    Description
name	       String	    Vendor's name.
email	       String	    Unique, required for login.
password	   Hashed	    Securely stored password.
createdAt 	   Date	        Default: current timestamp.
```
## Product Schema
```
Field	     Type	      Description
name	     String	      Name of the product.
price	     Number	      Price of the product.
stock	     Number	      Available stock.
vendor	     Reference	  Links to the Vendor schema.
createdAt	 Date	      Default: current timestamp.
```
## Order Schema
```
Field	      Type	      Description
product	      Reference	  Links to the Product schema.
quantity      Number	  Quantity ordered.
status	      Enum	      Values: pending, shipped.
createdAt     Date	      Default: current timestamp.
```

## Support
For any questions or suggestions, please contact aayushj004@gmail.com.


## file structure
```
    multi-tenant-ecommerce-api/
│
├── src/
│   ├ 
│   │
│   │    
│   │
│   ├── controllers/         # Controller logic for API routes
│   │   ├── vendorController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   │
│   ├── middleware/          # Middleware for authentication and validation
│   │   ├── authMiddleware.js  # JWT authentication
│   │   
│   │   
│   │
│   ├── models/              # Mongoose schemas and models
│   │   ├── Vendor.js
│   │   ├── Product.js
│   │   └── Order.js
│   │
│   ├── routes/              # Route definitions
│   │   ├── vendorRoutes.js
│   │   ├── productRoutes.js
│   │   └── orderRoutes.js
│   │
│   ├               
│   │          
│   │        
│   │            
│   │
│   ├               # Express app setup
│   ├── index.js            # Entry point for starting the server
│   └── postman/             # Postman collection for API testing
│       └── collection.json  # Postman API requests
│
├── .env                     # Environment variables (not included in version control)
├── .gitignore               # Ignored files/folders
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Lockfile for npm dependencies
└── README.md                # Project documentation


```
##  API Endpoints

#### Authentication

```http
  POST /api/vendors/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `Vendor Name` | **Request Body** |
| `email`  |      `vendor@example.com` | **Request Body**   |
|`password`|`string`|**Required**|


#### Login a Vendor

```http
  POST /api/vendors/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required** |
|`password`|`string`|**Required**|

#### Security
JWT Authentication: All routes except /api/vendors/register and /api/vendors/login are protected. Include the token in the Authorization header and cookies:
```
Authorization: Bearer <jwt-token>
```
Authorization: Vendors can only access their own resources (products and orders).


## Setup Instructions
- Clone the repository:
```
git clone <repository-url>

```
- Install dependencies:

```
npm install

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>

```
## Start the server
```
npm start

```
## Features

- Implement rate-limiting to prevent abuse
- Add API documentation using Swagger.
- Write unit and integration tests for all routes.
- Deploy the API to Heroku or Render.

## Testing
- Use the provided Postman collection or cURL commands to test the API endpoints

