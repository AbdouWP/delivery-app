import {
  useTable,
  flexRender,
  tableFeatures,
  rowSelectionFeature,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = tableFeatures({ rowSelectionFeature });

export default function Table({
  data: d,
  columns: c,
  rowAction,
  rowClassName = () => "",
  getTable = () => {},
}) {
  const data = useMemo(() => d, [d]);
  const columns = useMemo(() => c, [c]);

  const table = useTable({
    data,
    columns,
    features,
  });

  useEffect(() => {
    getTable(table);
  }, [getTable, table]);

  return (
    <ShadcnTable>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="hover:bg-transparent!">
            {headerGroup.headers.map((cell) => (
              <TableHead key={cell.id}>
                {flexRender(cell.column.columnDef.header, cell.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow
            key={row.id}
            className={`${row.getIsSelected() && "border-l-2! border-l-primary!"} ${rowClassName(row)}`}
          >
            {row.getAllCells().map((cell) => (
              <TableCell
                key={cell.id}
                onClick={() =>
                  cell.column.columnDef.canAction && rowAction(row)
                }
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </ShadcnTable>
  );
}
