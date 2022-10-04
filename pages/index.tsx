import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram, useProgramMetadata, useNFTs } from '@thirdweb-dev/react/solana';
import { NFTMetadata } from '@thirdweb-dev/sdk';

import Card from '../components/Card';
import MintButton from '../components/MintButton';
import Randomizer from '../components/Randomizer';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const { data: program } = useProgram(process.env.NEXT_PUBLIC_NFT_COLLECTION_PROGRAM, "nft-collection");
  const { data: metadata } = useProgramMetadata(program);
  const { data: nfts } = useNFTs(program);

  console.log(nfts);

  const { publicKey } = useWallet();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>{metadata?.name}</h1>
        <div className={styles.iconContainer}>
          {nfts &&
            <Randomizer imagePaths={nfts.map(e=>e.image) as string[]} />
          }
        </div>
        <p className={styles.explain}>Would be nice to have collection description here</p>

        <div className={styles.buttons}>
          <WalletMultiButton />
          {publicKey && <MintButton />}
        </div>
        
        {!nfts ? (
          <p>Loading...</p>
        ) : (
          <main className={styles.gallery}>
            {nfts.map((nft, idx) => (
              <Card key={idx} metadata={nft as NFTMetadata} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
