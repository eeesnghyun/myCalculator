import { useState } from "react";
import styles from "./button.module.scss";

type Props = {
  text: string;
  onClick: () => Promise<boolean | void> | boolean | void;
};

const MyButton = ({ text, onClick }: Props) => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClick = async () => {
    setDisabled(true);

    try {
      await onClick();
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <button type="button" className={styles.save} onClick={handleClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
};

export default MyButton;
