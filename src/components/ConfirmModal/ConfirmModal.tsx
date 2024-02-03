import React, { FC, useState } from "react";
import styles from "./ConfirmModal.module.css";
import { Modal } from "@alfalab/core-components/modal";
import { CrossMIcon } from "@alfalab/icons-glyph/CrossMIcon";
import { ExclamationMIcon } from "@alfalab/icons-glyph/ExclamationMIcon";
import { ButtonDesktop } from "@alfalab/core-components/button/desktop";
import { useSelector } from "../../services/hooks";
import { isTemplate } from "../../services/selectors/taskSelector";

type TProps = {
  // readyToSave: boolean;
  formReady: boolean;
  isOpen: boolean;
  setTask: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  handleCancel: () => void;
  handleSave: () => void;
  handleDelete: () => void;
  handleCreate: () => void;
};

const ConfirmModal: FC<TProps> = ({
  // readyToSave,
  formReady,
  isOpen,
  setTask,
  setOpen,
  setEdit,
  handleCancel,
  handleSave,
  handleCreate,
  handleDelete,
}) => {
  const template = useSelector(isTemplate);

  const handleCreateTask = () => {
    handleCreate();
    setOpen(false);
    setTask(false);
  };
  const handleSaveTask = () => {
    handleSave();
    setOpen(false);
    setTask(false);
  };

  const handleDeleteTask = () => {
    handleDelete();
    setOpen(false);
    setTask(false);
  };

  const handleCancelTask = () => {
    handleCancel();
    setOpen(false);
    setTask(false);
  };

  return (
    <Modal
      open={isOpen}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
      className={styles.modal}
      Backdrop={() => <div className={styles.modalBackdrop}></div>}
      zIndex={101}
    >
      <div id="modalConfirm" className={styles.modalContainer}>
        <CrossMIcon
          className={styles.modalAddon}
          onClick={() => {
            // При клике на крестих закроется задача, режим редактирования отключится и модалка тоже закроется
            // setTask(false);
            // setEdit(false);
            setOpen(false);
          }}
          fill="#BABBC2"
        />
        <h1 className={styles.modalHeaderText}>Подтверждение</h1>
        <div className={styles.modalQuestion}>
          <div className={styles.backgroundIcon}>
            <ExclamationMIcon
              className={styles.exclamationIcon}
              fill="#F4963F"
            />
          </div>
          <p className={`text_type_small ${styles.modalMainText}`}>
            {template && formReady
              ? "Вы хотите создать задачу перед выходом?"
              : template
              ? "Вы заполнили не все поля, при закрытии задача удалится"
              : "Вы хотите сохранить изменения перед выходом?"}
          </p>
        </div>
        <div className={styles.buttons}>
          <ButtonDesktop
            view="tertiary"
            onClick={() => {
              //При клике на кнопку "Выйти без сохранения" закроется задача, сработает функция обработчик, закроется модалка
              template && formReady ? handleDeleteTask() : handleCancelTask();
            }}
          >
            {template && formReady
              ? "Выйти без создания"
              : template
              ? "Удалить"
              : "Выйти без сохранения"}
          </ButtonDesktop>
          <ButtonDesktop
            view="accent"
            onClick={() => {
              //При клике на кнопку "Сохранить" задача закроется, сработает функция обработчик, закроется модалка
              template && formReady
                ? handleCreateTask()
                : template
                ? setOpen(false)
                : handleSaveTask();
            }}
          >
            {template && formReady
              ? "Создать"
              : template
              ? "Вернуться"
              : "Сохранить"}
          </ButtonDesktop>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
