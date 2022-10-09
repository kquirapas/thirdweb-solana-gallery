import { FC, useState } from 'react';
import styles from "../styles/Home.module.css";

import { useProgram, useProgramMetadata, useNFTs } from '@thirdweb-dev/react/solana';
import { NFTMetadata } from '@thirdweb-dev/sdk';

const PROGRAM_ADDRESS = process.env.NEXT_PUBLIC_NFT_COLLECTION_PROGRAM;

const MintButton: FC = () => {
  const [loading, setLoading] = useState(false);

  const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
  const { data: metadata } = useProgramMetadata(program);
  const { data: nfts } = useNFTs(program);

  const mint = async () => {
    if (!metadata || !nfts) return;

    const m = {
      name: metadata.name + `#${nfts.length + 1}`,
      description: metadata.description,
      image: metadata.image
    };

    setLoading(true);
    await program?.mint(m as NFTMetadata);
    setLoading(false);
  };

  return (
    <div onClick={mint} className={styles.mintButton}>{ loading ? "Minting..." : "Mint"}</div>
  )
};

export default MintButton;
