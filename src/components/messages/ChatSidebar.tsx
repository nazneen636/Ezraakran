import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar?: string;
}

const chatItems: ChatItem[] = [
  {
    id: "1",
    name: "User 1",
    message: "Hi there",
    time: "Yesterday",
  },
];

export default function ChatSidebar() {
  
  return (
    <div className="w-full border-r flex flex-col h-[calc(100vh-83px)]  shadow-lg md:block">
      <div className="p-6 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-red">Chats</h1>
      </div>

      <div className="p-4 ">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search chats"
            className="pl-10 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-customYellow">
        {chatItems.map((chat) => (
          <div
            key={chat.id}
            className="flex items-center gap-3 p-4 transition-colors cursor-pointer "
          >
            <Avatar>
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="bg-blue-500 text-white bg-red">
                {chat.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-medium text-red  truncate">{chat.name}</p>
                <span className="text-xs text-red ">{chat.time}</span>
              </div>
              <p className="text-sm  text-red truncate">{chat.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
