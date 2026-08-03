"use client";

import { useEffect, useState } from "react";
import CustomerForm from "../forms/CustomerForm";
import { Customer } from "@/app/types/customer";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Customer) => void;
  isSaving?: boolean;
}

const createEmptyCustomer = (): Customer => ({
  id: 0,
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Active",
  lastContact: new Date().toISOString().split("T")[0],
  avatar: "",
  notes: "",
});

export default function AddCustomerDialog({
  open,
  onOpenChange,
  onSave,
  isSaving,
}: AddCustomerDialogProps) {
  const [customer, setCustomer] = useState<Customer>(createEmptyCustomer());

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const clearError = (
  field: keyof typeof errors
) => {
  setErrors((prev) => ({
    ...prev,
    [field]: "",
  }));
};


useEffect(() => {
  if (open) {
    setCustomer(createEmptyCustomer());

    setErrors({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  }
}, [open]);

const handleSave = () => {
  const newErrors = {
    name: "",
    email: "",
    phone: "",
    company: "",
  };

  // Name
  if (!customer.name.trim()) {
    newErrors.name = "Customer name is required";
  }

  // Email
  if (!customer.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)
  ) {
    newErrors.email = "Invalid email address";
  }

  // Phone
  if (!customer.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (
    !/^[0-9]{10}$/.test(customer.phone)
  ) {
    newErrors.phone =
      "Phone number must contain exactly 10 digits";
  }

  // Company
  if (!customer.company.trim()) {
    newErrors.company = "Company is required";
  }

  setErrors(newErrors);

  // Stop if any validation failed
  if (Object.values(newErrors).some(Boolean)) {
    return;
  }

  onSave(customer);

  toast.success("Customer added successfully.");

  setErrors({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  onOpenChange(false);
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto scrollbar-hide border-slate-800 bg-slate-950 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Customer</DialogTitle>
        </DialogHeader>

        <CustomerForm customer={customer} onChange={setCustomer} errors={errors}
  clearError={clearError}/>

        <DialogFooter className="bg-gray-800">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="min-w-[140px] bg-blue-600 text-white hover:bg-blue-700"
          >
            {isSaving ? "Saving..." : "Add Customer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
