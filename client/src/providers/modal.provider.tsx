import React, { createContext, useState, type ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalState {
  title?: string;
  content: ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

interface ModalContextProps {
  openModal: (modal: ModalState) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = (newModal: ModalState) => setModal(newModal);
  const closeModal = () => {
    modal?.onClose?.();
    setModal(null);
  };

  const target = document.getElementById("modal-root") || document.body;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 z-50 bg-backdrop dark:bg-backdrop-dark flex justify-center items-center">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-lg p-6 mx-4 relative">
              {modal.showCloseButton !== false && (
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-300"
                  onClick={closeModal}
                >
                  ×
                </button>
              )}
              {modal.title && (
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {modal.title}
                </h2>
              )}
              <div className="text-sm text-gray-700 dark:text-gray-200">
                {modal.content}
              </div>
            </div>
          </div>,
          target
        )}
    </ModalContext.Provider>
  );
};
