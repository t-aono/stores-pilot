"use server";

export async function getOrders() {
  const response = await fetch("https://api.stores.dev/retail/202211/orders", {
    headers: { Authorization: `Bearer ${process.env.STORES_API_KEY}` },
  });
  return await response.json();
}

export async function updateInventory({
  variationId,
  quantity,
}: {
  variationId: string;
  quantity: number;
}) {
  const response = await fetch(
    `https://api.stores.dev/retail/202211/variations/${variationId}/inventories/adjustment`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STORES_API_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ update_type: "absolute", quantity }),
    }
  );
  return await response.json();
}
