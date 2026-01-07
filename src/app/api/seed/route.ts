import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { MOCK_PRODUCERS, MOCK_PRODUCTS } from "@/lib/mock-data";

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase client not initialized" },
      { status: 500 }
    );
  }

  const producerIdMap: Record<string, string> = {};
  const createdProducers = [];
  const createdProducts = [];

  try {
    // 1. Seed Producers
    for (const producer of MOCK_PRODUCERS) {
      // Remove the old string ID so Supabase generates a new UUID
      const { id: oldId, ...producerData } = producer;

      const { data, error } = await supabase
        .from("producers")
        .insert(producerData)
        .select()
        .single();

      if (error) {
        throw new Error(
          `Failed to insert producer ${producer.name}: ${error.message}`
        );
      }

      if (data) {
        producerIdMap[oldId] = data.id;
        createdProducers.push(data);
      }
    }

    // 2. Seed Products
    for (const product of MOCK_PRODUCTS) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, producer_id: oldProducerId, ...productData } = product;

      const newProducerId = producerIdMap[oldProducerId];

      if (!newProducerId) {
        console.warn(
          `Skipping product ${product.name}: Producer ID ${oldProducerId} not found in map.`
        );
        continue;
      }

      const { data, error } = await supabase
        .from("products")
        .insert({
          ...productData,
          producer_id: newProducerId,
        })
        .select()
        .single();

      if (error) {
        throw new Error(
          `Failed to insert product ${product.name}: ${error.message}`
        );
      }

      if (data) {
        createdProducts.push(data);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully",
      producers: createdProducers.length,
      products: createdProducts.length,
      mapping: producerIdMap,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
