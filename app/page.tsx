"use client";

import { useEffect, useState } from "react";
import { updateInventory } from "./stores";
import { useCsvParser } from "@/hooks/useParseCsv";
import { MatchedItem, useDataMatcher } from "@/hooks/useDataMatcher";
import InputFile from "@/components/InputFile";
import BaseButton from "@/components/BaseButton";
import ItemTable from "@/components/ItemTable";
import InfoBlock from "@/components/InfoBlock";

export default function Home() {
  const [inventory, setInventory] = useState<string[][] | null>(null);
  const [zaiko, setZaiko] = useState<string[][] | null>(null);
  const [items, setItems] = useState<MatchedItem[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [message, setMessage] = useState("");
  const { parseCsvFile } = useCsvParser();
  const { getMatches } = useDataMatcher();

  useEffect(() => {
    if (inventory !== null && zaiko !== null) {
      setItems(getMatches(inventory, zaiko));
    }
  }, [inventory, zaiko]);

  function handleCheckAll() {
    if (isCheckAll) {
      setCheckedIds([]);
    } else {
      setCheckedIds(items.map((item) => item.variationId));
    }
    setIsCheckAll(!isCheckAll);
  }

  async function postInventory() {
    const updateItems = items
      .filter((item) => checkedIds.includes(item.variationId))
      .map((item) => ({
        variationId: item.variationId,
        quantity: Number(item.zaiko[4]),
      }));
    const response = await updateInventory(updateItems[0]);
    setMessage("更新しました！");
    console.log(response);
  }

  return (
    <main className="container min-h-screen mx-auto p-8">
      <div className="mt-4">
        <h3 className="font-medium">STORES CSV (inventory)</h3>
        <InputFile
          onChange={async (e) =>
            setInventory(await parseCsvFile(e.currentTarget.files))
          }
        />
      </div>
      <div className="mt-4">
        <h3 className="font-medium">L-spark CSV (zaikokanri)</h3>
        <InputFile
          onChange={async (e) =>
            setZaiko(await parseCsvFile(e.currentTarget.files, "shift-jis"))
          }
        />
      </div>
      <div className="mt-4">
        {items.length > 0 && (
          <>
            <h3 className="font-medium">IDが一致したアイテム</h3>
            <div className="h-80 overflow-auto">
              <ItemTable
                items={items}
                checkedIds={checkedIds}
                setCheckedIds={setCheckedIds}
              />
            </div>
            <div className="mt-2 ml-2">
              <input
                id="checkAll"
                type="checkbox"
                className="mr-2"
                checked={isCheckAll}
                onChange={handleCheckAll}
              />
              <label htmlFor="checkAll">全てをチェック</label>
            </div>
            <div className="mt-4">
              <BaseButton
                onClick={postInventory}
                label="更新"
                disabled={checkedIds.length === 0}
              />
            </div>
          </>
        )}
      </div>
      {message && <InfoBlock>{message}</InfoBlock>}
    </main>
  );
}
