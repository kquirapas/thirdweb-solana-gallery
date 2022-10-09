import { FC } from 'react';
import styles from "../styles/Home.module.css";

import { NFTMetadata } from '@thirdweb-dev/sdk';

type Props = {
  data: NFTMetadata;
};

// revealed address character count
const REVEALED_COUNT = 4;

const Card: FC<Props> = ({ data }) => {
  const metadata = data.metadata as NFTMetadata;
  const owner: string = data.owner as string;

  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src={String(metadata.image)} />
      <h3>{metadata.name}</h3>
      <p>Owned by</p>
      <p>{owner.substring(0, REVEALED_COUNT) + "..." + owner.substring(owner.length - REVEALED_COUNT)}</p>
    </div>
  )
};

export default Card;
