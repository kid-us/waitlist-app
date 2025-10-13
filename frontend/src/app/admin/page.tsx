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
import axios from "axios";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminPage = () => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [waitLists, setWaitLists] = useState<WaitList>();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

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
      try {
        const res = await axios.get("/api/waitlist/get");
        setWaitLists(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
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
            <TableHead className="w-[100px] text-white dark:text-black">
              Status
            </TableHead>
            <TableHead className="text-right text-white dark:text-black">
              Sign Up Date
            </TableHead>
          </TableRow>
        </TableHeader>

        {waitLists && waitLists.data.length > 0 && (
          <TableBody>
            {waitLists.data.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="border overflow-hidden">
                  <p className="w-60 text-wrap">{data.email}</p>
                </TableCell>
                <TableCell className="border overflow-hidden">
                  <p className="w-60 text-wrap capitalize">{data.status}</p>
                </TableCell>
                <TableCell className="text-right">
                  {formatDate(data.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {/* Empty Data Msg */}
      {waitLists && waitLists.data.length < 1 && (
        <p className="text-center text-sm py-4 bg-secondary">
          Opps, No one is interested
        </p>
      )}

      {/* Empty Data Msg */}
      {loading && (
        <div className="flex items-center justify-center mt-5">
          <Loader className="animate-spin" />
        </div>
      )}

      {/* Pagination */}
      <Pagination className="mt-5 flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                if (!waitLists?.pagination.has_prev) e.preventDefault();
                else setPage(page - 1);
              }}
              className={
                !waitLists?.pagination.has_prev
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!waitLists?.pagination.has_prev}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="border">{page}</PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                if (!waitLists?.pagination.has_next) e.preventDefault();
                else setPage(page + 1);
              }}
              className={
                !waitLists?.pagination.has_next
                  ? "pointer-events-none opacity-50 border"
                  : "border"
              }
              aria-disabled={!waitLists?.pagination.has_next}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default AdminPage;
