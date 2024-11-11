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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, Trash } from "lucide-react";
import DefaultPfp from "@/../public/images/Default_pfp.svg";
import { formatDate } from "@/lib/utils";
import { UserType } from "@/lib/types";

type ConversationDrawerContentProps = {
  selectedUser: UserType;
  onDelete: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ConversationDrawerContent({
  selectedUser,
  onDelete,
}: ConversationDrawerContentProps) {
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={selectedUser.image || DefaultPfp.src} />
          <AvatarFallback>CM</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="text-xl font-bold">{selectedUser.name}</div>
          <div className="text-sm text-muted-foreground">{`@${selectedUser.email.split("@")[0]}`}</div>
        </div>
        <div className="text-sm text-muted-foreground">No bio available</div>
      </div>

      <div className="mt-6 grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <div>Last seen 2 hours ago</div>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <div>{formatDate(selectedUser.createdAt)}</div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost">
              <Trash size={20} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="alert-dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                conversation and remove all messages from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}
