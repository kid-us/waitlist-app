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
import Link from "next/link";
import { WaitList } from "@/types/types";

const AdminPage = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [waitLists, setWaitLists] = useState<WaitList>();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Example: "Sep 25, 2025, 10:30 AM"
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get wait list
  useEffect(() => {
    const fetchWaitlist = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/get-waitlist");
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to fetch waitlist");

        setWaitLists(data.waitlist);
      } catch (error: any) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitlist();
  }, []);

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
            <TableHead className="w-[100px] text-white dark:text-black">
              Email Address
            </TableHead>
            <TableHead className="text-right text-white dark:text-black">
              Sign Up Date
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {waitLists &&
            waitLists.data.map((data) => (
              <TableRow key={data.email_address}>
                <TableCell className="border overflow-hidden ">
                  <p className="w-60 text-wrap">{data.email_address}</p>
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(data.created_at)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination className="mt-5 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (!waitLists?.has_prev) e.preventDefault();
                else setPage(page - 1);
              }}
              className={
                !waitLists?.has_prev
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!waitLists?.has_prev}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="border">{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (!waitLists?.has_next) e.preventDefault();
                else setPage(page + 1);
              }}
              className={
                !waitLists?.has_next
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!waitLists?.has_next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminPage;
