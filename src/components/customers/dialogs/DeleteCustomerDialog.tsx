"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  customerName: string;

  onConfirm: () => void;
  isDeleting?: boolean;
}

export default function DeleteCustomerDialog({
  open,
  onOpenChange,
  customerName,
  onConfirm,
  isDeleting
}: DeleteCustomerDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-md border border-slate-800 bg-[#141b2d] p-0 text-white">

        {/* Header */}

        <div className="border-b border-slate-800 px-6 py-5">

          <h2 className="text-2xl font-bold">
            Delete Customer
          </h2>

        </div>

        {/* Body */}

        <div className="p-6">

          <div className="mb-6 flex justify-center">

            <div className="rounded-full bg-red-500/15 p-5">

              <AlertTriangle
                size={42}
                className="text-red-500"
              />

            </div>

          </div>

          <h3 className="text-center text-xl font-semibold">

            Are you sure?

          </h3>

          <p className="mt-3 text-center leading-7 text-slate-400">

            You are about to permanently delete

            <span className="font-semibold text-white">
              {" "}
              {customerName}
            </span>

            .

            <br />

            This action cannot be undone.

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-800 bg-[#111827] px-6 py-5">

          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-xl border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="mr-2 h-4 w-4" />
           {isDeleting ? "Deleting..." : "Delete Customer"}
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}