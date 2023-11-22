import { MouseEventHandler } from "react";

export default function BaseButton({
  onClick,
  label,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}) {
  return (
    <button
      className="border px-4 py-2 bg-indigo-700 text-white rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
