"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { useActions } from "ai/rsc";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";

export default function Home() {
  const { sendMessage } = useActions();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Array<ReactNode>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage =
        "您好！我是智医助手，您的智能医疗咨询伙伴。我可以帮您分析症状、提供初步健康指导，并为您推荐合适的专科医生。请注意，我提供的信息仅供参考，不能替代专业医生的面诊。请问您今天有什么不适或症状需要咨询呢？";

      setMessages([
        <Message key="welcome" role="assistant" content={welcomeMessage} />,
      ]);
    }
  }, [messages.length]);
  return (
    <div className="flex flex-row justify-center pb-20 h-dvh bg-white dark:bg-zinc-900">
      <div className="flex flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-3 h-full w-dvw items-center overflow-y-scroll"
        >
          {messages.map((message) => message)}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="flex flex-col gap-2 relative items-center"
          onSubmit={async (event) => {
            event.preventDefault();

            setMessages((messages) => [
              ...messages,
              <Message key={messages.length} role="user" content={input} />,
            ]);
            setInput("");

            const response: ReactNode = await sendMessage(input);
            setMessages((messages) => [...messages, response]);
          }}
        >
          <input
            ref={inputRef}
            className="bg-zinc-100 h-12 text-sm rounded-md px-2 py-1.5 w-full outline-none dark:bg-zinc-700 text-zinc-800 dark:text-zinc-300 md:max-w-[500px] max-w-[calc(100dvw-32px)]"
            placeholder="我是医疗助手，可以帮你预约医院科室，分析检查报告等"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
