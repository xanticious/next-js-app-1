import React from "react";
import { sort } from "fast-sort";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

type SortOrder = "name" | "email";
type SortDirection = "asc" | "desc";

interface Props {
  sortOrder: SortOrder;
  sortDirection: SortDirection;
}

const sortUsers = (
  users: User[],
  sortOrder: SortOrder,
  sortDirection: SortDirection
) => {
  if (sortDirection === "asc") {
    return sort(users).by({ asc: sortOrder });
  } else {
    return sort(users).by({ desc: sortOrder });
  }
};

const getTableHeaderInfo = (
  columnId: SortOrder,
  sortOrder: SortOrder,
  sortDirection: SortDirection
) => {
  let suffix = "";
  let linkDirection = "asc";
  if (columnId === sortOrder) {
    if (sortDirection === "asc") {
      suffix = "(A-Z)";
      linkDirection = "desc";
    } else {
      suffix = "(Z-A)";
    }
  } else {
    suffix = "";
  }

  const href = `/users?sortOrder=${columnId}&sortDirection=${linkDirection}`;

  return {
    suffix,
    href,
  };
};

const UserTable = async ({ sortOrder, sortDirection }: Props) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  const users: User[] = await res.json();
  const sortedUsers = sortUsers(users, sortOrder, sortDirection);

  const nameHeaderInfo = getTableHeaderInfo("name", sortOrder, sortDirection);
  const emailHeaderInfo = getTableHeaderInfo("email", sortOrder, sortDirection);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>
            <Link href={nameHeaderInfo.href}>Name {nameHeaderInfo.suffix}</Link>
          </th>
          <th>
            <Link href={emailHeaderInfo.href}>
              Email {emailHeaderInfo.suffix}
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
