"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  TbPaperclip, TbSend, TbLayoutSidebarLeftExpand, TbWand, 
  TbPhoto, TbFileText, TbRobot, TbUser, TbLoader2, TbX, TbCopy, TbCheck,
  TbCode, TbMessageChatbot, TbSearch, TbArtboard, TbPencil, TbFileDescription
} from "react-icons/tb";
import api from "@/lib/api";

export default function ChatPage({ 
  currentChatId, 
  setCurrentChatId, 
  isSidebarOpen, 
  setIsSidebarOpen, 
  fetchHistory,
  chatHistory 
}) {
  const [input, setInput] = useState("");
  const [imageAction, setImageAction] = useState("none");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [error, setError] = useState(null);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (currentChatId) {
      loadChatHistory(currentChatId);
    } else {
      setMessages([]);
    }
  }, [currentChatId]);

  const loadChatHistory = async (id) => {
    setIsLoading(true);
    try {
      const response = await api.get(`/chat/history/${id}`);
      setMessages(response.data?.data?.messages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      setAttachedFile({
        name: file.name,
        type: file.type,
        file: file,
        preview: isImage ? URL.createObjectURL(file) : null
      });
      setImageAction("none");
    }
    event.target.value = null;
  };

  const startMessageEdit = (message) => {
    if (message.role !== 'user') return;
    setEditingMessageId(message.id || message._id);
    setEditingContent(message.content);
  };

  const cancelMessageEdit = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const copyMessageText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error(err);
    }
  };

  const submitEditedMessage = async (messageId) => {
    const newContent = editingContent.trim();
    if (!newContent) return;

    const messageIndex = messages.findIndex(m => (m.id === messageId || m._id === messageId));
    if (messageIndex === -1) return;

    const truncatedHistory = messages.slice(0, messageIndex);
    const targetMessage = messages[messageIndex];
    
    const userMessage = {
      ...targetMessage,
      content: newContent,
      id: messageId,
      _id: messageId
    };

    setMessages([...truncatedHistory, userMessage]);
    setEditingMessageId(null);
    setEditingContent("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("content", newContent);
      formData.append("chatId", currentChatId);
      formData.append("isEdit", "true");
      formData.append("editMessageId", messageId);

      const response = await api.post('/chat/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const { botMessage, isFirstMessage } = response.data?.data;

      setMessages(prev => [...prev, {
        role: "assistant",
        content: botMessage.content,
        imageUrl: botMessage.imageUrl || null,
        id: botMessage._id || Date.now().toString()
      }]);

      if ((isFirstMessage || messageIndex === 0) && fetchHistory) {
        await fetchHistory();
      }
    } catch (err) {
      setError("Failed to sync edit.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (overrideInput) => {
    const finalInput = overrideInput || input;
    if (!finalInput.trim() && !attachedFile && imageAction !== "generate") return;

    const isNewSession = !currentChatId;
    const currentFile = attachedFile?.file;
    const fileName = attachedFile?.name;

    const userMessage = {
      role: "user",
      content: finalInput || (currentFile ? `Sent file: ${fileName}` : ""),
      id: Date.now().toString(),
      imageUrl: attachedFile?.preview || null,
      attachmentName: !attachedFile?.preview ? fileName : null
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setAttachedFile(null);
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("content", finalInput || "");
    formData.append("imageAction", imageAction);
    
    if (currentChatId) {
      formData.append("chatId", currentChatId);
    }
    
    if (currentFile) {
      formData.append("files", currentFile);
    }

    try {
      const response = await api.post('/chat/send', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const { botMessage, chatId, isFirstMessage } = response.data?.data;

      setMessages(prev => [...prev, {
        role: "assistant",
        content: botMessage.content,
        imageUrl: botMessage.imageUrl || null,
        id: botMessage._id || Date.now().toString()
      }]);

      if (isNewSession || isFirstMessage) {
        setCurrentChatId(chatId);
        if (fetchHistory) fetchHistory();
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: `❌ Neural Link Error: ${err.response?.data?.message || "Check file size or type"}`,
        isError: true,
        id: Date.now().toString()
      }]);
    } finally {
      setIsLoading(false);
      setImageAction("none");
    }
  };

  return (
    <div className="relative flex flex-1 flex-col bg-[#030712] w-full">
      <header className="z-10 flex h-16 shrink-0 items-center justify-between border-b border-slate-800/40 px-4 sm:px-6 backdrop-blur-md">
        <div className="flex items-center gap-4">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 transition-colors">
              <TbLayoutSidebarLeftExpand className="h-5 w-5" />
            </button>
          )}
          <h2 className="text-sm font-bold tracking-tight text-slate-400 truncate max-w-[200px]">
            {currentChatId ? (chatHistory.find(c => c._id === currentChatId)?.title || 'Neural Thread') : 'Lumina 1.0'}
          </h2>
        </div>
        
        <button 
          onClick={() => setImageAction(imageAction === "generate" ? "none" : "generate")} 
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all ${
            imageAction === "generate" 
              ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/20" 
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          <TbWand className="h-3.5 w-3.5" /> Architect Mode
        </button>
      </header>

      <main className="flex-1 overflow-y-auto custom-scrollbar relative">
        <AnimatePresence mode="wait">
          {messages.length === 0 && !isLoading ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="flex h-full flex-col items-center justify-center px-6 text-center"
            >
              <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-2xl">
                <TbRobot className="h-10 w-10 text-white" />
              </div>
              <h1 className="mb-4 text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent sm:text-4xl">
                How can I help you today?
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
                {[
                  { icon: <TbCode />, label: "Explain code", prompt: "Explain the architectural pattern in this code..." },
                  { icon: <TbArtboard />, label: "Generate UI", prompt: "Generate a modern dashboard UI concept..." },
                  { icon: <TbSearch />, label: "Analyze PDF", prompt: "Summarize this document..." },
                  { icon: <TbMessageChatbot />, label: "Brainstorm ideas", prompt: "Let's brainstorm some ideas..." }
                ].map((card, idx) => (
                  <button key={idx} onClick={() => handleSend(card.prompt)} className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#0b1120] p-4 text-left transition-all hover:border-violet-500/50 hover:bg-slate-800/50 group">
                    <div className="rounded-lg bg-slate-900 p-2 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">{card.icon}</div>
                    <span className="text-sm font-medium text-slate-300">{card.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="mx-auto max-w-4xl p-6 space-y-8">
              {messages.map((msg, i) => (
                <motion.div key={msg.id || msg._id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 sm:gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm ${msg.role === 'assistant' ? 'bg-gradient-to-tr from-violet-600 to-indigo-600' : 'border border-slate-700 bg-slate-800'}`}>
                    {msg.role === 'assistant' ? <TbRobot className="h-6 w-6 text-white" /> : <TbUser className="h-6 w-6 text-slate-300" />}
                  </div>
                  
                  <div className={`flex max-w-[85%] flex-col gap-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="group relative w-full">
                      {editingMessageId === (msg.id || msg._id) ? (
                        <div className="w-full bg-slate-900 rounded-2xl p-3 border border-violet-500/50 shadow-xl">
                          <textarea 
                            autoFocus
                            value={editingContent}
                            onChange={(e) => setEditingContent(e.target.value)}
                            className="w-full bg-transparent text-slate-100 text-[15px] outline-none resize-none min-h-[80px]"
                          />
                          <div className="flex justify-end gap-2 mt-2">
                            <button onClick={cancelMessageEdit} className="px-3 py-1 text-xs text-slate-400 hover:text-white transition-colors">Cancel</button>
                            <button onClick={() => submitEditedMessage(msg.id || msg._id)} className="bg-violet-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-violet-500 transition-all">Save & Submit</button>
                          </div>
                        </div>
                      ) : (
                        <div className={`rounded-2xl p-4 text-[15px] leading-relaxed shadow-sm ${msg.role === 'user' ? 'rounded-tr-none bg-violet-600 text-white' : 'rounded-tl-none border border-slate-800 bg-[#111827] text-slate-200'}`}>
                          <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-900/50 prose-strong:text-white prose-headings:text-slate-100 prose-code:text-violet-400 prose-code:bg-slate-800/50 prose-code:px-1 prose-code:rounded">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                          </div>
                          
                          {msg.attachmentName && (
                             <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-3">
                                <TbFileDescription className="h-8 w-8 text-violet-400" />
                                <span className="text-xs font-medium text-slate-300 truncate">{msg.attachmentName}</span>
                             </div>
                          )}

                          {msg.imageUrl && (
                            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                              <img src={msg.imageUrl} alt="Neural Output" className="max-h-[500px] w-full object-contain bg-[#030712]" />
                            </div>
                          )}
                        </div>
                      )}
                      
                      {!editingMessageId && (
                        <div className={`absolute top-0 mt-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${msg.role === 'user' ? 'right-full mr-2' : 'left-full ml-2'}`}>
                          {msg.role === 'user' && (
                            <button onClick={() => startMessageEdit(msg)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-violet-400 border border-slate-700 transition-colors shadow-sm">
                              <TbPencil className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button onClick={() => copyMessageText(msg.content)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-violet-400 border border-slate-700 transition-colors shadow-sm">
                            <TbCopy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/20"><TbRobot className="h-6 w-6 text-white" /></div>
                  <div className="flex items-center gap-2.5 rounded-2xl rounded-tl-none border border-slate-800 bg-[#111827] p-4 shadow-sm">
                    <TbLoader2 className="h-5 w-5 animate-spin text-violet-500" /><span className="text-xs font-bold uppercase tracking-widest text-slate-500">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </AnimatePresence>
      </main>

      <footer className="p-6 bg-gradient-to-t from-[#030712] to-transparent">
        <div className="mx-auto max-w-4xl w-full relative">
          <AnimatePresence>
            {attachedFile && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute -top-20 left-0 right-0 z-20 flex items-center gap-4 rounded-2xl border border-violet-500/30 bg-[#111827] p-3 shadow-xl">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-violet-500/10">
                  {attachedFile.preview ? <img src={attachedFile.preview} className="h-10 w-10 object-cover rounded shadow-sm" /> : <TbFileText className="h-6 w-6 text-violet-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-bold text-slate-200">{attachedFile.name}</p>
                  <p className="text-[10px] font-bold uppercase text-violet-500">Buffer Loaded</p>
                </div>
                <button onClick={() => setAttachedFile(null)} className="rounded-full p-2 text-slate-500 hover:bg-slate-800 transition-colors"><TbX className="h-5 w-5" /></button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative flex items-end gap-3 rounded-3xl border border-slate-800 bg-[#0f172a] p-2 shadow-2xl focus-within:border-violet-500/50 transition-all">
            <button onClick={() => fileInputRef.current?.click()} className="p-3.5 text-slate-500 hover:text-violet-400 transition-colors"><TbPaperclip className="h-6 w-6" /></button>
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
              placeholder={imageAction === "generate" ? "Describe visual..." : "Synthesize new logic..."}
              className="max-h-40 flex-1 resize-none border-none bg-transparent py-3.5 px-1 text-[15px] focus:ring-0 placeholder:text-slate-600 text-slate-100"
              rows={1}
            />
            <button onClick={() => handleSend()} disabled={isLoading} className="rounded-2xl bg-violet-600 p-3.5 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-500 disabled:opacity-50 transition-all">
              <TbSend className="h-6 w-6" />
            </button>
          </div>
          <input ref={fileInputRef} type="file" onChange={handleFileUpload} className="hidden" accept="image/*,.pdf,.doc,.docx,.txt" />
        </div>
      </footer>
    </div>
  );
}