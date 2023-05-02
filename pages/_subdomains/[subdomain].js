import Head from "next/head";
import Constants from "../../constants";
import { DomainContext } from "../../context/domain";
import { useContext } from "react";

export default function OrgMain({ subdomain }) {
  const context = useContext(DomainContext);

  console.log(context);
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
        <p>
          Organization: {context?.domainDetails?.subdomainOrgIds?.[subdomain]}
        </p>
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
  const res = await fetch(`${Constants.apiBase}/saas/domain-details`);
  const json = await res.json();

  return {
    paths: Object.keys(json.subdomainOrgIds).map((subdomain) => ({
      params: { subdomain },
    })),
    fallback: true,
  };
};
