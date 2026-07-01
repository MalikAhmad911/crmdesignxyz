import type { ReactNode } from "react";

export function MoneyTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead>
        <tr className="text-[10px] uppercase tracking-widest text-[--color-muted] border-b border-[--color-hairline]">
          {headers.map((h, i) => (
            <th key={i} className={`px-4 py-3 font-semibold ${i === headers.length - 1 ? "text-right" : ""}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-canvas] transition">
            {row.map((cell, j) => (
              <td key={j} className={`px-4 py-3 ${j === row.length - 1 ? "text-right" : ""}`}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
