import { MatchedItem } from "@/hooks/useDataMatcher";

export default function ItemTable({ items }: { items: MatchedItem[] }) {
  return (
    <table className="table-auto">
      <thead className="bg-indigo-50 sticky top-0">
        <tr>
          <th></th>
          <th>商品名</th>
          <th>バリエーションID</th>
          <th>在庫数</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item) => (
          <tr key={item.variationId} className="border-b-2 h-12">
            <td className="w-8 text-center">
              <input type="checkbox" />
            </td>
            <td>{item.value[2]}</td>
            <td>{item.value[3]}</td>
            <td className="text-center">{item.value[4]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
