import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function Settings() {
  const user = await currentUser();

  return (
    <div>
      <Card className="light-metal-gradient shadow-xl border-none">
        <CardHeader>
          <CardTitle className="text-center">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="rounded-full w-14 h-14 overflow-hidden">
              <img src={user?.imageUrl ?? undefined} alt="profile pic" />
            </div>
            <div>
              <h3 className="font-semibold">{`${user?.firstName} ${user?.lastName}`}</h3>
              <div className="text-stone-800">
                {user?.primaryEmailAddress?.emailAddress}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <SignOutButton>
        <Button className="w-full mt-16" type="submit">
          Sign Out
        </Button>
      </SignOutButton>
    </div>
  );
}
