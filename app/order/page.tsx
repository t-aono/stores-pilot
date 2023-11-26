"use client";

import BaseButton from "@/components/BaseButton";
import { getOrders } from "../stores";

export default function Order() {
  async function fetchOrder() {
    const { orders } = await getOrders();
    console.log(orders);
  }

  return (
    <main className="container min-h-screen mx-auto p-8">
      <h3 className="font-medium">Order List</h3>
      <div className="mt-4">
        <BaseButton onClick={fetchOrder} label="fetch order" />
      </div>
    </main>
  );
}
