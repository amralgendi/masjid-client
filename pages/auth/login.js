import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import Constants from "../../constants";

export default function Login() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const context = useContext(AuthContext);

  console.log(context);

  const handleInput = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${Constants.apiBase}/saas/auth/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();

    if (res.ok) {
      if (!json.nextStep) {
        context.login(json.tokens);
        console.log(json);
        // router.push("http://hello.localhost:3000");
      } else {
        alert("Next Step Required!");
      }
    } else {
      if (json.Message === "User is not confirmed.")
        router.push("/confirm?email=" + loginData.email, "/confirm");
    }
  };

  return (
    <div>
      <Head>
        <title>Log in Page</title>
        <meta name="description" content="Log in to BizContactPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Please Log in</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={loginData.email}
              onInput={handleInput}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onInput={handleInput}
            />
          </div>
          <button>Submit</button>
        </form>
        <p>
          If you do not have an account, you can
          <Link href="/register">Register</Link>
        </p>
      </main>
    </div>
  );
}
