"use server";

export async function getOrders() {
  const response = await fetch("https://api.stores.dev/retail/202211/orders", {
    headers: { Authorization: `Bearer ${process.env.STORES_API_KEY}` },
  });
  return await response.json();
}
