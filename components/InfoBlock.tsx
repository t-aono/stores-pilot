import { ReactNode } from "react";

export default function InfoBlock({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 bg-teal-100 border-l-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-sm">
      {children}
    </div>
  );
}
