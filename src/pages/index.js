import Head from "next/head";

import Search from "../components/search/Search";
import Listing from "../components/listing/Listing";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Kubis Dev Test</title>
        <meta
          name="description"
          content="Project created by George Bucurescu."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="lg:flex flex-row">
        <Search />
        {/* Listing Section */}
        <Listing />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
