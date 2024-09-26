import { auth } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Settings() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.id, session.user.id ?? ""),
  });

  return (
    <div className="px-4">
      <div className="rounded-md shadow-lg bg-stone-100 p-2 pb-3 px-3">
        <h2 className="text-lg text-center font-bold pb-4">Settings</h2>
        <div className="flex gap-4 items-center">
          <div className="rounded-full w-14 h-14 overflow-hidden">
            <img src={userData?.image ?? undefined} alt="profile pic" />
          </div>
          <div>
            <h3 className="font-semibold">{userData?.name}</h3>
            <div className="text-stone-800">{userData?.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
