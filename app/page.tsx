"use client";

import { useEffect, useState } from "react";
import { getOrders, updateInventory } from "./stores";
import { useCsvParser } from "@/hooks/useParseCsv";
import { MatchedItem, useDataMatcher } from "@/hooks/useDataMatcher";
import InputFile from "@/components/InputFile";
import BaseButton from "@/components/BaseButton";
import ItemTable from "@/components/ItemTable";

export default function Home() {
  const [inventory, setInventory] = useState<string[][] | null>(null);
  const [zaiko, setZaiko] = useState<string[][] | null>(null);
  const [items, setItems] = useState<MatchedItem[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const { parseCsvFile } = useCsvParser();
  const { getMatches } = useDataMatcher();

  useEffect(() => {
    if (inventory !== null && zaiko !== null) {
      setItems(getMatches(inventory, zaiko));
    }
  }, [inventory, zaiko]);

  async function fetchOrder() {
    const { orders } = await getOrders();
    console.log(orders);
  }

  async function postInventory() {
    const updateItems = items
      .filter((item) => checkedIds.includes(item.variationId))
      .map((item) => ({
        variationId: item.variationId,
        quantity: Number(item.zaiko[4]),
      }));
    const response = await updateInventory(updateItems[0]);
    console.log(response);
  }

  return (
    <main className="container min-h-screen mx-auto p-8">
      <div className="mt-4">
        <h3>inventory</h3>
        <InputFile
          onChange={async (e) =>
            setInventory(await parseCsvFile(e.currentTarget.files))
          }
        />
      </div>
      <div className="mt-4">
        <h3>zaiko</h3>
        <InputFile
          onChange={async (e) =>
            setZaiko(await parseCsvFile(e.currentTarget.files, "shift-jis"))
          }
        />
      </div>
      <div className="mt-4">
        <h3>matches</h3>
        {items.length > 0 ? (
          <div className="h-80 overflow-auto">
            <ItemTable
              items={items}
              checkedIds={checkedIds}
              setCheckedIds={setCheckedIds}
            />
          </div>
        ) : (
          <div>一致アイテムがありません</div>
        )}
      </div>
      <div className="mt-12">
        <h3>API Request</h3>
        <div className="mt-4">
          <BaseButton onClick={fetchOrder} label="fetch order" />
        </div>
        <div className="mt-4">
          <BaseButton onClick={postInventory} label="post inventory" />
        </div>
      </div>
    </main>
  );
}
