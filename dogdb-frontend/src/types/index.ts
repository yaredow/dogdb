export type Breed = {
  id: string;
  breedName: string;
  breedShortDescription: string;
  breedLongDescription: string;
  breedCharacteristics: string[];
  breedImages: string[];
  traits: string[];
  diseases: string[];
  averageHeight: number;
  averageWeight: number;
  lifeExpectancy: number;
  temperament: string;
  hairShedding: string;
  activity: string;
  sociability: string;
  intelligence: string;
  childFriendly: string;
  careLevel: string;
  healthProblems: string;
  geneticProfile: string;
  feedingHabits: string;
  slug: string;
  user: UserBreed[]; // Assuming you have a type for UserBreed
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string | null;
  emailVerified?: Date | null;
  password?: string | null;
  image?: string | null;
  role: "USER" | "ADMIN"; // Adjust this based on the roles you define
  updatedAt: Date;
  bio?: string | null;
  userName?: string | null;
  breeds: UserBreed[];
  followers: Follows[];
  following: Follows[];
  createdAt: Date;
  conversations: Conversation[];
  seenMessages: Message[];
  messages: Message[];
  blockedUsers: Block[];
  blockedBy: Block[];
  active: boolean;
  verified: boolean;
  passwordChangedAt?: Date | null;
  passwordResetToken?: string | null;
  passwordResetExpires?: Date | null;
  emailVerificationToken?: string | null;
  emailVerificationExpires?: Date | null;
};

export type UserBreed = {
  id: string;
  breedId: string;
  userId: string;
  // Add other fields related to the UserBreed model if necessary
};

export type Follows = {
  // Define fields for the Follows relationship
};

export type Message = {
  id: string;
  body?: string | null;
  image?: string | null;
  createdAt: Date;
  seen: User[]; // Array of users who have seen the message
  conversationId: string;
  conversation: Conversation; // The conversation the message belongs to
  senderId: string;
  sender: User; // The user who sent the message
};

export type Conversation = {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  name?: string | null;
  messages: Message[]; // Array of messages in the conversation
  users: User[]; // Array of users participating in the conversation
};

export type Block = {
  // Define fields for the Block relationship
};

export type DecodedToken = {
  id: string;
  iat: number;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  userName: string;
  bio: string;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
