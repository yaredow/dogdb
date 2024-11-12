"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

// Define an inline type for the emoji to include the native property
interface Emoji {
  native: string;
}

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}

export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button aria-label="Pick an emoji">
          <SmileIcon className="h-5 w-5 text-muted-foreground transition hover:text-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <Picker
          emojiSize={18}
          theme="light"
          data={data}
          maxFrequentRows={1}
          onEmojiSelect={(emoji: Emoji) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
};
