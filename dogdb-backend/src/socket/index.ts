import { Server as SocketIoServer, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { DecodedToken } from "../types";
import { startConversation } from "../controllers/conversationController";
import { sendMessage } from "../controllers/messageController";

interface CustomSocket extends Socket {
  user?: DecodedToken;
}

//function to initialize socket.io(436)
export const initSocket = (server: HttpServer) => {
  const io = new SocketIoServer(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use(async (socket: CustomSocket, next) => {
    const cookies = socket.request.headers.cookie;
    const accessToken = cookies?.split("accessToken=")[1]?.split(";")[0];

    if (!accessToken) {
      return next(new AppError("No access token found", 401));
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET!,
    ) as DecodedToken;

    if (!decoded) {
      return next(new AppError("User not found", 401));
    }

    socket.user = decoded;
    next();
  });

  io.on("connection", (socket: CustomSocket) => {
    console.log(`User ${socket.user?.id} connected`);

    const userId = socket.user?.id;

    if (!userId) {
      return;
    }

    socket.join(userId);

    socket.on("joinConversation", (conversationId: string) => {
      socket.join(conversationId);
      console.log(`User joined conversation ${conversationId}`);
    });

    socket.on("sendMessage", async ({ body, conversationId }, callback) => {
      const response = await sendMessage({ body, conversationId, userId });

      if (response.success) {
        callback({ success: true, message: response.message });
      } else {
        callback({ success: false, error: response.error });
      }
    });

    socket.on(
      "startConversation",
      async ({ userId: otherUserId }, callback) => {
        const userId = socket.user?.id;
        if (!userId) return;

        const response = await startConversation(userId, otherUserId);

        if (response.success) {
          callback({ success: true, conversation: response.conversation });
        } else {
          callback({ success: false, error: response.error });
        }
      },
    );

    //handle socket disconnection
    socket.on("disconnect", () => {
      const userId = socket.user?.id;

      if (userId) {
        console.log(`User ${userId} disconnected`);
      }
    });
  });
  return io;
};
