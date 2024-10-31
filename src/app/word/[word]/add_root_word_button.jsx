"use client";

import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { addRootWord } from "@/app/actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { BookOpenCheck } from "lucide-react";

export function AddRootWordButton({ word_id }) {
  const params = useParams();
  const id = params.word;
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      // TODO: Make action functions promise based and use loading state
      // toast.promise(addSimilarWord(id, word_id), {
      //   loading: "Adding...",
      //   success: (data) => {
      //     return `${data.message} toast has been added`;
      //   },
      //   error: "Error",
      // });
      const obj = await addRootWord(id, word_id);
      if (obj.success) {
        toast.success("Saved Changes", {
          description: obj.message,
        });
      } else {
        toast.error("Error", {
          description: obj.message,
        });
      }
    });
  };

  return (
    <DropdownMenuItem
      onClick={onClick}
      className="flex justify-between items-center hover:cursor-pointer"
    >
      Select as Root Word
      <BookOpenCheck className="h-3 w-3 ml-2" />
    </DropdownMenuItem>
  );
}
