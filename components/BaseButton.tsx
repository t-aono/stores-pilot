import { MouseEventHandler } from "react";

export default function BaseButton({
  onClick,
  label,
  disabled = false,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`border px-4 py-2 ${
        disabled ? "bg-gray-300" : "bg-teal-500"
      } text-white rounded-md`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
