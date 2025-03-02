import { Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChatArea() {
  return (
    <div className="flex-1 flex flex-col w-full h-[calc(100vh-83px)] ">
      <div className="p-4 border-b flex justify-between items-center shadow-sm ">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-red text-white">U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-bold text-red">User 1</h2>
            <p className="text-sm text-red">Last seen: Yesterday</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 ">
        <p className="text-center text-white italic">No messages yet.</p>
      </div>

      <div className="p-4 border-t  shadow-sm flex items-center gap-3">
        {/* <Button variant="ghost" size="icon" className="text-gray-500">
          <Paperclip className="h-6 w-6" />
        </Button> */}
        <Input
          placeholder="Type a message..."
          className="flex-1 bg-blue rounded-lg border-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          variant="ghost"
          size="icon"
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          <Send className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
