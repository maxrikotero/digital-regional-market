"use server";

import { api } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProducer(formData: FormData) {
  const name = formData.get("name") as string;
  const region = formData.get("region") as string;
  const description = formData.get("description") as string;
  const history = formData.get("history") as string;
  const contact_info = formData.get("contact_info") as string;
  const image_url = formData.get("image_url") as string;
  // Handling images array from form might be tricky with simple FormData,
  // for now we'll assume comma separated or just empty for MVP/Mock
  const imagesStr = formData.get("images") as string;
  const images = imagesStr ? imagesStr.split(",").map((s) => s.trim()) : [];

  await api.producers.create({
    name,
    region,
    description,
    history,
    contact_info,
    image_url,
    images,
  });

  revalidatePath("/admin/producers");
  redirect("/admin/producers");
}

export async function updateProducer(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const region = formData.get("region") as string;
  const description = formData.get("description") as string;
  const history = formData.get("history") as string;
  const contact_info = formData.get("contact_info") as string;
  const image_url = formData.get("image_url") as string;
  const imagesStr = formData.get("images") as string;
  const images = imagesStr ? imagesStr.split(",").map((s) => s.trim()) : [];

  await api.producers.update(id, {
    name,
    region,
    description,
    history,
    contact_info,
    image_url,
    images,
  });

  revalidatePath("/admin/producers");
  revalidatePath(`/admin/producers/${id}`);
  redirect("/admin/producers");
}

export async function deleteProducer(id: string) {
  await api.producers.delete(id);
  revalidatePath("/admin/producers");
}
