"use client";

import useUser from "@/hooks/useUser/useUser";
import Image from "next/image";

interface UserData {
  id: string;
  username: string | null;
  avatarUrl: string | null;
}

export default function Profile() {
  const { isLoading, data } = useUser() as {
    isLoading: boolean;
    data: UserData | null;
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 gap-4">
      {!data?.id ? (
        <h1>profile</h1>
      ) : (
        <Image
          src={data.avatarUrl || "/default-avatar.png"}
          alt={data.username || "User avatar"}
          width={100}
          height={100}
          className="rounded-full"
        />
      )}

      <h1 className="text-md font-bold justify-items-center">
        {data?.username}
      </h1>
    </div>
  );
}
