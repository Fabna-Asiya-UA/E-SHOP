# 🛒 E-SHOP (E-COMMERCE Web Application (Django + React))

##  Project Overview

This is a full-stack **E-Commerce Web Application** built using **Django REST Framework** for the backend and **React** for the frontend.
It allows users to browse products, add items to cart, place orders, and manage their purchases.

---

##  Features

###  Authentication

* User Login (JWT  authentication)
* Protected Routes
* Logout functionality

###  Products

* View all products
* Product details (name, description, price, image)

###  Cart

* Add items to cart
* Remove items from cart
* View cart items

###  Orders

* Place order from cart
* View order history
* Order status (Pending, Delivered)

---

##  Tech Stack

### 🔹 Frontend

* React.js
* Tailwind CSS
* Axios

### 🔹 Backend

* Django
* Django REST Framework
* JWT Authentication

### 🔹 Database

* SQLite (default)

---

## 📂 Project Structure

```
backend/
│── app/
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│
frontend/
│── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
```

---

##  Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
python -m venv env
env\Scripts\activate  
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  API Endpoints

### Authentication

* `POST /api/token/` → Login (JWT)

### Products

* `GET /app/products/`
* `GET /app/products/<id>/`

### Cart

* `GET /app/cart/`
* `POST /app/cart/add/`
* `DELETE /app/cart/remove/`

### Orders

* `POST /app/order/create/`
* `GET /app/orders/`

---

##  Screens (Optional)

* Home Page
* Cart Page
* Orders Page
* Login Page

---

##  Future Improvements

* Payment Integration (Razorpay / Stripe)
* Product Reviews & Ratings
* Pagination
* Wishlist Feature


---

## ⭐ Conclusion

This project demonstrates a complete **full-stack e-commerce workflow** including authentication, cart management, and order processing using modern web technologies.
