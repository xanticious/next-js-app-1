import React, { Suspense } from "react";
import UserTable from "./UserTable";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ sortOrder: string; sortDirection: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { sortOrder: sortOrderParam, sortDirection: sortDirectionParam } =
    await searchParams;

  const sortOrder = sortOrderParam === "email" ? "email" : "name";
  const sortDirection = sortDirectionParam === "desc" ? "desc" : "asc";

  return (
    <>
      <h1>Users</h1>
      <Link href="/users/new" className="btn">
        New User
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <UserTable sortOrder={sortOrder} sortDirection={sortDirection} />
      </Suspense>
    </>
  );
};

export default UsersPage;
