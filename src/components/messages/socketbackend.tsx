// import { Server as SocketIOServer } from "socket.io";
// import { AdminChatService } from "../modules/AdminChat/adminchat.service";
// import { chatServices } from "../modules/Chat/chat.services";
// import { updateOrCreateNotification } from "../modules/Notification/notification.service";

// export function initializeSocket(io: SocketIOServer) {
//   io.on("connection", (socket) => {
//     console.log('connected:', socket.id);
//     // ! Joining Helper to Customer Chat Room
    
//     socket.on("joinRoom", async ({ orderId, helperId }) => {
//       try {
//         const roomId =`${orderId}_${helperId}`;
//         socket.join(roomId);
//         console.log(`User joined room: ${roomId}`);

//         socket.data.roomId = roomId;

//         // Fetch and send previous messages to the user in the room
//         const chat = await chatServices.getChatRoom(Number(orderId), helperId);

//         socket.emit("loadMessages", chat?.chatRoom?.messages || []);
//       } catch (error) {
//         console.error(`Error joining room ${orderId} error`);
//       }
//     });

//     // ! helper-to-customer sendMessage logic
//     socket.on("sendMessage", async (data) => {
//       const { chatId, senderId, content, senderRole, orderId } = data;
//       try {
//         // Save the message to the database
//         const message = await chatServices.addMessage(
//           Number(chatId),
//           senderId,
//           content,
//           senderRole
//         );

//         const roomId = socket.data.roomId;

//         // Emit the new message to all users in the room
//         io.to(roomId).emit("receiveMessage", message);

//         // Update or create a notification
//         await updateOrCreateNotification(chatId, senderId, io);
//       } catch (error) {
//         console.error(`Error sending message to room ${orderId}:, error`);
//       }
//     });

//     // ! New admin-to-user joinRoom logic
//     socket.on("joinAdminRoom", async ({ userId }) => {
//       try {
//         const adminRoomId = `admin_${userId}`;
//         socket.join(adminRoomId);

//         // console.log('Admin joined room:', adminRoomId);

//         socket.data.adminRoomId = adminRoomId;

//         const adminChat = await AdminChatService.getAdminChat(userId);

//         socket.emit("loadAdminMessages", adminChat?.adminMessages || []);
//       } catch (error) {
//         console.error(`Error joining admin room for user ${userId}:, error`);
//       }
//     });

//     // ! admin-to-user sendMessage logic
//     socket.on("sendAdminMessage", async ({ chatId, senderId, content }) => {
//       try {
//         const adminRoomId = socket.data.adminRoomId;

//         const message = await AdminChatService.addAdminMessage(
//           Number(chatId),
//           senderId,
//           content
//         );
//         io.to(adminRoomId).emit("receiveAdminMessage", message);

//         // await updateOrCreateNotificationForUser(userId, adminId, io);
//       } catch (error) {
//         console.error(`Error sending admin message to user ${senderId}:,error`);
//       }
//     });

//     // Handle typing indicator
//     socket.on("typing", (data) => {
//       const { chatroomId, username } = data;
//       socket.to(chatroomId).emit("typing", { username });
//     });

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//       // console.log("User disconnected:", socket.id);
//     });
//   });
// }