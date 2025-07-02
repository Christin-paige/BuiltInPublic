"use client";
import useUser from "@/hooks/useUser/useUser";
import Image from "next/image";

export default function ProfileIcon() {
  const { data } = useUser();

  if (!data?.id) {
    return null;
  }

  return (
    <div>
      <Image
        src={data.avatarUrl || "/default-avatar.png"}
        alt={data.username || "User profile"}
        width={50}
        height={50}
        className="rounded-full"
      />
    </div>
  );
}
