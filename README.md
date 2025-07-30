# 🧮 Inventory Management Tool - Backend APIs

This is a lightweight backend application for managing inventory for a small business. It provides RESTful APIs to authenticate users and manage product inventory with support for product creation, updates, and retrieval.

> ⚠️ **Note:** Basic endpoint implementation and boilerplate code were generated using AI tools for faster development. I personally handled setup, MongoDB configuration, route management, environment setup, and API testing with Postman.

---

## 📦 Features

- ✅ User authentication using JWT
- ✅ Add new product
- ✅ Update product quantity
- ✅ Fetch all products (paginated)
- 🔒 Protected routes using middleware
- 🧪 API tested using Postman & `test_api.py`
- 🖼️ Screenshots of API outputs included (see `images/`)

---

## 🗂 Project Structure

```
FIMONEY/
├── backend/
│   ├── config/                 # MongoDB config
│   ├── controllers/           # Auth & product logic
│   ├── images/                # Postman screenshots
│   ├── middleware/            # JWT auth middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # Express routes
│   ├── test/                  # test_api.py (Python tests)
│   ├── .env                   # Env vars (Mongo, JWT)
│   ├── Dockerfile             # Docker setup
│   ├── server.js              # Entry point
│   └── package*.json          # Node dependencies
│
├── frontend/
│   ├── public/                # index.html
│   ├── src/
│   │   ├── api/               # Axios API calls
│   │   ├── components/        # Navbar, ProductCard
│   │   ├── pages/             # Login, Signup, Products
│   │   ├── styles/            # CSS
│   │   ├── utils/             # PrivateRoute
│   │   └── App.jsx            # Main component
│   ├── Dockerfile             # Frontend Docker config
│   ├── .env                   # Frontend env (API base URL)
│   └── package*.json          # React dependencies
│
├── docker-compose.yml         # Compose file for fullstack run
└── README.md

```

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (jsonwebtoken)
- **Testing**: Postman, Python test script
- **Tools**: dotenv, bcryptjs


##📜 API Documentation
1. 🔐 Login
POST /login
Authenticates user and returns JWT token.

Request:
```
{
  "username": "string",
  "password": "string"
}
```
Response:
```
200 OK with JWT on success

401 Unauthorized on failure
```
2. ➕ Add Product
POST /products
Adds a new product to inventory.

Headers:


Authorization: ` Bearer <JWT_TOKEN>`

Body:
```
{
  "name": "Item Name",
  "type": "Category",
  "sku": "UniqueSKU",
  "image_url": "http://example.com/img.png",
  "description": "Product info",
  "quantity": 20,
  "price": 99.99
}
```
Response:
```
201 Created with product ID
```
3. 🔁 Update Product Quantity
PUT `/products/:id/quantity`

Body:
```
{
  "quantity": 25
}
```
Response:
```
200 OK with updated product info
```

4. 📥 Get All Products
GET `/products?page=1&limit=10`
Fetches paginated product list.

Response:
```
[
  {
    "_id": "...",
    "name": "...",
    "quantity": ...
    ...
  },
  ...
]
```
--- 

## 🚀 Setup Instructions
1. Clone the repository
```
git clone <your-repo-link>
cd FIMONEY
```
2. Install dependencies
```
"bcryptjs": "^3.0.2",
"dotenv": "^17.2.1",
"express": "^5.1.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.16.5",
"nodemon": "^3.1.10"
```
3. Configure Environment Variables
Edit the `.env` file in the `backend/` directory:
```
PORT=3000
MONGO_URI=<your url>
JWT_SECRET=Qw9zZr8uY3bX2cP6fT7dE4vJrKmLqA1oNsRgWzXhUvYbNcRmTg 
```
4. Run the server
```
npm run start
```
The API server will be live at: `http://localhost:3000`

---

## ✅ Testing the API
📫 With Postman
  All endpoints tested and screenshots saved in `images/` folder.
  
🐍 Using test_api.py
  Run the test script after reaching the directory PS ...\fimoney\backend\test>:
    ```
    python test_api.py
    ```

---


## 📌 Notes
  - **MongoDB** is used as the database for quick integration and schema flexibility.
  - Basic backend setup and route scaffolding were generated with the help of `**AI tools**`.
  - Final adjustments, route integration, Postman testing, and MongoDB configuration were done `**manually**`.
  - Project was designed for quick evaluation and feature testing — further improvements are possible.
---

## 📷 Screenshots
Refer to the `images/` folder for screenshots of:
- Successful login
- Product addition
- Quantity update
- Product list response
- Database Validation

