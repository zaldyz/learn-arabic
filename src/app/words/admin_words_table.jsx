import clientInstance from "@/lib/mongo";
import { DataTable } from "@/app/words/data-table";
import { columns } from "@/app/words/columns";
import AddNewWordButton from "./add_new_word_button";
// Sleep function that returns a Promise
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const revalidate = 21600; // 6 hours in seconds

async function getWords() {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  // await sleep(1000);
  return collection.find({}).toArray();
}

export default async function WordsTable() {
  const words = await getWords();
  const data = words.map((word) => {
    word._id = word._id.toString();
    return word;
  });
  return (
    <DataTable
      columns={columns}
      data={data}
      pageSize={10}
      button={<AddNewWordButton />}
    />
  );
}
