import Image from "next/image";
import ReactModal from "react-modal";
import styled from "styled-components";
import Loading from "./Loading/Loading";

export default function Modal({ modalIsOpen, children, closeModal, isLoading }) {
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = "#f00";
  // }
  const createTimePointModalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#655F8A",
      border: "2px solid #FFFFFF",
      borderRadius: "15px",
      padding: "2em",
      maxWidth: "335px",
    },
  };

  return (
    <div>
      <ReactModal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={closeModal} style={createTimePointModalStyle}>
        <ModalHeader>
          <button onClick={closeModal} className="closeModalButton">
            <Image src="/SVG/close.svg" height={25} width={25} alt="close button" />
          </button>
        </ModalHeader>
        {children}
        {isLoading && (
          <LoadingContainer>
            <Loading />
          </LoadingContainer>
        )}
      </ReactModal>
    </div>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #ffffff;
  margin-bottom: 1em;
  .closeModalButton {
    all: unset;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
  object {
    width: 40%;
  }
`;
