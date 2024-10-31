"use client";

import { AlertDialogAction } from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { deleteWord } from "@/app/actions";

export default function DeleteWordButton({ id, similar_words, children }) {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const obj = await deleteWord(id, similar_words);
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

  return <AlertDialogAction onClick={onClick}>{children}</AlertDialogAction>;
}
