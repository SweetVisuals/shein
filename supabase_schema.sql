-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2.1 Identity & Access Management
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR UNIQUE NOT NULL,
    password_hash VARCHAR,
    first_name VARCHAR,
    last_name VARCHAR,
    phone_number VARCHAR,
    loyalty_points INTEGER DEFAULT 0,
    wallet_balance DECIMAL(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR NOT NULL,
    phone_number VARCHAR NOT NULL,
    address_line_1 VARCHAR NOT NULL,
    address_line_2 VARCHAR,
    city VARCHAR NOT NULL,
    state_region VARCHAR,
    postal_code VARCHAR NOT NULL,
    country VARCHAR NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2.2 Product Information Management (PIM)
CREATE TABLE IF NOT EXISTS sellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR UNIQUE NOT NULL,
    logo_url VARCHAR,
    rating DECIMAL(3, 2) CHECK (rating >= 0 AND rating <= 5)
);

CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES categories(id),
    name VARCHAR NOT NULL,
    slug VARCHAR UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID REFERENCES sellers(id),
    category_id UUID REFERENCES categories(id),
    title VARCHAR NOT NULL,
    description TEXT,
    base_price DECIMAL(12, 2) NOT NULL,
    original_price DECIMAL(12, 2),
    currency VARCHAR DEFAULT 'GBP',
    main_image VARCHAR NOT NULL,
    images JSONB,
    tags JSONB,
    sold_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_skus (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    sku_code VARCHAR UNIQUE NOT NULL,
    color VARCHAR,
    size VARCHAR,
    stock_quantity INTEGER DEFAULT 0,
    price_override DECIMAL(12, 2)
);

-- 2.3 Order Management System (OMS)
CREATE TABLE IF NOT EXISTS shopping_carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES shopping_carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    sku_id UUID REFERENCES product_skus(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    is_selected BOOLEAN DEFAULT TRUE
);

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'DISPATCHED', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM ('UNPAID', 'AUTHORIZED', 'PAID', 'REFUNDED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    status order_status DEFAULT 'PENDING',
    shipping_address_json JSONB NOT NULL,
    subtotal DECIMAL(12, 2) NOT NULL,
    shipping_fee DECIMAL(12, 2) NOT NULL,
    discount_total DECIMAL(12, 2) NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    payment_method VARCHAR,
    payment_status payment_status DEFAULT 'UNPAID',
    payment_date TIMESTAMP WITH TIME ZONE,
    estimated_delivery_start DATE,
    estimated_delivery_end DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    sku_id UUID REFERENCES product_skus(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(12, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS shipments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    tracking_number VARCHAR UNIQUE NOT NULL,
    carrier VARCHAR,
    status VARCHAR DEFAULT 'PREPARING',
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS tracking_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shipment_id UUID REFERENCES shipments(id) ON DELETE CASCADE,
    status VARCHAR NOT NULL,
    location VARCHAR,
    description TEXT,
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS Policies (Basic)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read for products and categories
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Sellers" ON sellers FOR SELECT USING (true);
CREATE POLICY "Public Read Skus" ON product_skus FOR SELECT USING (true);

-- Functions for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON shopping_carts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
