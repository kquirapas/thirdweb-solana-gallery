import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram, useProgramMetadata, useNFTs } from '@thirdweb-dev/react/solana';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const router = useRouter();
  const { data: program } = useProgram("b1tfCcFdcmxPGxKUZZjSdBf9EV4qwQcxy4DapTC1anf", "nft-collection");
  const { data: metadata } = useProgramMetadata(program);
  const { data: nfts } = useNFTs(program);

  useEffect(() => {
    // on mount
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.iconContainer}>
          <img src={"/thirdweb.svg"} className={styles.icon} />
          <img src={"/sol.png"} className={styles.icon} />
        </div>
        
        <h1 className={styles.h1}>{metadata?.name}</h1>
        <p className={styles.explain}>Would be nice to have collection description here</p>

        <WalletMultiButton />
        
        {!nfts ? (
          <p>Loading...</p>
        ) : (
          <main className={styles.iconContainer}>
            {nfts.map((nft, idx) => (
              <img className={styles.thumbnail} key={idx} src={nft.image} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
