import type { NextPage } from 'next';
import Head from 'next/head';
import Home from '../Home/Home';

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Test homepage</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Home />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default IndexPage;
