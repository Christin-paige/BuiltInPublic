"use client";
import Link from "next/link";
import useUser from "../app/hook/useUser";
import Image from "next/image";

export default function ProfileIcon() {
  const { isFetching, data } = useUser();

  if (isFetching) {
    return <></>;
  }
  return (
    <Link href={`/profile`}>
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
    </Link>
  );
}
