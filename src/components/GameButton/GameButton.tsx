import { useGameMode } from '@src/context/GameModeContext';
import styles from './GameButton.module.scss';
import {GameIcon} from '@assets/index';
import cx from 'classnames';

const GameButton = () => {
  const { toggleGameMode, isGameModeActive } = useGameMode();
  
  return (
    <div className={styles.gameboxWrapper}>
      <button onClick={toggleGameMode} className={cx(
        styles.gamebutton,
        isGameModeActive && styles.active
      )}>
        <img src={GameIcon} alt="game icon" className={cx(
          styles.gameicon,
          isGameModeActive && styles.active
        )}/>
      </button>
      <div className={styles.msg}>Game</div>
    </div>
  )
}

export default GameButton