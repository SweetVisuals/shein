# E-Commerce Backend Architecture & Database Schema Overview

This document provides a highly detailed, comprehensive schema and functional overview of the backend services required to power the e-commerce application. It is designed to scale and support a real-time, global retail platform (similar to major fashion retail apps).

## 1. System Architecture Overview
The backend should be structured as a modular monolith or microservices architecture, exposing a RESTful or GraphQL API.
Key domains:
- **Identity & Access Management (IAM):** Users, Auth, Roles.
- **Product Information Management (PIM):** Brands, Categories, Products, Variants.
- **Order Management System (OMS):** Carts, Orders, Fulfillment, Tracking.
- **Payment & Promotion Engine:** Transactions, Wallets, Coupons, Loyalty Points.

## 2. Database Schema (Relational/NoSQL)

### 2.1 Identity & Access Management

**Table: `users`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Unique identifier |
| `email` | VARCHAR | Unique, Not Null | User's email address |
| `password_hash` | VARCHAR | Not Null | Bcrypt/Argon2 hash (if not using OAuth) |
| `first_name` | VARCHAR | | |
| `last_name` | VARCHAR | | |
| `phone_number` | VARCHAR | | User's registered contact number |
| `loyalty_points`| Integer | Default 0 | Points earned for discounts |
| `wallet_balance`| Decimal | Default 0.00| Store credits / Refunds |
| `created_at` | Timestamp | Not Null | |
| `updated_at` | Timestamp | Not Null | |

**Table: `user_addresses`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `user_id` | UUID | Foreign Key (users) | |
| `full_name` | VARCHAR | Not Null | Recipient's name |
| `phone_number` | VARCHAR | Not Null | Recipient's phone |
| `address_line_1`| VARCHAR | Not Null | |
| `address_line_2`| VARCHAR | | |
| `city` | VARCHAR | Not Null | |
| `state_region` | VARCHAR | | |
| `postal_code` | VARCHAR | Not Null | |
| `country` | VARCHAR | Not Null | |
| `is_default` | Boolean | Default False | |

### 2.2 Product Information Management (PIM)

**Table: `sellers` (or Brands)**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `name` | VARCHAR | Not Null, Unique | Brand/Store name |
| `logo_url` | VARCHAR | | Brand logo |
| `rating` | Decimal | | Average rating (0.0 - 5.0) |

**Table: `categories`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `parent_id` | UUID | Foreign Key (cat) | Self-referencing for sub-categories |
| `name` | VARCHAR | Not Null | e.g. "Women's Clothing" |
| `slug` | VARCHAR | Unique, Not Null | URL-friendly identifier |

**Table: `products`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `seller_id` | UUID | Foreign Key | Link to `sellers` |
| `category_id` | UUID | Foreign Key | |
| `title` | VARCHAR | Not Null | |
| `description` | TEXT | | |
| `base_price` | Decimal | Not Null | Base selling price |
| `original_price`| Decimal | | Retail price before discount |
| `currency` | VARCHAR | Default 'GBP' | |
| `main_image` | VARCHAR | Not Null | Primary thumbnail |
| `images` | JSONB | | Array of image URLs |
| `tags` | JSONB | | e.g., ["Almost Sold Out", "Choice"] |
| `sold_count` | Integer | Default 0 | Aggregated sales metric |
| `created_at` | Timestamp | | |
| `updated_at` | Timestamp | | |

**Table: `product_skus` (Stock Keeping Units)**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `product_id` | UUID | Foreign Key | |
| `sku_code` | VARCHAR | Unique, Not Null | e.g. 'sv2403091159949468' |
| `color` | VARCHAR | | e.g. 'Multicolor-White' |
| `size` | VARCHAR | | e.g. 'M', 'US 10' |
| `stock_quantity`| Integer | Default 0 | Inventory level |
| `price_override`| Decimal | | If this variation costs differently |

### 2.3 Order Management System (OMS)

**Table: `shopping_carts`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `user_id` | UUID | Foreign Key | Nullable for guest carts |
| `created_at` | Timestamp | | |
| `updated_at` | Timestamp | | |

**Table: `cart_items`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `cart_id` | UUID | Foreign Key | |
| `product_id` | UUID | Foreign Key | |
| `sku_id` | UUID | Foreign Key | Optional, if specific variant |
| `quantity` | Integer | Not Null | |
| `is_selected` | Boolean | Default True | Selected for checkout |

**Table: `orders`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | Internal ID |
| `order_number` | VARCHAR | Unique, Not Null | e.g. 'GSO10K49500151G' |
| `user_id` | UUID | Foreign Key | |
| `status` | Enum | | PENDING, PAID, DISPATCHED, DELIVERED, CANCELLED |
| `shipping_address_json` | JSONB | Not Null | Snapshot of the address at order time |
| `subtotal` | Decimal | Not Null | Price before shipping/discounts |
| `shipping_fee` | Decimal | Not Null | |
| `discount_total`| Decimal | Not Null | |
| `total_amount` | Decimal | Not Null | The final charged amount |
| `payment_method`| VARCHAR | | e.g. 'Credit Card', 'PayPal' |
| `payment_status`| Enum | | UNPAID, AUTHORIZED, PAID, REFUNDED |
| `payment_date` | Timestamp | | |
| `estimated_delivery_start` | Date | | |
| `estimated_delivery_end` | Date | | |
| `created_at` | Timestamp | | |

**Table: `order_items`**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | Primary Key | |
| `order_id` | UUID | Foreign Key | |
| `product_id` | UUID | Foreign Key | |
| `sku_id` | UUID | Foreign Key | |
| `quantity` | Integer | Not Null | |
| `unit_price` | Decimal | Not Null | Price snapshot |
| `total_price` | Decimal | Not Null | quantity * unit_price |

**Table: `shipments` & `tracking_events`**
* Shipments map an Order to a specific parcel.
* Tracking Events log the journey of a Shipment (e.g. "Dispatched", "In Transit", "Out for Delivery").
* Tracking ID (e.g., 'OJ534343034GB') allows external courier integration.

## 3. Core API Endpoints

- **GET /api/v1/products**: Fetch products with filters (category, price, tags).
- **GET /api/v1/products/{id}**: Fetch product details including SKUs.
- **POST /api/v1/cart/items**: Add item to cart. Checks stock availability.
- **POST /api/v1/checkout/preview**: Calculates totals, applies discounts from wallet/coupons.
- **POST /api/v1/orders**: Converts a Cart into a pending Order. Interacts with Payment Gateway.
- **GET /api/v1/orders**: Fetch user's order history.
- **GET /api/v1/user/profile**: Fetch wallet balance, points, and basic info.

## 4. Key Background Jobs
- **Order Expiration:** Cancel unpaid orders after 30 minutes to release inventory.
- **Loyalty Point Settlement:** Add loyalty points to the user's account 14 days after delivery.
- **Stock Sync:** Sync warehouse stock to `product_skus.stock_quantity`.
