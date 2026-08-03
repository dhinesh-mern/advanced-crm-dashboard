import { customers } from "@/app/data/customers";
import { Customer } from "@/app/types/customer";

let customerDB = [...customers];

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getCustomers() {
  await delay(500);

  return [...customerDB];
}

export async function addCustomer(
  customer: Customer
) {
  await delay(500);

  customerDB.unshift(customer);

  return customer;
}

export async function updateCustomer(
  customer: Customer
) {
  await delay(500);

  customerDB = customerDB.map((c) =>
    c.id === customer.id ? customer : c
  );

  return customer;
}

export async function deleteCustomer(
  id: number
) {
  await delay(500);

  customerDB = customerDB.filter(
    (c) => c.id !== id
  );

  return id;
}