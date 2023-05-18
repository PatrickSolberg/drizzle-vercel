import Image from "next/image";
import { db, UsersTable, timeAgo } from "../db/db";
import type { User } from "../db/db";
import { seed } from "../db/schema";

export default async function Home() {
  let users;
  let startTime = Date.now();
  try {
    users = await db.select().from(UsersTable);
  } catch (e: any) {
    if (e.message === `relation "users" does not exist`) {
      console.log(
        "Table does not exist, creating and seeding it with dummy data now..."
      );
      // Table is not created yet
      await seed();
      startTime = Date.now();
      users = await db.select().from(UsersTable);
    } else {
      throw e;
    }
  }

  const duration = Date.now() - startTime;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1 className="text-6xl font-bold text-center">
          Welcome to <span className="text-blue-500">Next.js</span>
        </h1>
        {users.map((user) => (
          <div
            key={user.name}
            className="flex items-center justify-between py-3"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full ring-1 ring-gray-900/5"
              />
              <div className="space-y-1">
                <p className="font-medium leading-none">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">{timeAgo(user.createdAt)}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
