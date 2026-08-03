"use client";

import { useState } from "react";

import {
  CustomerFilters,
  DEFAULT_CUSTOMER_FILTERS,
} from "../../../app/types/customer-filter";
import { useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import StatusFilter from "./StatusFilter";
import CompanyFilter from "./CompanyFilter";
import DateRangeFilter from "./DateRangeFilter";
import TextFilter from "./TextFilter";
import FilterFooter from "./FilterFooter";
import SavedFilters from "./SavedFilters";

import { Button } from "@/components/ui/button";

interface CustomerFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  filters: CustomerFilters;
  onFiltersChange: (filters: CustomerFilters) => void;
}


export default function CustomerFilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
}: CustomerFilterSheetProps) {
  


  const [tempFilters, setTempFilters] =
  useState(filters);

useEffect(() => {
  if (open) {
    setTempFilters(filters);
  }
}, [open, filters]);


const [savedFilters, setSavedFilters] = useState<
  { id: string; name: string; filters: CustomerFilters }[]
>([]);


const activeFilterCount = [
  tempFilters.statuses.length,
  tempFilters.companies.length,
  tempFilters.phone,
  tempFilters.email,
  tempFilters.fromDate,
  tempFilters.toDate,
].filter(Boolean).length;


useEffect(() => {
  const stored = localStorage.getItem("customer-filters");

  if (stored) {
    setSavedFilters(JSON.parse(stored));
  }
}, []);

const handleSaveFilter = () => {
  const name = prompt("Enter filter name");

  if (!name) return;

  const newFilter = {
    id: crypto.randomUUID(),
    name,
    filters: tempFilters,
  };

  const updated = [...savedFilters, newFilter];

  setSavedFilters(updated);

  localStorage.setItem(
    "customer-filters",
    JSON.stringify(updated)
  );
};

  return (
    <Sheet
  open={open}
  onOpenChange={onOpenChange}
>
        {/* <SheetTrigger
        render={
            <Button variant="outline" className="gap-2">
            <SlidersHorizontal size={16} />
            Filters
            </Button>
        }
        /> */}

<SheetContent
  side="right"
  className="w-[420px] overflow-y-auto border-slate-800 bg-slate-950 text-white"
>
  <div className="p-6">
    {/* Everything else goes here */}
        <SheetHeader>

          <div className="flex items-center justify-between">

            <SheetTitle className="text-left text-xl text-white">
              Filters
            </SheetTitle>



          </div>

        </SheetHeader>

        {/* ======================== */}

        <div className="mt-8 space-y-8">

          {/* Save Filter */}

          <section>

<Button
  className="w-full"
  onClick={handleSaveFilter}
>
  Save Current Filter
</Button>

          </section>

          {/* Status */}

          <section>

            <h3 className="mb-4 text-sm font-semibold">
              Status
            </h3>

<StatusFilter
  value={tempFilters.statuses}
  onChange={(statuses) =>
    setTempFilters({
      ...filters,
      statuses,
    })
  }
/>
          </section>

          {/* Company */}

          <section>

            <h3 className="mb-4 text-sm font-semibold">
              Company
            </h3>

<CompanyFilter
  companies={[
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "Tesla",
    "Netflix",
    "Acme Corp",
    "Globex",
  ]}
  value={tempFilters.companies}
  onChange={(companies)=>
    setTempFilters({
        ...filters,
        companies,
    })
}
/>


          </section>

{/* Date */}
<section>
  <h3 className="mb-4 text-sm font-semibold">
    Date Range (Last Contact)
  </h3>

  <DateRangeFilter
    fromDate={tempFilters.fromDate}
    toDate={tempFilters.toDate}
    onFromDateChange={(fromDate) =>
      setTempFilters({
        ...tempFilters,
        fromDate,
      })
    }
    onToDateChange={(toDate) =>
      setTempFilters({
        ...tempFilters,
        toDate,
      })
    }
  />
</section>
          {/* Phone */}

          <section>

            <h3 className="mb-4 text-sm font-semibold">
              Phone Number
            </h3>

<TextFilter
  label=""
  placeholder="Search phone number..."
  value={tempFilters.phone}
onChange={(phone)=>
    setTempFilters({
        ...filters,
        phone,
    })
}
/>

          </section>

          {/* Email */}

          <section>

            <h3 className="mb-4 text-sm font-semibold">
              Email
            </h3>

<TextFilter
  label=""
  placeholder="Search email..."
value={tempFilters.email}

onChange={(email)=>
setTempFilters({
...filters,
email,
})
}
/>

          </section>

          {/* Saved Filters */}

          <section>

            <h3 className="mb-4 text-sm font-semibold">
              Saved Filters
            </h3>

<SavedFilters
filters={savedFilters}
 onSelect={(saved) => {
  setTempFilters(saved.filters);
}}
onDelete={(id) => {
  const updated = savedFilters.filter(
    (filter) => filter.id !== id
  );

  setSavedFilters(updated);

  localStorage.setItem(
    "customer-filters",
    JSON.stringify(updated)
  );
}}

  onSaveCurrent={() => console.log("Save Current")}
/>

          </section>

          {/* Footer */}

<FilterFooter

activeFilterCount={activeFilterCount}

onApply={() => {
  onFiltersChange(tempFilters);
  onOpenChange(false);
}}

onClear={() => {
  setTempFilters(DEFAULT_CUSTOMER_FILTERS);
}}

/>

        </div>
</div>
      </SheetContent>

      
    </Sheet>
  );
}