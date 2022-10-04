import { FC, useEffect, useState } from 'react';
import styles from "../styles/Home.module.css";

type Props = {
  imagePaths: string[];
};

const Randomizer: FC<Props> = ({ imagePaths }) => {
  const [index, setIndex] = useState(0); 

  useEffect(() => {
    // on mount
    const interval = setInterval(() => setIndex(prev => prev + 1 >= imagePaths.length ? 0 : prev + 1), 300);
    return () => clearInterval(interval);
  }, []);

  // if undefined
  if (!imagePaths) {
    return <div>Loading...</div>
  }

  // if no images
  if (imagePaths.length <= 0) {
    return <div>No Images Found</div>
  }

  return (
    <div>
      <img className={styles.randomizer} src={imagePaths[index]} />
    </div>
  )
};

export default Randomizer;
