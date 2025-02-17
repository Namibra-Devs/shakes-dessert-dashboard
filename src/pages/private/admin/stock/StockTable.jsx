import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
// import { formatDate } from "@/lib/utils/formatDate";
// import useAppContext from "@/hooks/useAppContext";
// import useAuth from "@/hooks/useAuth";
// import { deleteSelectedItems } from "@/lib/utils/deleteSelectedItems";

const generateColumns = ({ onViewClick, onEditClick, onDeleteClick }) => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "itemName",
      header: "Item Name",
      cell: ({ row }) => (
        <p className="capitalize">
          {row.getValue("itemName") || "unavailable"}
        </p>
      ),
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      filterFn: (row, columnId, filterValue) => {
        const status = row.getValue(columnId);
        return status.toLowerCase() === filterValue.toLowerCase();
      },
      cell: ({ row }) => {
        const value = row.getValue("createdBy");
        return value ? (
          <div
            className={`capitalize w-fit py-1 px-2 text-[12px] rounded-md ${
              value.toLowerCase() === "admin"
                ? "text-success bg-success/20"
                : "text-danger bg-danger/20"
            }`}
          >
            {value}
          </div>
        ) : (
          <div>---</div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <p className="capitalize">{row.getValue("category")}</p>
      ),
    },
    {
      accessorKey: "foodType",
      header: "Food Type",
      cell: ({ row }) => (
        <p className="capitalize">{row.getValue("foodType")}</p>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <p>{row.getValue("price")}</p>,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      cell: ({ row }) => {
        const branch = row.getValue("branch");
        return <p className="capitalize">{branch}</p>;
      },
      filterFn: (row, columnId, filterValue) => {
        const branch = row.getValue(columnId);
        return branch?.toLowerCase().includes(filterValue.toLowerCase());
      },
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const stock = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewClick(stock)}>
                View Stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEditClick(stock)}>
                Edit Stock
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDeleteClick(stock?._id)}>
                Delete Stock
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};

export function StockTable({
  onViewClick,
  onEditClick,
  onDeleteClick,
  stocks,
  //   locations,
  //   dates,
  //   isFetchLoading,
}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  //   const { triggerUpdate } = useAppContext();
  //   const {
  //     auth: { accessToken },
  //   } = useAuth();

  const columns = generateColumns({ onViewClick, onEditClick, onDeleteClick });

  const table = useReactTable({
    data: stocks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [selectedBranch, setSelectedBranch] = useState("Branch");
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("Created By");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  //   const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);
  //   const { setAlert } = useAppContext();

  //   const handleDeleteAll = () => {
  //     setIsConfirmDialogOpen(true);
  //   };

  //   const handleConfirmDelete = async () => {
  //     setLoading(true);

  //     const selectedIds = table
  //       .getSelectedRowModel()
  //       .rows.map((row) => row.original._id);

  //     try {
  //       const { data, message } = await deleteSelectedItems(
  //         accessToken,
  //         "branch",
  //         selectedIds
  //       );

  //       if (message) {
  //         console.log(message);
  //         setAlert((prev) => ({
  //           ...prev,
  //           message: message,
  //           type: "warning",
  //         }));
  //       }

  //       if (data) {
  //         console.log("Data: ", data);
  //         setIsConfirmDialogOpen(false);
  //         setAlert((prev) => ({
  //           ...prev,
  //           message: "Data deleted successfully",
  //           type: "success",
  //         }));
  //         triggerUpdate("branch");
  //       }
  //     } catch (error) {
  //       console.log("Error deleting branches: ", error);
  //       setAlert((prev) => ({
  //         ...prev,
  //         message: "Failed to delete items",
  //         type: "error",
  //       }));
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="w-[50rem] sm:w-full text-dark p-2">
      <div className="flex items-center py-4 justify-between">
        {/* <Button
          variant="destructive"
          disabled={table.getSelectedRowModel().rows.length === 0}
          onClick={handleDeleteAll}
        >
          Delete Selected
        </Button> */}

        {/* Confirmation Dialog */}
        {/* <div
          className={`${
            isConfirmDialogOpen ? "block" : "hidden"
          } fixed top-10 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md z-20`}
        >
         
          <div>
            <h3 className="bg-danger px-5 py-2 text-white text-center rounded-t-md">
              Delete Selected Data
            </h3>
            <p className="p-5">
              Deleting selected data? This action cannot be reversed.
            </p>
          </div>

         
          <div className="p-5 flex items-center space-x-5">
            <Button
              variant="outline"
              onClick={() => {
                setIsConfirmDialogOpen(false);
                setAlert((prev) => ({
                  ...prev,
                  message: "",
                }));
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div> */}

        <div className="flex items-center space-x-3">
          <Input
            placeholder="Search by name"
            value={table.getColumn("itemName")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn("itemName")?.setFilterValue(event.target.value)
            }
            className="max-w-48"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedCreatedBy} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Admin", "Jawad"]?.map((person, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    table.getColumn("createdBy")?.setFilterValue(person);
                    setSelectedCreatedBy(person);
                  }}
                >
                  {person}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCreatedBy("Created By");
                  table.getColumn("createdBy")?.setFilterValue(""); // Clear the filter
                }}
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedCategory} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Most Popular"]?.map((category, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    table.getColumn("category")?.setFilterValue(category);
                    setSelectedCategory(category);
                  }}
                >
                  {category}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedCategory("Category");
                  table.getColumn("category")?.setFilterValue(""); // Clear the filter
                }}
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedBranch} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {["Accra"]?.map((branch, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => {
                    table.getColumn("branch")?.setFilterValue(branch);
                    setSelectedBranch(branch);
                  }}
                >
                  {branch}
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedBranch("Branch");
                  table.getColumn("branch")?.setFilterValue(""); // Clear the filter
                }}
              >
                Clear Filter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  no data here
                  {/* {isFetchLoading
                    ? "Fetching your Data"
                    : "No Branches Data Available"} */}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

StockTable.propTypes = {
  onViewClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  stocks: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired,
  //   isFetchLoading: PropTypes.bool,
};
