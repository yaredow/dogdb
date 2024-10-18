import { toast } from "./use-toast";

export default function useCopyToClipboard(path: string) {
  const copytoClipboard = async () => {
    try {
      await navigator.clipboard.writeText(path);
      toast({
        description: "Copied to clipboard",
      });
    } catch (error) {
      console.error("Can not copy to the clipboard", error);
    }
  };

  return { copytoClipboard };
}
