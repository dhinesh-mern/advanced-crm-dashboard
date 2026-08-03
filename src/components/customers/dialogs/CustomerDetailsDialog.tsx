"use client";

import { Customer } from "@/app/types/customer";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import {
  Mail,
  Phone,
  Building2,
  CalendarDays,
  FileText,
  Pencil,
  Trash2,
  Circle,
} from "lucide-react";

interface CustomerDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CustomerDetailsDialog({
  open,
  onOpenChange,
  customer,
  onEdit,
  onDelete,
}: CustomerDetailsDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-y-auto scrollbar-hide border border-slate-800 bg-[#141b2d] p-0 text-white">

        {/* Header */}

        <div className="border-b border-slate-800 px-8 py-6">

          <h2 className="text-2xl font-bold">
            Customer Details
          </h2>

        </div>

        <div className="space-y-8 p-8">

          {/* Profile */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex items-center gap-6">

              <img
                src={
                  customer.avatar ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    customer.name
                  )}`
                }
                alt={customer.name}
                className="h-24 w-24 rounded-full border-4 border-slate-700 object-cover"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  {customer.name}
                </h2>

                <p className="mt-1 text-slate-400">
                  {customer.email}
                </p>

                <p className="mt-3 text-sm text-slate-300">
                  {customer.company}
                </p>

              </div>

            </div>

<div className="flex gap-3">

  <Button
    variant="outline"
    onClick={onDelete}
    className="h-11 min-w-[130px] rounded-xl border-red-500 bg-transparent text-red-400 transition-all hover:bg-red-500 hover:text-white"
  >
    <Trash2 className="mr-2 h-4 w-4" />
    Delete
  </Button>

  <Button
    onClick={onEdit}
    className="h-11 min-w-[160px] rounded-xl bg-blue-600 font-medium text-white transition-all hover:bg-blue-700"
  >
    <Pencil className="mr-2 h-4 w-4" />
    Edit Customer
  </Button>

</div>

          </div>

          {/* Cards */}

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Contact */}

            <div className="rounded-2xl border border-slate-800 bg-[#1b2335] p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Contact Information
              </h3>

              <div className="space-y-6">

                <div className="flex gap-4">

                  <Mail className="mt-1 h-5 w-5 text-blue-400" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Email
                    </p>

                    <p className="mt-1">
                      {customer.email}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <Phone className="mt-1 h-5 w-5 text-blue-400" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Phone
                    </p>

                    <p className="mt-1">
                      {customer.phone}
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* Company */}

            <div className="rounded-2xl border border-slate-800 bg-[#1b2335] p-6">

              <h3 className="mb-6 text-xl font-semibold">
                Company & Status
              </h3>

              <div className="space-y-6">

                <div className="flex gap-4">

                  <Building2 className="mt-1 h-5 w-5 text-blue-400" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Company
                    </p>

                    <p className="mt-1">
                      {customer.company}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <Circle
                    className={`mt-1 h-4 w-4 fill-current ${
                      customer.status === "Active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  />

                  <div>

                    <p className="text-sm text-slate-500">
                      Status
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                        customer.status === "Active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {customer.status}
                    </span>

                  </div>

                </div>

                <div className="flex gap-4">

                  <CalendarDays className="mt-1 h-5 w-5 text-blue-400" />

                  <div>

                    <p className="text-sm text-slate-500">
                      Last Contact
                    </p>

                    <p className="mt-1">
                      {customer.lastContact}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Notes */}

          <div className="rounded-2xl border border-slate-800 bg-[#1b2335]">

            <div className="border-b border-slate-800 px-6 py-5">

              <div className="flex items-center gap-3">

                <FileText className="h-5 w-5 text-blue-400" />

                <h3 className="text-xl font-semibold">
                  Notes & Interactions
                </h3>

              </div>

            </div>

            <div className="p-6">

              <div className="rounded-xl border border-slate-700 bg-[#111827] p-5">

                <p className="leading-7 text-slate-300">

                  {customer.notes ||
                    "No notes or customer interactions have been recorded yet."}

                </p>

              </div>

            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
}