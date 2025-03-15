import { getSession } from "@/features/auth/apis/get-session";
import { redirect } from "next/navigation";

export default async function Home() {

  const user = await getSession();

  if (!user) {
    redirect('/sign-in');
  }

  return (
    <>
      {!user ?
        (
          <p>Loading ...</p>
        ) : (
          <div>
            <h1>DashBoard</h1><br />
            {
              JSON.stringify(user, null, 2)
            }
          </div>
        )
      }
    </>
  );
}
