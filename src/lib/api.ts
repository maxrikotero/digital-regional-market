import { supabase } from "./supabase";
import { MOCK_PRODUCERS, MOCK_PRODUCTS, Producer, Product } from "./mock-data";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export const api = {
  producers: {
    list: async (): Promise<Producer[]> => {
      if (USE_MOCK_DATA || !supabase) {
        console.log("Using Mock Data for Producers");
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_PRODUCERS;
      }

      const { data, error } = await supabase.from("producers").select("*");

      if (error) {
        console.error("Error fetching producers:", error);
        throw error;
      }

      return data as Producer[];
    },

    get: async (id: string): Promise<Producer | null> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_PRODUCERS.find((p) => p.id === id) || null;
      }

      const { data, error } = await supabase
        .from("producers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Producer;
    },

    create: async (producer: Omit<Producer, "id">): Promise<Producer> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newProducer = { ...producer, id: Math.random().toString() };
        MOCK_PRODUCERS.push(newProducer);
        return newProducer;
      }

      const { data, error } = await supabase
        .from("producers")
        .insert(producer)
        .select()
        .single();

      if (error) throw error;
      return data as Producer;
    },

    update: async (
      id: string,
      producer: Partial<Producer>
    ): Promise<Producer> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = MOCK_PRODUCERS.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Producer not found");
        MOCK_PRODUCERS[index] = { ...MOCK_PRODUCERS[index], ...producer };
        return MOCK_PRODUCERS[index];
      }

      const { data, error } = await supabase
        .from("producers")
        .update(producer)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Producer;
    },

    delete: async (id: string): Promise<void> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = MOCK_PRODUCERS.findIndex((p) => p.id === id);
        if (index !== -1) MOCK_PRODUCERS.splice(index, 1);
        return;
      }

      const { error } = await supabase.from("producers").delete().eq("id", id);
      if (error) throw error;
    },
  },

  products: {
    list: async (
      producerId?: string,
      category?: string
    ): Promise<Product[]> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        let filtered = [...MOCK_PRODUCTS];
        if (producerId)
          filtered = filtered.filter((p) => p.producer_id === producerId);
        if (category)
          filtered = filtered.filter((p) => p.category === category);
        return filtered;
      }

      let query = supabase.from("products").select("*").eq("active", true);

      if (producerId) query = query.eq("producer_id", producerId);
      if (category) query = query.eq("category", category);

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },

    get: async (id: string): Promise<Product | null> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        return MOCK_PRODUCTS.find((p) => p.id === id) || null;
      }

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },

    create: async (product: Omit<Product, "id">): Promise<Product> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const newProduct = { ...product, id: Math.random().toString() };
        MOCK_PRODUCTS.push(newProduct);
        return newProduct;
      }

      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, product: Partial<Product>): Promise<Product> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
        if (index === -1) throw new Error("Product not found");
        MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...product };
        return MOCK_PRODUCTS[index];
      }

      const { data, error } = await supabase
        .from("products")
        .update(product)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    delete: async (id: string): Promise<void> => {
      if (USE_MOCK_DATA || !supabase) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
        if (index !== -1) MOCK_PRODUCTS.splice(index, 1);
        return;
      }

      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
  },
};
