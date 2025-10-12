"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Example: "Sep 25, 2025, 10:30 AM"
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });
};

const AdminPage = () => {
  const [page, setPage] = useState<number>(1);
  //   const [history, setHistory] = useState<TransactionHistory>();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Example: "Sep 25, 2025, 10:30 AM"
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Use 12-hour format with AM/PM
    });
  };

  // Transaction History
  //   useEffect(() => {
  //     if (token) {
  //       axios
  //         .get(`${apiKey}transaction-history?page=${page}&limit=10`, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((response) => {
  //           setHistory(response.data);
  //         })
  //         .catch((error) => console.log(error));
  //     }
  //   }, [token, page]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col mt-10 font-sans">
      <Link href="/" className="underline font-sans">
        Home Page
      </Link>
      <p className="text-xl font-semibold mt-5">Wait-lists</p>
      <p className="mb-5 mt-2 text-zinc-500 text-start">
        A list of Wait-lists.
      </p>
      <Table className="border border-border">
        <TableHeader className="bg-foreground">
          <TableRow>
            <TableHead className="w-[100px] text-secondary">
              Email Address
            </TableHead>
            <TableHead className="text-right text-secondary">
              Sign Up Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* {history &&
            history.transactions.map((data) => (
              <TableRow key={data.date}>
                <TableCell className="border overflow-hidden text-secondary">
                  <p className="w-60 text-wrap">{data.email}</p>
                </TableCell>
                <TableCell className="text-secondary">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell
                  className={`${
                    data.sign === "-" ? "text-red-500" : "text-green-500"
                  } text-right font-semibold`}
                >
                  {data.sign}
                  {data.amount}
                </TableCell>
              </TableRow>
            ))} */}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination className="mt-5 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (!history?.has_prev) e.preventDefault();
                else setPage(page - 1);
              }}
              className={
                !history?.has_prev
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!history?.has_prev}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="border">{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (!history?.has_next) e.preventDefault();
                else setPage(page + 1);
              }}
              className={
                !history?.has_next
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!history?.has_next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminPage;
