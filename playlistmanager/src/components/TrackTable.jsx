import { useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'

const columns = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'genre', header: 'Genre' },
  { accessorKey: 'artist', header: 'Artist' },
  { accessorKey: 'bpm', header: 'BPM' },
  { accessorKey: 'label', header: 'Label' },
  { accessorKey: 'role', header: 'Role' },
]

export default function TrackTable({ tracks, selectedId, onSelectRow, highlightTop = false }) {
  const data = useMemo(() => tracks, [tracks])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 4 },
    },
  })

  if (tracks.length === 0) {
    return (
      <p className="text-sm text-paper-dim">
        No tracks yet. Add one from the "Add track" tab to see it here.
      </p>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-white/10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              {table.getHeaderGroups()[0].headers.map((header) => (
                <th
                  key={header.id}
                  className="font-display text-xs tracking-wide text-paper-dim px-4 py-3"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              const active = row.original.id === selectedId
              const isTopRated = highlightTop && row.original.bpm >= 80
              return (
                <tr
                  key={row.id}
                  onClick={() => onSelectRow(row.original.id)}
                  className={[
                    'cursor-pointer border-b border-white/5 last:border-b-0 transition-colors',
                    active ? 'bg-gold/10' : isTopRated ? 'bg-teal/10' : 'hover:bg-white/5',
                  ].join(' ')}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <td key={cell.id} className="px-4 py-3 text-paper">
                      {i === 0 && isTopRated && !active && (
                        <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-teal align-middle" />
                      )}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-paper-dim">
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="rounded-md border border-white/10 px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-paper transition-colors cursor-pointer"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="rounded-md border border-white/10 px-3 py-1.5 disabled:opacity-30 disabled:cursor-not-allowed hover:border-gold hover:text-paper transition-colors cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}