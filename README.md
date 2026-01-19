# 🛒 MERN Stack E-Commerce & Stripe Integration API

A professional-grade RESTful backend developed for the **Backend Developer Technical Assignment**. This project demonstrates secure user authentication, product management, and a robust payment system using **Stripe Checkout** and **Webhooks**.

---

## 🌐 Live API Access

* **API Base URL:** `https://advance-it-job-task.vercel.app`
* **Webhook Endpoint:** `https://advance-it-job-task.vercel.app/api/payments/webhook`
* **Postman Collection:** Located in the `/docs/collection.json` folder within the repository.

---

## 🚀 Key Features

* **JWT Authentication:** Secure user registration, login, and profile access using **JSON Web Tokens**.
* **MERN Stack Architecture:** Built with **Express.js**, **MongoDB Atlas**, and **Node.js** for high performance.
* **Stripe Integration:** Fully implemented **Stripe Checkout Session** flow for secure payments.
* **Webhook Security:** Verified signature handling to update order status to **isPaid: true** and **status: Completed** upon successful payment.
* **Centralized Error Handling:** Custom middleware for consistent **404** and **500** error responses.

---

## 💳 Payment Flow Architecture

1.  **Initiate Order:** The user hits `/api/orders` with a `product_id`. The system generates a **Stripe Checkout Session**.
2.  **Metadata Tracking:** The unique **orderId** is attached to the Stripe session's **metadata** to ensure accurate tracking.
3.  **Payment Redirect:** The API returns a **stripeUrl**. The user completes the payment on Stripe's secure hosted page.
4.  **Asynchronous Webhook:** Upon success, Stripe sends a **checkout.session.completed** event to our webhook route.
5.  **Database Update:** The backend verifies the signature, extracts the **orderId**, and updates the document to **isPaid: true**.

---

## 📂 Project Structure

/src
  /config      # DB and Stripe initialization
  /controllers # Logic for Auth, Product, Order, and Payment
  /middleware  # JWT verification and Error handlers
  /models      # Mongoose Schemas (User, Product, Order)
  /routes      # API Endpoints mapping
app.js         # Express App & Serverless export for Vercel
vercel.json    # Deployment configuration
.env.example   # Template for environment variables

---

## ⚙️ Installation & Local Setup

1. **Clone and Install**
git clone <your-repo-link>
npm install

2. **Environment Setup**
Rename .env.example to .env and fill in your credentials:

MONGO_URI: Your MongoDB connection string.

JWT_SECRET: Your private secret key for tokens.

STRIPE_SECRET_KEY: Your Stripe secret key (sk_test_...).

STRIPE_WEBHOOK_SECRET: Your local or live webhook secret.

3. **Stripe CLI (For Local Webhook Testing)**
stripe listen --forward-to localhost:5000/api/payments/webhook

4. **Start Development Server**
npm run dev

---

## 🧪 Testing with Postman
**Import:** Load the collection.json file into Postman.

**Variables:** The collection uses a baseUrl variable. Change this to your live Vercel URL or http://localhost:5000.

**Auth Automation:** The Login request contains a script that automatically saves the jwt_token to your collection variables.

**Inherited Auth:** Ensure all protected requests (Create Product, Create Order) are set to "Inherit auth from parent".