"use client";
import * as React from "react";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useMediaQuery } from "@/app/hooks/use_media_query";
import { EditWord } from "@/app/actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

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

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function EditWordButton({ word }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            Edit Word
            <Pencil className="w-4 h-4 ml-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Word</DialogTitle>
            <DialogDescription>
              Edit details about the word here. Click save when you&apos;re
              ready to make changes.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm word={word} onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          Edit Word
          <Pencil className="w-4 h-4 ml-3" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Word</DrawerTitle>
          <DrawerDescription>
            Edit details about the word here. Click save when you&apos;re ready
            to make changes.
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

function ProfileForm({ className, word, onOpenChange }) {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: {
      arabic: word ? word.arabic : "",
      translation: word ? word.translation.join(", ") : "",
      pronounciation: word ? word.pronounciation : "",
      tags: word ? word.tags.join(", ") : "",
      gender: word ? word.gender : "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    startTransition(async () => {
      const obj = await EditWord(
        word._id,
        values.arabic,
        values.translation,
        values.pronounciation,
        values.tags,
        values.gender
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid items-start gap-2"
      >
        <FormField
          control={form.control}
          name="arabic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arabic Word</FormLabel>
              <FormControl>
                <Input placeholder={word ? word.arabic : ""} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pronounciation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pronounciation</FormLabel>
              <FormControl>
                <Input
                  placeholder={word ? word.prnounciation : ""}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="translation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Translations</FormLabel>
              <FormControl>
                <Input
                  placeholder={word ? word.translation.join(", ") : ""}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The translations of the word (comma seperated).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder={word ? word.tags.join(", ") : ""}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The tags for this word (comma seperated).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Masculine">Masculine</SelectItem>
                  <SelectItem value="Feminine">Feminine</SelectItem>
                  <SelectItem value="Neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button onClick={() => onOpenChange(false)} type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
