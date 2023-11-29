"use client";

import { getOrders } from "../stores";
import { useState } from "react";
import BaseButton from "@/components/BaseButton";
import InfoBlock from "@/components/InfoBlock";

export default function Order() {
  const [message, setMessage] = useState("");

  async function fetchOrder() {
    const { orders } = await getOrders();
    setMessage("取得しました！");
    console.log(orders);
  }

  return (
    <main className="container min-h-screen mx-auto p-8">
      <h3 className="font-medium">Order List</h3>
      <div className="mt-4">
        <BaseButton onClick={fetchOrder} label="fetch order" />
      </div>
      {message && <InfoBlock>{message}</InfoBlock>}
    </main>
  );
}
