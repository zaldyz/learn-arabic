"use client";

import { Badge } from "@/components/ui/badge";
import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { BookOpenCheck } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AddSimilarWordButton } from "./add_similar_word_button";
import { AddRootWordButton } from "./add_root_word_button";
// This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// {
//   _id: ObjectId;
//   arabic: string;
//   pronounciation: string;
//   translation: [string];
//   gender: string or null;
//   similar_words: [string];
//   root_word: string or null;
//   tag: string or null;
// }

export const columns = [
  {
    accessorKey: "arabic",
    header: "Word",
    cell: ({ row }) => {
      const value = row.getValue("arabic");
      return <p className="text-3xl">{value}</p>;
    },
  },
  {
    accessorKey: "pronounciation",
    header: "Pronounciation",
  },
  {
    accessorKey: "translation",
    header: "Translation",
    cell: ({ row }) => {
      const value = row.getValue("translation");
      return (
        <div className="flex gap-2 flex-1">
          {value.map((translation) => (
            <Badge key={translation} variant="secondary">
              {translation}
            </Badge>
          ))}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const translatiions = row
        .getValue("translation")
        .some((translation) =>
          translation.toLowerCase().includes(filterValue.toLowerCase())
        );
      const arabic = row
        .getValue("arabic")
        .replace(
          /[\u0610-\u061A\u064B-\u065F\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
          ""
        )
        .includes(
          filterValue.replace(
            /[\u0610-\u061A\u064B-\u065F\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g,
            ""
          )
        );
      const pronounciation = row
        .getValue("pronounciation")
        .replace(/[^a-zA-Z]/g, "")
        .toLowerCase()
        .includes(filterValue.replace(/[^a-zA-Z]/g, "").toLowerCase());
      return translatiions || arabic || pronounciation;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const value = row.getValue("gender");
      return (
        <Badge
          variant={
            value == "Masculine"
              ? "blue"
              : value == "Feminine"
              ? "pink"
              : "outline"
          }
        >
          {value ? value : "Neutral"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const value = row.getValue("tags");
      return (
        <div className="flex gap-2 flex-1">
          {value.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const word = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <CirclePlus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/word/${word._id}`} asChild>
              <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer">
                Edit Word
                <Pencil className="h-3 w-3 ml-2" />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <AddRootWordButton word_id={word._id} />
            <AddSimilarWordButton word_id={word._id} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
