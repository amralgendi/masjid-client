import Head from "next/head";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/auth";

export default function CreateOrganization() {
  const [orgData, setOrgData] = useState({
    name: "",
    preferredSubdomain: "",
  });

  const handleInput = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "https://api.bizcontactpro.xyz/saas/organizations",
      {
        method: "POST",
        body: JSON.stringify(orgData),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const json = await res.json();

    if (res.ok) {
      alert("SUCCESS:\n" + JSON.stringify(json));
    } else {
      console.log(json);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Organization Page</title>
        <meta
          name="description"
          content="Create an Organization in BizContactPro"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create an Organization</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="type"
              name="name"
              placeholder="My Organization"
              value={orgData.name}
              onInput={handleInput}
            />
          </div>
          <div>
            <label>Preferred Subdomain</label>
            <input
              type="text"
              name="preferredSubdomain"
              value={orgData.preferredSubdomain}
              onInput={handleInput}
            />
          </div>
          <button>Submit</button>
        </form>
      </main>
    </div>
  );
}
