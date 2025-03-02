import ChatArea from "@/components/messages/ChatArea";
import ChatSidebar from "@/components/messages/ChatSidebar";

import SingleChat from "@/components/messages/SingleChat";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row min-h-[calc(100vh-90px)]">
      {/* Sidebar on larger screens, hidden on small screens */}
      <div className="w-full md:w-[300px] lg:w-[350px] xl:w-[400px]">
        <ChatSidebar />
      </div>

      {/* Chat Area should take full width on small screens, and adjust accordingly on larger screens */}
      <div className="flex-1 w-full">
        {/* <SingleChat/> */}
        <ChatArea />
      </div>

      {/* Optional: Add SingleChat component visibility if necessary */}
      {/* <SingleChat /> */}
    </main>
  );
}
