import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import Link from "next/link";
import Constants from "../../constants";

export default function Home() {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(
      `${Constants.apiBase}/saas/app-org-user-roles?UserId=${user.data.email}`
    )
      .then((res) =>
        res.json().then((json) => {
          if (res.ok) {
            console.log(json);
          } else alert(JSON.stringify(json));
        })
      )
      .catch((e) => console.log(e));
  }, [user]);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="The Home Page of BizContactPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the Home Page of BizContactPro</h1>
        {user ? (
          <div>
            <p>You are Logged in</p>
            <p>Here are your information</p>
            <ul>
              <li>id: {user.data.id}</li>
              <li>email: {user.data.email}</li>
            </ul>
            {orgs.length > 0 ? (
              <>
                <p>You are in the following Organization:</p>
                <ul>
                  {orgs.map((org) => (
                    <li key={org}>{org}</li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p>You are not in any Organization</p>
                <Link href="/organizations/create">Create One</Link>
              </>
            )}
          </div>
        ) : (
          <div>
            <p>Not Logged In</p>
            <Link href="http://auth.hello.localhost:3000/login">Login</Link>
            <p>or</p>
            <Link href="http://auth.hello.localhost:3000/login">Register</Link>
          </div>
        )}
      </main>
    </div>
  );
}
