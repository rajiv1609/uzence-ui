import React from 'react';
import { cx } from '../../lib/cx';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface DataTableProps<T extends { id?: string | number }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyMessage = 'No data',
  className
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = React.useState<Set<string | number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col) return data;
    const idx = col.dataIndex as keyof T;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[idx] as unknown as string | number | Date | undefined;
      const bv = b[idx] as unknown as string | number | Date | undefined;
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      if (typeof av === 'number' && typeof bv === 'number') return av - bv;
      return String(av).localeCompare(String(bv));
    });
    if (sortDir === 'desc') copy.reverse();
    return copy;
  }, [data, columns, sortKey, sortDir]);

  const toggleSelect = (row: T) => {
    if (!selectable) return;
    const key = row.id ?? (JSON.stringify(row) as string);
    const next = new Set(selected);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setSelected(next);
    onRowSelect?.(sorted.filter((r) => next.has(r.id ?? JSON.stringify(r))));
  };

  return (
    <div className={cx('w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800', className)}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {selectable && <th className="w-10" />}
            {columns.map((c) => (
              <th
                key={c.key}
                scope="col"
                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                <button
                  type="button"
                  className={cx('inline-flex items-center gap-1', c.sortable ? 'hover:underline' : 'cursor-default')}
                  aria-label={c.sortable ? `Sort by ${c.title}` : undefined}
                  onClick={() => {
                    if (!c.sortable) return;
                    if (sortKey === c.key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
                    else {
                      setSortKey(c.key);
                      setSortDir('asc');
                    }
                  }}
                >
                  {c.title}
                  {c.sortable && (
                    <span aria-hidden className="text-xs">
                      {sortKey === c.key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <tr key={i} className="animate-pulse">
                {selectable && <td className="px-4 py-3"><div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"/></td>}
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  </td>
                ))}
              </tr>
            ))
          ) : sorted.length === 0 ? (
            <tr>
              <td colSpan={(columns.length + (selectable ? 1 : 0))} className="px-4 py-10 text-center text-sm text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => {
              const key = row.id ?? idx;
              const isSelected = selected.has(key);
              return (
                <tr
                  key={String(key)}
                  className={cx('bg-white dark:bg-gray-900', isSelected ? 'bg-blue-50 dark:bg-blue-950/30' : '')}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        aria-label={`Select row ${idx + 1}`}
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(row)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-sm text-gray-800 dark:text-gray-100">
                      {c.render ? c.render(row[c.dataIndex], row) : (row[c.dataIndex] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
