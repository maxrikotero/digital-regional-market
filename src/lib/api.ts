import { supabase } from "./supabase";
import { Producer, Product } from "./mock-data";

export const api = {
  producers: {
    list: async (): Promise<Producer[]> => {
      const { data, error } = await supabase.from("producers").select("*");

      if (error) {
        console.error("Error fetching producers:", error);
        throw error;
      }

      return data as Producer[];
    },

    get: async (id: string): Promise<Producer | null> => {
      const { data, error } = await supabase
        .from("producers")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Producer;
    },

    create: async (producer: Omit<Producer, "id">): Promise<Producer> => {
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
      const { error } = await supabase.from("producers").delete().eq("id", id);
      if (error) throw error;
    },
  },

  products: {
    list: async (
      producerId?: string,
      category?: string
    ): Promise<Product[]> => {
      let query = supabase.from("products").select("*").eq("active", true);

      if (producerId) query = query.eq("producer_id", producerId);
      if (category) query = query.eq("category", category);

      const { data, error } = await query;

      if (error) throw error;
      return data as Product[];
    },

    get: async (id: string): Promise<Product | null> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Product;
    },

    create: async (product: Omit<Product, "id">): Promise<Product> => {
      const { data, error } = await supabase
        .from("products")
        .insert(product)
        .select()
        .single();

      if (error) throw error;
      return data as Product;
    },

    update: async (id: string, product: Partial<Product>): Promise<Product> => {
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
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
  },
};
