import { Badge } from "@/components/ui/badge";
import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { cn } from "@/lib/utils";

const getWords = async (ids) => {
  if (!ids) {
    return [];
  }
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  return collection
    .find({ _id: { $in: ids.map((id) => ObjectId.createFromHexString(id)) } })
    .toArray();
};

export default async function SimilarWords({ similar_words, className }) {
  const words = await getWords(similar_words);
  return (
    <div className={cn("flex gap-2", className)}>
      {words.length ? (
        words.map((similar_word) => (
          <Link key={similar_word._id} href={`/word/${similar_word._id}`}>
            <Badge key={similar_word._id} variant="secondary">
              {similar_word.arabic}
            </Badge>
          </Link>
        ))
      ) : (
        <Badge variant="secondary">{"No Similar Words"}</Badge>
      )}
    </div>
  );
}
