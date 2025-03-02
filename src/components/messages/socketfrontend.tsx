// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { RootState } from "@/redux/store";
// import { UserRole } from "@/types/common";
// import { Menu, Send } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { io, Socket } from "socket.io-client";

// type ChatAreaProps = {
//   isSidebarOpen: boolean;
//   setIsSidebarOpen: (isOpen: boolean) => void;
//   chatRoom: any;
//   orderId: number;
//   helperId: string;
// };

// interface Message {
//   id: number;
//   chatId: number;
//   senderId: number;
//   content: string;
//   senderRole: "CUSTOMER" | "HELPER";
//   createdAt: string;
// }

// const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

// export default function ChatArea({ isSidebarOpen, setIsSidebarOpen, chatRoom, orderId, helperId }: ChatAreaProps) {
//   const user = useSelector((state: RootState) => state.user.user);

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [senderId, setSenderId] = useState<number | null>(null);
//   const [senderRole, setSenderRole] = useState<"CUSTOMER" | "HELPER" | "">("");

//   const scrollAreaRef = useRef<HTMLDivElement>(null);
//   const lastMessageRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!orderId && !helperId) return;

//     const socketInstance = io(SOCKET_URL); // Replace with your server URL
//     setSocket(socketInstance);

//     // Join the room
//     socketInstance.emit("joinRoom", { orderId, helperId });

//     // Listen for previous messages
//     socketInstance.on("loadMessages", (messages: Message[]) => {
//       setMessages(messages);
//     });

//     // Listen for new messages
//     socketInstance.on("receiveMessage", (message: Message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     // Clean up on unmount
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, [orderId, helperId]);

//   useEffect(() => {
//     if (user?.role === UserRole.CUSTOMER) {
//       setSenderId(chatRoom?.customer?.id);
//       setSenderRole("CUSTOMER");
//     } else if (user?.role === UserRole.HELPER) {
//       setSenderId(chatRoom?.helper?.id);
//       setSenderRole("HELPER");
//     }
//   }, [chatRoom, user]);

//   const handleSendMessage = (e: any) => {
//     e.preventDefault();
//     if (!newMessage.trim() || !socket || !senderId || !senderRole) return;

//     socket.emit("sendMessage", {
//       orderId: orderId,
//       chatId: chatRoom.id,
//       senderId: user?.id,
//       content: newMessage,
//       senderRole,
//     });

//     setNewMessage("");
//   };

//   // // Scroll to the last message when new messages are added
//   // useEffect(() => {
//   //   if (lastMessageRef.current) {
//   //     lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//   //   }
//   // }, [messages]);

//   // Scroll to the last message when new messages are added
//   useEffect(() => {
//     if (lastMessageRef.current && scrollAreaRef.current) {
//       // Get the current scroll position
//       const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;

//       // Check if the user is near the bottom
//       const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // Allow a small buffer

//       if (isAtBottom) {
//         lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, [messages]);

//   return (
//     <div className="flex-1 flex flex-col">
//       {/* Chat Header */}
//       <div className="bg-white border-b p-4 flex items-center">
//         <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//           <Menu className="h-6 w-6" />
//         </Button>
//         <Avatar className="h-10 w-10">
//           <AvatarImage src="

// [**https://api.dicebear.com/6.x/initials/svg?seed=Alice**](https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.dicebear.com%2F6.x%2Finitials%2Fsvg%3Fseed%3DAlice%26fbclid%3DIwZXh0bgNhZW0CMTAAAR0yGJM6GS5ocHRi4JV7xJKV2rWq2EjXJUZB3NTgO-TYpYgrBfj_YTklU9s_aem_R8lqfTe0p-5aHw5eB0BuWA&h=AT3Sxl1AX3lNwvOhWWA_bIYdysh52ZFoC8U5OtKTThlZN5rKJ5eqnAtYO4wOR0Kez8AGrVgrFEKhVobJ9UqyUUkmH2ucYXyeeoLR-cz7HHb5FUt9AZJsW84ZixJ3aDr_PFAM8g)

// " />
//           <AvatarFallback>A</AvatarFallback>
//         </Avatar>
//         <div className="ml-3">
//           <p className="font-medium">{chatRoom?.order?.subject}</p>
//           <p className="text-sm text-gray-500">
//             {user?.role === UserRole.CUSTOMER ? chatRoom?.helper?.firstName : chatRoom?.customer?.firstName}
//           </p>
//         </div>
//       </div>

//       {/* Messages */}
//       <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
//         <div className="space-y-4 h-[calc(68vh-100px)] flex flex-col">
//           {messages.map((message, index) => (
//             <div
//               key={message.id}
//               ref={index === messages.length - 1 ? lastMessageRef : null}
//               className={` ${message.senderRole === user?.role ? "self-end ml-auto" : "self-start"}`}
//             >
//               <div
//                 className={`flex items-end ${
//                   message.senderRole === user?.role ? "flex-row-reverse gap-x-2" : "flex-row"
//                 }`}
//               >
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage
//                     src={`

// [**https://api.dicebear.com/6.x/initials/svg?seed=$**](https://l.facebook.com/l.php?u=https%3A%2F%2Fapi.dicebear.com%2F6.x%2Finitials%2Fsvg%3Fseed%3D%2524%26fbclid%3DIwZXh0bgNhZW0CMTAAAR10j0C6beAL2JXGS4VdMav2sI_hPKIoj6_VVGvfvvOpugK9NQk90pfrI74_aem_SWGTlQB2eeV1K5_Esr8K0g&h=AT3Sxl1AX3lNwvOhWWA_bIYdysh52ZFoC8U5OtKTThlZN5rKJ5eqnAtYO4wOR0Kez8AGrVgrFEKhVobJ9UqyUUkmH2ucYXyeeoLR-cz7HHb5FUt9AZJsW84ZixJ3aDr_PFAM8g)

// {
//                       message.senderRole === "CUSTOMER" ? chatRoom?.customer?.firstName : chatRoom?.helper?.firstName
//                     }`}
//                   />
//                   <AvatarFallback>{message.senderRole.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div className="ml-2 bg-white rounded-lg p-3 max-w-xs">
//                   <p className="text-sm">{message.content}</p>
//                   <span className="text-xs text-gray-400 mt-1 block">
//                     {new Date(message.createdAt).toLocaleString()}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </ScrollArea>

//       {/* Message Input */}
//       <div className="bg-white border-t p-4">
//         <form onSubmit={handleSendMessage} className="flex items-center">
//           <Input
//             placeholder="Type a message..."
//             className="flex-1"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//           />
//           <Button
//             type="submit"
//             // onClick={handleSendMessage}
//             size="icon"
//             className="ml-2 bg-orange-500 hover:bg-orange-600"
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }