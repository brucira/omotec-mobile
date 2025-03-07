import { useCallback, useRef } from "react";

const useModal = () => {
  const modalRef = useRef(null);

  const openModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  return {
    closeModal,
    modalRef,
    openModal,
  };
};

export default useModal;
