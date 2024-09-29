"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";
import Picker from "@emoji-mart/react";
import data, { Emoji as OriginalEmoji } from "@emoji-mart/data";

interface Emoji extends OriginalEmoji {
  native: string; // Ensure this matches the actual structure you're expecting
}

interface EmojiPickerProps {
  onChange: (emoji: string) => void;
}
export const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <SmileIcon className="h-5 w-5 text-muted-foreground transition hover:text-foreground" />
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
