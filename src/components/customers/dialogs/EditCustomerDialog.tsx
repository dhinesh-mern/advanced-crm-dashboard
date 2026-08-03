"use client";

import { useEffect, useState } from "react";

import { Customer } from "@/app/types/customer";

import CustomerForm from "../forms/CustomerForm";

import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface EditCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  onSave: (customer: Customer) => void;
  isSaving?: boolean;
}

export default function EditCustomerDialog({
  open,
  onOpenChange,
  customer,
  onSave,
  isSaving
}: EditCustomerDialogProps) {

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


  const [editedCustomer, setEditedCustomer] =
    useState<Customer | null>(null);

useEffect(() => {
  if (open && customer) {
    setEditedCustomer(customer);

    setErrors({
      name: "",
      email: "",
      phone: "",
      company: "",
    });
  }
}, [open, customer]);


const handleSave = () => {
  if (!editedCustomer) return;

  const newErrors = {
    name: "",
    email: "",
    phone: "",
    company: "",
  };

  // Name
  if (!editedCustomer.name.trim()) {
    newErrors.name = "Customer name is required";
  }

  // Email
  if (!editedCustomer.email.trim()) {
    newErrors.email = "Email is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      editedCustomer.email
    )
  ) {
    newErrors.email = "Invalid email address";
  }

  // Phone
  if (!editedCustomer.phone.trim()) {
    newErrors.phone = "Phone number is required";
  } else if (
    !/^[0-9]{10}$/.test(
      editedCustomer.phone
    )
  ) {
    newErrors.phone =
      "Phone number must contain exactly 10 digits";
  }

  // Company
  if (!editedCustomer.company.trim()) {
    newErrors.company = "Company is required";
  }

  setErrors(newErrors);

  if (Object.values(newErrors).some(Boolean)) {
    return;
  }

  onSave(editedCustomer);

  toast.success("Customer updated successfully.");
  
  setErrors({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  onOpenChange(false);
};

  if (!editedCustomer) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto scrollbar-hide border-slate-800 bg-slate-950 text-white">

        <DialogHeader>

          <DialogTitle className="text-2xl">
            Edit Customer
          </DialogTitle>

        </DialogHeader>

<CustomerForm
  customer={editedCustomer}
  onChange={setEditedCustomer}
  errors={errors}
  clearError={clearError}
/>
        <DialogFooter>

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
        {isSaving ? "Saving..." : "Save Changes"}
          </Button>

        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}