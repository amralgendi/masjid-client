import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { AppContext } from "../../context/app";
import { DomainContext } from "../../context/domain";
import Link from "next/link";
import Constants from "../../constants";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { appDetails } = useContext(AppContext);
  const { domainDetails } = useContext(DomainContext);
  console.log(user);
  console.log(appDetails);
  console.log(domainDetails);

  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="The Home Page of MASJID" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>This is the Home Page of MASJID</h1>
        {user ? (
          <div>
            <p>Here are your information</p>
            <ul>
              <li>id: {user.data.id}</li>
              <li>email: {user.data.email}</li>
            </ul>
            {user.data.appOrgUserRoles?.length > 0 ? (
              <>
                <p>You are in the following Organization:</p>
                <ul>
                  {user.data.appOrgUserRoles.map((appOrgUserRole) => (
                    <li key={appOrgUserRole.id}>
                      {appOrgUserRole.orgId} with role {appOrgUserRole.role}
                    </li>
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
          <div></div>
        )}
        {domainDetails &&
          Object.keys(domainDetails.subdomainOrgIds).length > 0 && (
            <div>
              <p>Subdomains:</p>
              <ul>
                {Object.keys(domainDetails.subdomainOrgIds).map((subdomain) => (
                  <li key={subdomain}>
                    <Link href={`http://${subdomain}.${Constants.domain}`}>
                      {subdomain}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
      </main>
    </div>
  );
}
