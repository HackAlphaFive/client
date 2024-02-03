import { Modal } from "@alfalab/core-components/modal";
import { CheckmarkCircleMIcon } from "@alfalab/icons-glyph/CheckmarkCircleMIcon";
import { CrossMWhiteIcon } from "@alfalab/icons-glyph/CrossMWhiteIcon";
import styles from "./SuccessfulModal.module.css";
import React, { FC } from "react";
import { useSelector } from "../../services/hooks";
import { templateTask } from "../../services/selectors/taskSelector";

type TProps = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessfulModal: FC<TProps> = ({ isOpen, setOpen }) => {
  const template = useSelector(templateTask);
  return (
    <Modal
      zIndex={101}
      disableEscapeKeyDown={false}
      onClose={() => setOpen(false)}
      Backdrop={() => <div className={styles.modalBackdrop}></div>}
      open={isOpen}
      className={styles.modal}
      contentClassName={styles.modalContent}
    >
      <CheckmarkCircleMIcon fill="#67D76B" />
      <p className={styles.modalText}>{template? "Задача успешно создана" : "Изменения успешно сохранены"}</p>
      <CrossMWhiteIcon
        className={styles.modalAddon}
        onClick={() => setOpen(false)}
      />
    </Modal>
  );
};

export default SuccessfulModal;
