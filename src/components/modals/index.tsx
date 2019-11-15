import React, { useState, createContext, useContext } from 'react';

export type ModalTypes = null | React.ReactNode;

export interface ModalContextType {
  modal: ModalTypes;
  showModal: (key: ModalTypes) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  modal: null,
  showModal: () => null,
  hideModal: () => null
});

export const useModal = () => {
  const { showModal, hideModal } = useContext(ModalContext);

  return { showModal, hideModal };
};

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<ModalTypes>(null);

  const showModal = () => (modalComponent: ModalTypes) => {
    setModal(modalComponent);
  };

  const hideModal = () => () => {
    setModal(null);
  };

  const mountModal = () => {
    // switch (modalKey) {
    //   case 'createTeam':
    //     return <CreateTeamModal />;
    //   case 'createProject':
    //     return <CreateProjectModal />;
    //   case 'createList':
    //     return <CreateListModal />;
    //   case 'deleteList':
    //     return <DeleteListModal />;
    //   default:
    //     return null;
    // }
    return modal;
  };

  return (
    <ModalContext.Provider
      value={{
        modal,
        showModal: showModal(),
        hideModal: hideModal()
      }}
    >
      {children}
      {mountModal()}
    </ModalContext.Provider>
  );
};
