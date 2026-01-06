"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const unit = formData.get("unit") as string;
  const category = formData.get("category") as string;
  const image_url = formData.get("image_url") as string;
  const stock = parseInt(formData.get("stock") as string);
  const producer_id = formData.get("producer_id") as string;
  const active = formData.get("active") === "on";

  await api.products.create({
    name,
    description,
    price,
    unit,
    category,
    image_url,
    stock,
    producer_id,
    active,
  });

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const unit = formData.get("unit") as string;
  const category = formData.get("category") as string;
  const image_url = formData.get("image_url") as string;
  const stock = parseInt(formData.get("stock") as string);
  const producer_id = formData.get("producer_id") as string;
  const active = formData.get("active") === "on";

  await api.products.update(id, {
    name,
    description,
    price,
    unit,
    category,
    image_url,
    stock,
    producer_id,
    active,
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  await api.products.delete(id);
  revalidatePath("/admin/products");
}
