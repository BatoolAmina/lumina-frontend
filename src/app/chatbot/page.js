"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TbPlus, TbMessages, TbLogout, TbLayoutSidebarLeftExpand, 
  TbUser, TbTrash, TbWand, TbCheck, TbX, TbLoader2 
} from "react-icons/tb";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ChatPage from "@/components/layout/ChatInterface";

export default function ChatbotLayout() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (window.innerWidth > 1024) setIsSidebarOpen(true);
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/chat/history/list');
      setChatHistory(response.data?.data?.chats || []);
    } catch (error) {
      console.error("Neural Link Sync Error:", error);
    }
  };

  useEffect(() => {
    if (session?.user) fetchHistory();
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#030712]">
        <TbLoader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  if (!session) return null;

  const handleDelete = async (chatId) => {
    const confirmed = window.confirm("Delete this protocol? This cannot be undone.");
    if (!confirmed) return;
    try {
      await api.delete(`/chat/history/${chatId}`);
      if (currentChatId === chatId) setCurrentChatId(null);
      await fetchHistory();
    } catch (error) {
      console.error(error);
    }
  };

  const handleRename = async (chatId, newTitle) => {
    try {
      await api.patch(`/chat/history/${chatId}`, { title: newTitle });
      await fetchHistory();
    } catch (error) {
      console.error("Rename Sync Error:", error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#030712] text-slate-100 relative">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -320 }} animate={{ x: 0 }} exit={{ x: -320 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-40 flex w-[280px] sm:w-80 shrink-0 flex-col border-r border-slate-800/50 bg-[#0b1120] lg:static lg:z-auto"
          >
            <div className="flex items-center justify-between border-b border-slate-800/50 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden">
                  <Image src="/favicon.jpg" alt="Lumina Logo" width={48} height={48} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold tracking-tight text-white italic">Lumina</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.1em] text-cyan-400">IGNITE. INTEGRATE. INNOVATE</span>
                </div>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 transition-colors">
                <TbLayoutSidebarLeftExpand className="h-5 w-5 rotate-180" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <button 
                onClick={() => { setCurrentChatId(null); if(window.innerWidth < 1024) setIsSidebarOpen(false); }} 
                className="mb-6 flex w-full items-center gap-3 rounded-xl bg-violet-600 p-3 text-sm font-bold transition-all hover:bg-violet-500 shadow-lg shadow-violet-600/10"
              >
                <TbPlus className="h-5 w-5" /> New Session
              </button>
              
              <div className="space-y-2">
                <p className="px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">Neural History</p>
                {chatHistory.map((chat) => (
                  <HistoryItem 
                    key={chat._id} 
                    chat={chat} 
                    isActive={currentChatId === chat._id}
                    onSelect={(id) => { 
                      setCurrentChatId(id); 
                      if(window.innerWidth < 1024) setIsSidebarOpen(false); 
                    }}
                    onDelete={handleDelete}
                    onRename={handleRename}
                  />
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800/50 bg-[#080d1a] p-4">
              <div className="flex items-center gap-3 p-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-800 font-bold text-violet-400 uppercase shadow-inner">
                  {session?.user?.name?.[0] || <TbUser />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-slate-200">{session?.user?.name || 'Architect'}</p>
                  <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-[10px] font-bold uppercase text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors">
                    <TbLogout className="h-3 w-3" /> Terminate Session
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <ChatPage 
        currentChatId={currentChatId} 
        setCurrentChatId={setCurrentChatId}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        fetchHistory={fetchHistory}
        chatHistory={chatHistory}
      />
    </div>
  );
}

function HistoryItem({ chat, isActive, onSelect, onDelete, onRename }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(chat.title);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setEditValue(chat.title);
  }, [chat.title]);

  const submitRename = async () => {
    if (editValue.trim() !== "" && editValue !== chat.title) {
      setIsRenaming(true);
      try {
        await onRename(chat._id, editValue);
      } finally {
        setIsRenaming(false);
      }
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this chat? This protocol cannot be recovered.");
    if (!confirmed) return;
    setIsDeleting(true);
    try {
      await onDelete(chat._id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="flex items-center gap-2 rounded-xl bg-slate-800 p-2 border border-violet-500/50 shadow-inner">
          <input 
            autoFocus
            className="w-full bg-transparent text-sm outline-none text-slate-100 px-1"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') submitRename();
              if (e.key === 'Escape') {
                setEditValue(chat.title);
                setIsEditing(false);
              }
            }}
            disabled={isRenaming}
          />
          <button onClick={submitRename} disabled={isRenaming} className="text-emerald-500 hover:text-emerald-400 transition-colors disabled:opacity-50">
            {isRenaming ? <TbLoader2 className="h-4 w-4 animate-spin" /> : <TbCheck className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => {
              setEditValue(chat.title);
              setIsEditing(false);
            }} 
            disabled={isRenaming}
            className="text-slate-500 hover:text-slate-400 transition-colors disabled:opacity-50"
          >
            <TbX className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <button 
            onClick={() => onSelect(chat._id)}
            disabled={isDeleting}
            className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all ${
              isActive ? 'bg-violet-500/10 border border-violet-500/20 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            } ${isDeleting ? 'opacity-50' : ''}`}
          >
            <TbMessages className={`h-4 w-4 shrink-0 ${isActive ? 'text-violet-400' : 'text-slate-500'}`} />
            <span className="truncate text-sm font-medium pr-12">
              {chat.title || 'Untitled Protocol'}
            </span>
          </button>
          
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              disabled={isDeleting}
              className="p-1.5 text-slate-500 hover:text-violet-400 transition-colors disabled:opacity-50"
              title="Rename Session"
            >
              <TbWand className="h-4 w-4" />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); handleDelete(); }} 
              disabled={isDeleting}
              className="p-1.5 text-slate-500 hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10 disabled:opacity-50"
              title="Delete Session"
            >
              {isDeleting ? <TbLoader2 className="h-4 w-4 animate-spin" /> : <TbTrash className="h-4 w-4" />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}