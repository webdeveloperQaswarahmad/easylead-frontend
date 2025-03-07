
import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { IoClose, IoSend } from "react-icons/io5";
import { getInitials } from "../utils";

const ChatPopover = ({ users = [] }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState({});
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (users.length > 0) {
      setActiveUser(users[0]);
    }
  }, [users]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeUser) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "me",
    };

    setMessages((prev) => ({
      ...prev,
      [activeUser.id]: [...(prev[activeUser.id] || []), newMessage],
    }));

    setInputMessage("");
  };

  return (
    <Popover className="fixed bottom-6 right-6 z-50">
      {({ open }) => (
        <>
          {open && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"></div>
          )}

          <Popover.Button className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 z-50">
            <BsChatDots size={24} />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute bottom-4 right-0 w-[400px] sm:w-[600px] bg-white shadow-xl rounded-xl overflow-hidden z-50">
              <div className="flex h-[500px]">
                {/* Left - User List */}
                <div className="w-1/3 bg-gray-100 border-r p-3 overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 p-2 mb-3 rounded-lg cursor-pointer hover:bg-gray-200 ${
                        activeUser?.id === user.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setActiveUser(user)}
                    >
                      <div className="w-10 h-10 text-sm bg-blue-600 text-white rounded-full flex items-center justify-center ">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p
                          className="font-semibold text-sm text-gray-500"
                          title={user.name.length > 15 ? user.name : ""}
                        >
                          {user.name}
                        </p>                       
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right - Chat */}
                <div className="w-2/3 flex flex-col">
                  {/* Chat Header */}
                  {activeUser && (
                    <div className="flex items-center justify-between bg-gray-100 p-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                          {getInitials(activeUser.name)}
                        </div>
                        <div>
                          <p className="font-semibold">{activeUser.name}</p>
                          <p className="text-sm text-gray-500">
                            {activeUser.title}
                          </p>
                        </div>
                      </div>
                      <Popover.Button className="text-gray-500 hover:text-gray-700">
                        <IoClose size={24} />
                      </Popover.Button>
                    </div>
                  )}

                  {/* Chat Messages */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2 bg-white">
                    {messages[activeUser?.id]?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-2 rounded-lg max-w-[80%] ${
                          msg.sender === "me"
                            ? "ml-auto bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        {msg.text}
                      </div>
                    ))}

                    {!messages[activeUser?.id]?.length && (
                      <p className="text-center text-sm text-gray-500">
                        No messages yet.
                      </p>
                    )}
                  </div>

                  {/* Chat Footer */}
                  <div className="p-3 border-t bg-gray-50">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="w-full p-2 pr-10 border rounded-lg"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                      >
                        <IoSend size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ChatPopover;
