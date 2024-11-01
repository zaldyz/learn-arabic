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
    <main className="md:container flex flex-col items-center py-5 md:py-16 md:mx-auto">
      <Card className="container p-0 md:p-4 md:border">
        <CardHeader>
          <CardTitle>Edit Word</CardTitle>
          <CardDescription>Edit the details of an arabic word.</CardDescription>
        </CardHeader>
        <CardContent className="container grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
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
          <div className="p-0 overflow-auto">
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
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
