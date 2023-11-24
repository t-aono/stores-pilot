import { ChangeEventHandler } from "react";

export default function InputFile({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <input
      type="file"
      accept=".csv"
      onChange={onChange}
      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-500 hover:file:bg-teal-100 w-full"
    />
  );
}
