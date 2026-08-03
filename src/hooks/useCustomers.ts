"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/lib/customer-api";

import { Customer } from "@/app/types/customer";

export function useCustomers() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });

  const addMutation = useMutation({
    mutationFn: addCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
    },
  });

return {
  ...query,
  queryClient,
  addMutation,
  updateMutation,
  deleteMutation,
};
}