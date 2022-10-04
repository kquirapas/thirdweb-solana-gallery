import { FC } from 'react';
import styles from "../styles/Home.module.css";

import { NFTMetadata } from '@thirdweb-dev/sdk';

type Props = {
  metadata: NFTMetadata;
};

const Card: FC<Props> = ({ metadata }) => {
  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src={metadata.image} />
      <h3>{metadata.name}</h3>
      {metadata.attributes.map((e, idx: number) =>
          <div key={idx} className={styles.trait}>
            <p className={`${styles.lightPurple} ${styles.type}`}>{e.trait_type.toUpperCase()}</p>
            <p className={styles.value}>{e.value}</p>
          </div>
      )}
    </div>
  )
};

export default Card;
