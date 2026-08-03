"use client";

import { Customer } from "../types/customer";

import CustomerDetailsDialog from "@/components/customers/dialogs/CustomerDetailsDialog";
import DeleteCustomerDialog from "@/components/customers/dialogs/DeleteCustomerDialog";

import { useMemo, useState, useEffect } from "react";

import { customers as customerData } from "../data/customers";
import {
  CustomerFilters,
  DEFAULT_CUSTOMER_FILTERS,
} from "../types/customer-filter";

import EditCustomerDialog from "@/components/customers/dialogs/EditCustomerDialog";
import AddCustomerDialog from "@/components/customers/dialogs/AddCustomerDialog";
import CustomerToolbar from "@/components/customers/CustomerToolbar";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerPagination from "@/components/customers/CustomerPagination";
import CustomerFilterSheet from "@/components/customers/filters/CustomerFilterSheet";

import { useCustomers } from "@/hooks/useCustomers";


import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@/app/utils/arrayMove";


export default function CustomersPage() {
  // const [customers, setCustomers] =
  // useState(customerData);

 const [dragEnabled, setDragEnabled] = useState(false);

const {
  data: customers = [],
  isLoading,
  error,

  queryClient,

  addMutation,
  updateMutation,
  deleteMutation,
} = useCustomers();

const [addOpen, setAddOpen] =
  useState(false);

  
  const [editOpen, setEditOpen] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");

  // delete customer from detailed page

  const [deleteOpen, setDeleteOpen] = useState(false);

  const [filters, setFilters] =
  useState<CustomerFilters>(
    DEFAULT_CUSTOMER_FILTERS
  );

// const [tempFilters, setTempFilters] = useState(filters);

  // Sorting
  const [sortBy, setSortBy] = useState<
    "name" | "email" | "lastContact"
  >("name");

  const [sortOrder, setSortOrder] = useState<
    "asc" | "desc"
  >("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);



  const [filterOpen, setFilterOpen] = useState(false);

  
  const [selectedCustomer, setSelectedCustomer] =
  useState<Customer | null>(null);

const [detailsOpen, setDetailsOpen] =
  useState(false);

  //---------------------------------------
  // Companies for dropdown
  //---------------------------------------

  const companies = useMemo(() => {
    return [...new Set(customers.map((c) => c.company))];
  }, []);

  //---------------------------------------
  // Filter
  //---------------------------------------

  const filteredCustomers = useMemo(() => {
    let result = [...customers];

    // Search
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((customer) =>
        customer.name.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword) ||
        customer.company.toLowerCase().includes(keyword)
      );
    }

    // Status
    if (status !== "All") {
      result = result.filter(
        (customer) => customer.status === status
      );
    }

    // Company
    if (company !== "All") {
      result = result.filter(
        (customer) => customer.company === company
      );
    }

    // Advanced Status
if (filters.statuses.length > 0) {
  result = result.filter((customer) =>
    filters.statuses.includes(customer.status)
  );
}

// Advanced Company
if (filters.companies.length > 0) {
  result = result.filter((customer) =>
    filters.companies.includes(customer.company)
  );
}

// Phone
if (filters.phone.trim()) {
  result = result.filter((customer) =>
    customer.phone
      .toLowerCase()
      .includes(filters.phone.toLowerCase())
  );
}

// Email
if (filters.email.trim()) {
  result = result.filter((customer) =>
    customer.email
      .toLowerCase()
      .includes(filters.email.toLowerCase())
  );
}

// From Date
if (filters.fromDate) {
  result = result.filter(
    (customer) =>
      new Date(customer.lastContact) >=
      new Date(filters.fromDate)
  );
}

// To Date
if (filters.toDate) {
  result = result.filter(
    (customer) =>
      new Date(customer.lastContact) <=
      new Date(filters.toDate)
  );
}



// Sorting
if (!dragEnabled) {
  result.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    if (sortBy === "lastContact") {
      valueA = new Date(a.lastContact).getTime().toString();
      valueB = new Date(b.lastContact).getTime().toString();
    }

    if (sortOrder === "asc") {
      return valueA > valueB ? 1 : -1;
    }

    return valueA < valueB ? 1 : -1;
  });
}

return result;
}, [

  customers,
  search,
  status,
  company,
  filters,
  sortBy,
  sortOrder,
]);
  //---------------------------------------
  // Pagination
  //---------------------------------------

  const totalPages = Math.ceil(
    filteredCustomers.length / pageSize
  );

  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  //---------------------------------------
  // Sort Click
  //---------------------------------------

  const handleSort = (
    field: "name" | "email" | "lastContact"
  ) => {
    if (field === sortBy) {
      setSortOrder((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };



//   useEffect(() => {
//     if (open) {
//         setTempFilters(filters);
//     }
// }, [open, filters]);

  //---------------------------------------

  if (isLoading) {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-950 text-white">
      Loading customers...
    </main>
  );
}

if (error) {
  return (
    <main className="flex h-screen items-center justify-center bg-slate-950 text-red-500">
      Failed to load customers.
    </main>
  );
}

const handleDragEnd = (
  event: DragEndEvent
) => {
  const { active, over } = event;

  if (!over || active.id === over.id) {
    return;
  }

  const oldIndex = customers.findIndex(
    (customer) => customer.id === active.id
  );

  const newIndex = customers.findIndex(
    (customer) => customer.id === over.id
  );

  const reordered = arrayMove(
    customers,
    oldIndex,
    newIndex
  );

  queryClient.setQueryData(
    ["customers"],
    reordered
  );
};

  return (
    <main className="min-h-screen bg-slate-950 p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Customers
          </h1>

          <p className="mt-2 text-slate-400">
            Manage your customer records.
          </p>

        </div>

        {/* Toolbar */}

        <CustomerToolbar
          search={search}
          status={status}
          company={company}
          companies={companies}
          onSearchChange={(value) => {
            setSearch(value);
            setCurrentPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setCurrentPage(1);
          }}
          onCompanyChange={(value) => {
            setCompany(value);
            setCurrentPage(1);
          }}
          onAddCustomer={() => {
            setAddOpen(true);
          }}
           onOpenFilters={() => setFilterOpen(true)}

           dragEnabled={dragEnabled}
onToggleDrag={() =>
  setDragEnabled((prev) => !prev)
}

        />

        {/* Table */}

<CustomerTable
  customers={paginatedCustomers}
  sortBy={sortBy}
  sortOrder={sortOrder}
  onSort={handleSort}
  onRowClick={(customer) => {
    setSelectedCustomer(customer);
    setDetailsOpen(true);
  }}
    onEdit={(customer) => {
    setSelectedCustomer(customer);
    setEditOpen(true);
  }}
  onDelete={(customer) => {
    setSelectedCustomer(customer);
    setDeleteOpen(true);
  }}
  onDragEnd={handleDragEnd}
  dragEnabled={dragEnabled}
/>

<CustomerFilterSheet
  open={filterOpen}
  onOpenChange={setFilterOpen}
  filters={filters}
  onFiltersChange={setFilters}
/>
{/* <AddCustomerDialog
  open={addOpen}
  onOpenChange={setAddOpen}
  onSave={(customer) => {
    setCustomers((prev) => [
      {
        ...customer,
        id: Math.max(...prev.map((c) => c.id), 0) + 1,
      },
      ...prev,
    ]);
  }}
/> */}

<AddCustomerDialog
  open={addOpen}
  onOpenChange={setAddOpen}
onSave={(customer) => {
  addMutation.mutate({
    ...customer,
    id:
      customers.length > 0
        ? Math.max(...customers.map((c) => c.id)) + 1
        : 1,
  });
}}

 isSaving={addMutation.isPending}

/>

<CustomerDetailsDialog
  open={detailsOpen}
  onOpenChange={setDetailsOpen}
  customer={selectedCustomer}
 onEdit={() => {
  setDetailsOpen(false);
  setEditOpen(true);
}}

 onDelete={() => {
  setDeleteOpen(true);
}}

/>

<DeleteCustomerDialog
  open={deleteOpen}
  onOpenChange={setDeleteOpen}
  customerName={selectedCustomer?.name ?? ""}
onConfirm={() => {
  if (!selectedCustomer) return;

  deleteMutation.mutate(selectedCustomer.id);

  setDeleteOpen(false);

  setDetailsOpen(false);
}}

isDeleting={deleteMutation.isPending}
/>

<EditCustomerDialog
  open={editOpen}
  onOpenChange={setEditOpen}
  customer={selectedCustomer}
onSave={(updatedCustomer) => {
  updateMutation.mutate(updatedCustomer);

  setSelectedCustomer(updatedCustomer);

  setEditOpen(false);
 
}}

 isSaving={updateMutation.isPending}

/>


        {/* Pagination */}

        <CustomerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={filteredCustomers.length}
          onPageChange={setCurrentPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />

      </div>

    </main>
  );
}