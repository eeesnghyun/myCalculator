import { Dispatch, ReactNode, SetStateAction } from "react";
import { X } from "lucide-react";
import styles from "./modal.module.scss";

import ModalPortal from "./modalPortal";

type Props = {
  setToggleModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function Modal({ setToggleModal, children }: Props) {
  return (
    <ModalPortal>
      <div className={styles.modal_wrap}>
        <div className={styles.modal_content}>
          <X className={styles.close_btn} onClick={() => setToggleModal(false)} />
          {children}
        </div>
      </div>
    </ModalPortal>
  );
}
