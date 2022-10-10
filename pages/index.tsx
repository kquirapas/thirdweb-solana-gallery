import { WalletMultiButton, } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { useWallet } from '@solana/wallet-adapter-react';
import { useProgram, useProgramMetadata, useNFTs } from '@thirdweb-dev/react/solana';
import { NFTMetadata } from '@thirdweb-dev/sdk';

import Card from '../components/Card';
import MintButton from '../components/MintButton';

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const PROGRAM_ADDRESS = process.env.NEXT_PUBLIC_NFT_COLLECTION_PROGRAM;

const Home: NextPage = () => {
  const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
  const { data: metadata } = useProgramMetadata(program);
  const { data: nfts } = useNFTs(program);

  const { publicKey } = useWallet();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.h1}>{metadata?.name}</h1>
        <div className={styles.iconContainer}>
          <img className={styles.thumbnail} src={String(metadata?.image)} alt={String(metadata?.name)} />
        </div>
        <p className={styles.explain}>{metadata?.description}</p>

        <div className={styles.buttons}>
          <WalletMultiButton />
          {publicKey && <MintButton />}
        </div>
        
        {!nfts ? (
          <p>Loading...</p>
        ) : (
          <main className={styles.gallery}>
            {nfts.map((nft, idx) => (
              <Card key={idx} data={nft as NFTMetadata} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
