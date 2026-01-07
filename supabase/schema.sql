  -- Create Producers Table
  CREATE TABLE producers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    history TEXT, -- Full story of the producer
    region TEXT NOT NULL, -- e.g., 'Seclantás', 'Cachi'
    image_url TEXT, -- Main card image
    images TEXT[], -- Gallery images
    contact_info TEXT, -- JSON or text
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Create Products Table
  CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    producer_id UUID REFERENCES producers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    unit TEXT NOT NULL, -- e.g., 'kg', 'unit', 'bundle'
    category TEXT NOT NULL, -- e.g., 'Vegetables', 'Crafts'
    image_url TEXT,
    stock INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Create Orders Table
  CREATE TABLE orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT,
    customer_phone TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'delivered', 'cancelled'
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );

  -- Create Order Items Table
  CREATE TABLE order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL
  );

  -- Row Level Security (RLS)
  ALTER TABLE producers ENABLE ROW LEVEL SECURITY;
  ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

  -- Policies
  CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
  CREATE POLICY "Public read producers" ON producers FOR SELECT USING (true);

-- Admin CRUD (Service Role bypasses RLS, but for client-side admin auth:)
-- CREATE POLICY "Admin all producers" ON producers USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin all products" ON products USING (auth.role() = 'authenticated');
-- CREATE POLICY "Admin all orders" ON orders USING (auth.role() = 'authenticated');
