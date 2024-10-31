import { Suspense } from "react";
import WordsLoading from "./words_loading";
import WordsTable from "./admin_words_table";

export default async function Page() {
  return (
    <div className="container mx-auto py-10">
      <Suspense fallback={<WordsLoading />}>
        <WordsTable />
      </Suspense>
    </div>
  );
}
