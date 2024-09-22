"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  id: string;
}

export default function PageHeader({ id }: PageHeaderProps) {
  const router = useRouter();
  const chat = useQuery(api.chats.getById, { _id: id });

  // UPDATE CHAT
  const updateChat = useMutation(api.chats.updateChat);

  const handleUpdate = () => {
    updateChat({ _id: id, title: "New Title" });
  };

  // DELETE CHAT
  const deleteChat = useMutation(api.chats.deleteChat);

  const handleDelete = () => {
    deleteChat({ _id: id });
    router.push("/");
  };

  return (
    <header className="flex sticky top-0 justify-between items-center w-full backdrop-blur-3xl px-4 border-b border-white/10 py-1">
      <Button
        variant="ghost"
        className="hover:bg-white/10"
        onClick={() => router.back()}
      >
        <FaArrowLeft className="text-white" />
      </Button>

      <h2 className="text-xl font-bold text-amber-500">{chat?.title}</h2>

      <div className="flex gap-2">
        <Button
          variant={"ghost"}
          className="hover:bg-amber-600/90"
          onClick={handleUpdate}
        >
          <FaEdit className="text-destructive-foreground" />
        </Button>
        <Button
          variant={"ghost"}
          className="hover:bg-destructive/90"
          onClick={handleDelete}
        >
          <FaTrash className="text-destructive-foreground" />
        </Button>
      </div>
    </header>
  );
}
