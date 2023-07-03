import styles from './GamBox.module.scss';
import cx from 'classnames';

type GameBoxProps = {
  fallbackText: string;
  style: object;
};

const GamingBox = ({
  fallbackText,
  style
}: GameBoxProps) => {
  return (
    <div className={styles.gamebox} style={{...style}}>
      Here's Gaming Box
    </div>
  ) 
}

export default GamingBox;