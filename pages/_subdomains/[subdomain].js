import Head from "next/head";
import Constants from "../../constants";
import { DomainContext } from "../../context/domain";
import { AppContext } from "../../context/app";
import { AuthContext } from "../../context/auth";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

export default function OrgMain({ subdomain }) {
  const { domainDetails } = useContext(DomainContext);
  const { appDetails } = useContext(AppContext);
  const { user } = useContext(AuthContext);

  const [orgRoles, setOrgRoles] = useState([]);

  const org = domainDetails?.subdomainOrgIds?.[subdomain];

  useEffect(() => {
    if (org)
      fetch(`${Constants.apiBase}/app-org-user-roles?OrgId=${org}`).then(
        (res) =>
          res.json().then((json) => {
            if (res.ok) {
              setOrgRoles(json);
            }
          })
      );
  }, [org]);

  console.log({ domainDetails });
  return (
    <div>
      <Head>
        <title>Organization Page</title>
        <meta name="description" content="The Home Page of BizContactPro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the an Organization Page for BizContactPro</h1>
        <p>Subdomain: {subdomain}</p>
        <p>Organization: {org}</p>
        {user?.data.appOrgUserRoles.findIndex(
          (i) => i.orgId == org && i.role == "Admin"
        ) && (
          <div>
            <p>You are an Admin</p>
            <p>User Roles</p>
            {orgRoles.map((i) => (
              <div key={i.id}>
                {i.userId} with role {i.role}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export const getStaticProps = (context) => {
  console.log("From Static Props");
  return {
    props: {
      subdomain: context.params.subdomain,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${Constants.apiBase}/domain-details`);
  const json = await res.json();

  return {
    paths: Object.keys(json.subdomainOrgIds).map((subdomain) => ({
      params: { subdomain },
    })),
    fallback: true,
  };
};
