"use client";
import useUser from "@/hooks/useUser";
import Image from "next/image";

export default function ProfileIcon() {
  const { isLoading, data } = useUser();

  if (isLoading) {
    return (
      <div>
        <div className="h-6 w-12 animate-pulse" />
        <div className="h-12 w-12 rounded-full animate-pulse" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      {!data?.id ? (
        <h1>profile</h1>
      ) : (
        <Image
          src={data.avatar_url || ""}
          alt={data.name || ""}
          width={50}
          height={50}
          className="rounded-full"
        />
      )}
    </div>
  );
}
