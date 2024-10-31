"use client";
import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/app/hooks/use_media_query";
import { addNewWord } from "@/app/actions";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddNewWordButton() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            Add New Word
            <SquarePlus className="w-4 h-4 ml-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a New Word</DialogTitle>
            <DialogDescription>
              Add details about the word here. Click create when you&apos;re
              ready.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          Add New Word
          <SquarePlus className="w-4 h-4 ml-3" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create a New Word</DrawerTitle>
          <DrawerDescription>
            Add details about the word here. Click create when you&apos;re
            ready.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" onOpenChange={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className, onOpenChange }) {
  const [arabic, setArabic] = React.useState("");
  const [translation, setTranslation] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [pronounciation, setPronounciation] = React.useState("");

  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const obj = await addNewWord(
        arabic,
        translation,
        pronounciation,
        tags,
        gender
      );
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
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="Arabic Word">Arabic Word</Label>
        <Input
          id="arabic"
          placeholder="هَلْ"
          onChange={(e) => setArabic(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="Arabic Word">Pronounciation</Label>
        <Input
          id="pronounciation"
          placeholder="Hadha"
          onChange={(e) => setPronounciation(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="translation">Translation (Comma Separated)</Label>
        <Input
          id="translation"
          placeholder="Do, Is, Are"
          onChange={(e) => setTranslation(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (Comma Separated)</Label>
        <Input
          id="tags"
          placeholder="Number, Day"
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Select onValueChange={(e) => setGender(e)}>
          <Label>Gender</Label>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Masculine">Masculine</SelectItem>
            <SelectItem value="Feminine">Feminine</SelectItem>
            <SelectItem value="Neutral">Neutral</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        type="submit"
        disabled={isPending}
        onClick={() => {
          onClick();
          onOpenChange(false);
        }}
      >
        Create
      </Button>
    </form>
  );
}
