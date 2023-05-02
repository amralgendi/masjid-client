import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Constants from "../../constants";

export default function Confirm() {
  const router = useRouter();

  const { email } = router.query;

  const [confirmData, setConfirmData] = useState({
    email,
    code: "",
  });

  useEffect(() => {
    if (!confirmData.email) {
      alert("Email Does not Exist");
    }
  }, [confirmData.email]);

  const handleInput = (e) => {
    setConfirmData({ ...confirmData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${Constants.apiBase}/saas/auth/confirm`, {
      method: "POST",
      body: JSON.stringify(confirmData),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await res.json();

    if (res.ok) {
      router.push("/auth/login");
    } else {
      console.log(json);
    }
  };

  const handleResendCode = async () => {
    fetch("https://api.bizcontactpro.xyz/saas/auth/resendConfirmation", {
      method: "POST",
      body: JSON.stringify({ email: confirmData.email }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Head>
        <title>Cofirm Account</title>
        <meta name="description" content="Confirm Account in BizContactPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Please Confirm your Account</h1>
        <p>A Confirmation Code was sent to the email: {email}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Code</label>
            <input
              type="text"
              name="code"
              value={confirmData.code}
              onInput={handleInput}
            />
          </div>
          <button>Submit</button>
        </form>
        <p>
          Code did not reach?
          <button onClick={handleResendCode}>Resend Code</button>
        </p>
      </main>
    </div>
  );
}
