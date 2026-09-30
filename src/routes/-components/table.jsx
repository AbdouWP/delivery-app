import { flexRender } from "@tanstack/react-table";
import {
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useLocation, useNavigate } from "@tanstack/react-router";

export default function Table({ table, rowAction, rowClassName = () => "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    search: { page, limit },
  } = location;

  console.log("hello");

  return (
    <>
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
              key={`${row.id}${row.original.id}`}
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
      <footer className="w-full h-16 p-1 rounded-md">
        <div className="h-full flex justify-center items-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    navigate({
                      search: (prev) => ({
                        ...prev,
                        page: prev.page - 1 || 1,
                        limit: prev.limit,
                      }),
                    })
                  }
                >
                  Previous
                </PaginationPrevious>
              </PaginationItem>
              <PaginationItem>
                {Array.from(
                  {
                    length:
                      Math.ceil(table.getRowModel().rows / limit) ||
                      Math.ceil(table.getRowModel().rows / 10),
                  },
                  (_, i) => i + 1,
                ).map((pagination) => (
                  <PaginationLink
                    isActive={page === pagination}
                    onClick={() =>
                      navigate({
                        search: (prev) => ({
                          ...prev,
                          page: pagination,
                          limit: prev.limit,
                        }),
                      })
                    }
                  >
                    {pagination}
                  </PaginationLink>
                ))}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    navigate({
                      search: (prev) => ({
                        ...prev,
                        page: prev.page + 1 || 2,
                        limit: prev.limit,
                      }),
                    })
                  }
                >
                  Previous
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </footer>
    </>
  );
}
