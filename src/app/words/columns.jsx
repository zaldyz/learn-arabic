"use client";

import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Clipboard, OctagonX, Pencil } from "lucide-react";
import Link from "next/link";
import DeleteWordButton from "./delete_word_button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
    id: "similar_words",
    accessorKey: "similar_words",
    header: "Similar Words",
  },
  {
    id: "root_word",
    accessorKey: "root_word",
    header: "Root Word",
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
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(word.arabic)}
                className="flex justify-between items-center hover:cursor-pointer"
              >
                Copy Arabic
                <Clipboard className="h-3 w-3 ml-2" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href={`/word/${word._id}`} asChild>
                <DropdownMenuItem className="flex justify-between items-center hover:cursor-pointer">
                  Edit Word
                  <Pencil className="h-3 w-3 ml-2" />
                </DropdownMenuItem>
              </Link>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem className="flex justify-between items-center text-red-600 hover:cursor-pointer focus:text-white focus:bg-red-500 dark:focus:bg-red-800/80">
                  Delete Word
                  <OctagonX className="h-3 w-3 ml-2" />
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm word deletion</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                word and remove it from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <DeleteWordButton
                id={word._id}
                similar_words={word.similar_words}
              >
                Confirm
              </DeleteWordButton>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
