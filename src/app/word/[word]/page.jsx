import { notFound } from "next/navigation";
import EditWordTable from "./edit_word_table";
import AdminWord from "./admin_word";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Spinner } from "./loading_spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page({ params }) {
  if (!params.word || params.word.length !== 24) {
    // Invalid word hexstring
    return notFound();
  }
  return (
    <main className="container flex min-h-screen flex-col items-center mx-auto py-16">
      <Card className="container p-4">
        <CardHeader>
          <CardTitle>Edit Word</CardTitle>
          <CardDescription>Edit the details of an arabic word.</CardDescription>
        </CardHeader>
        <CardContent className="container grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <Suspense
              fallback={
                <div className="flex items-center mx-auto py-16">
                  <Spinner size="xl">
                    <span className="">Loading...</span>
                  </Spinner>
                </div>
              }
            >
              <AdminWord id={params.word} />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <div className="flex-col justify-between rounded-md">
                <Skeleton className="h-12 mb-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 my-2" />
                <Skeleton className="h-12 mt-2" />
              </div>
            }
          >
            <EditWordTable />
          </Suspense>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
