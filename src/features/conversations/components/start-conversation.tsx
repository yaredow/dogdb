"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import { useGetBreedOwners } from "@/features/users/api/use-get-breed-owners";

type NewConversationProps = {
  breedId: string;
};

export default function NewConversation({ breedId }: NewConversationProps) {
  const { breedOwners: users } = useGetBreedOwners({ breedId });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    console.log("log");
  };

  const resetSearch = async () => {
    console.log("log");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Your Chat App</h1>
      <p className="text-xl mb-8">
        You haven&apos;t started any conversations yet.
      </p>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button size="lg">Start Conversation</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose a User to Chat With</DialogTitle>
            <DialogDescription>
              {isSearching
                ? `Search results for "`
                : `These users have the same dog breed as you.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2 mb-4">
            <Input type="text" placeholder="Search users..." />
            <Button onClick={handleSearch} aria-label="Search users">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="mt-4 max-h-[60vh]">
            <div className="space-y-4">
              {users?.map((user) => (
                <Button
                  key={user.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // Handle starting a conversation with this user
                    console.log(`Starting conversation with ${user.name}`);
                    setIsDialogOpen(false);
                    resetSearch();
                  }}
                >
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarImage src={user?.image || ""} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.name}
                </Button>
              ))}
            </div>
          </ScrollArea>
          {isSearching && (
            <Button className="mt-4" onClick={resetSearch}>
              Back to Same Breed Users
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
