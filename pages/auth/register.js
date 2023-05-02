import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Constants from "../../constants";

export default function Register() {
  const router = useRouter();

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Password must match");
    }

    fetch(`${Constants.apiBase}/saas/auth/register`, {
      method: "POST",
      body: JSON.stringify(registerData),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((user) => {
        console.log(user);
        if (user.isConfirmed) {
          router.push("/login");
        } else {
          router.push("/confirm?email=" + registerData.email, "/confirm");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Head>
        <title>Register Page</title>
        <meta name="description" content="Register to BizContactPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Please Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={registerData.email}
              onInput={handleInput}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={registerData.password}
              onInput={handleInput}
            />
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onInput={handleInput}
            />
          </div>
          <button>Submit</button>
        </form>
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </main>
    </div>
  );
}
