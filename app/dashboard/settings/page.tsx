import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Settings() {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/");
  }

  const userData = await db.query.users.findFirst({
    where: eq(users.id, session.user.id ?? ""),
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="rounded-full w-14 h-14 overflow-hidden">
              <img src={userData?.image ?? undefined} alt="profile pic" />
            </div>
            <div>
              <h3 className="font-semibold">{userData?.name}</h3>
              <div className="text-stone-800">{userData?.email}</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <form
        className="mt-20"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/",
          });
        }}
      >
        <Button variant="outline" className="w-full" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
