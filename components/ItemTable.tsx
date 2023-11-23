import { MatchedItem } from "@/hooks/useDataMatcher";
import { Dispatch, SetStateAction } from "react";

export default function ItemTable({
  items,
  checkedIds,
  setCheckedIds,
}: {
  items: MatchedItem[];
  checkedIds: string[];
  setCheckedIds: Dispatch<SetStateAction<string[]>>;
}) {
  function handleCheck(value: string) {
    if (checkedIds.includes(value)) {
      setCheckedIds(checkedIds.filter((item) => item !== value));
    } else {
      setCheckedIds([...checkedIds, value]);
    }
  }

  return (
    <table className="table-auto">
      <thead className="bg-indigo-50 sticky top-0">
        <tr>
          <th></th>
          <th className="px-2">バリエーションID</th>
          <th className="px-2">アイテム名</th>
          <th className="px-2">種類</th>
          <th className="px-2">ダウンロード時の在庫数</th>
          <th className="px-2">更新する在庫数</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.variationId} className="border-b-2 h-12">
            <td className="w-8 text-center">
              <input
                type="checkbox"
                value={item.variationId}
                onChange={(e) => handleCheck(e.target.value)}
              />
            </td>
            <td>{item.variationId}</td>
            <td>{item.inventory[4]}</td>
            <td>{item.inventory[5]}</td>
            <td className="text-center">{item.inventory[10]}</td>
            <td className="text-center">{item.zaiko[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
