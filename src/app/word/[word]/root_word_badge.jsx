import { Badge } from "@/components/ui/badge";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getWord = async (id) => {
  if (!id) {
    return {};
  }
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function RootWord({ root_word, className }) {
  const word = await getWord(root_word);

  return (
    <div className={cn("flex gap-2", className)}>
      {word.arabic ? (
        <Link href={`/word/${word._id}`}>
          <Badge variant="secondary">{word.arabic}</Badge>
        </Link>
      ) : (
        <Badge variant="secondary">{"N/A"}</Badge>
      )}
    </div>
  );
}
