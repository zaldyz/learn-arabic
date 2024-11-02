import clientInstance from "@/lib/mongo";
import { ObjectId } from "mongodb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import RootWord from "./root_word_badge";
import Gender from "./gender_badge";
import Tags from "./tags_badges";
import Translation from "./translations_badges";
import SimilarWords from "./similar_words_badges";
import EditWordButton from "./edit_word_button";

// Sleep function that returns a Promise
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getWord = async (id) => {
  let client = await clientInstance;
  let db = client.db("arabic-glossary");
  let collection = db.collection("words");
  // await sleep(5000);
  return collection.findOne({ _id: ObjectId.createFromHexString(id) });
};

export default async function AdminWord({ id }) {
  const word = await getWord(id);
  word._id = word._id.toString();
  console.log(word);
  return (
    <div className="flex flex-col space-y-2 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-4xl md:text-6xl font-medium leading-none">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="my-4">{word.arabic}</button>
          </HoverCardTrigger>
          <HoverCardContent className="w-50">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="text-muted-foreground pr-1">
                    pronounced as
                  </span>
                  {word.pronounciation}
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
        <EditWordButton word={word} />
      </div>

      <div className="flex flex-col lg:flex-row lg:gap-20 gap-8">
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-medium">Translation</h2>
          <Translation className="py-0.5" translation={word.translation} />
          <h2 className="text-lg font-medium">Tags</h2>
          <Tags className="py-0.5" tags={word.tags} />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-medium">Gender</h2>
          <Gender className="py-0.5" gender={word.gender} />
          <h2 className="text-lg font-medium">Root Word</h2>
          <RootWord className="py-0.5" root_word={word.root_word} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-medium">Similar Words</h2>
        <SimilarWords className="py-0.5" similar_words={word.similar_words} />
      </div>
    </div>
  );
}
