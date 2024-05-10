# Ecommerce Website called FusionFashion

## Live link
```bash
https://fusionfashion.netlify.app/
```
## About

The Ecommerce App is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Rayzor pay.

## Features

- #### User authentication:
  - Sign up, Log in, Log out.

- #### Ecommerce site features:
  - There are two dashboards available: one for sellers and one for buyers. Users can register and log in according to their requirements.
   ##### Buyer
  - Buyers have the capability to search for products, add them to their cart, and remove items from the cart.
  - Payment functionality is integrated using Razorpay for secure transactions.
  - Buyers can track the current status of their ordered products, including processing, shipped, delivered, and canceled orders.
   #### Seller
  - Sellers are empowered to add new products to their inventory and manage existing listings, including updating and removing products.
  - Detailed insights are provided to sellers, including weekly sales data, the number of ongoing orders, canceled orders, and products added to carts.
  - Sellers have visibility into ordered products in a managed format and can identify users who have added their products to their carts.
  - Sellers can modify the status of ordered products, transitioning them from processing to shipped, delivered, or canceled.

## Technologies Used

- Frontend: React.js, Material UI, Redux
- Backend: Node.js, Express.js
- Database: MongoDB
- Payment : Rayzor Pay

## Installation

```bash
https://github.com/Binod-Joshi/collegeERP.git
```

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

```bash
cd ecombackend
npm install
nodemon
```

Create a file called .env in the backend folder. Inside it write this :

```bash
MONGO_URL = mongodb://127.0.0.1/ecommerce
```
Instead of this link write your database link.

Terminal 2: Setting Up Frontend

```bash
cd ecomfrontend
npm install
npm start
```
Now, navigate to localhost:3000 in your browser. The Backend API will be running at localhost:5000.

## Deployment
- Render - server side
- Netlify - client side
