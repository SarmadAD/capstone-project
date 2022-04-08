import Image from "next/image";
import ReactModal from "react-modal";
import styled from "styled-components";

export default function Modal({ modalIsOpen, children, closeModal }) {
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
    },
  };

  return (
    <div>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={createTimePointModalStyle}>
        <ModalHeader>
          <button onClick={closeModal} className="closeModalButton">
            <Image src="/SVG/close.svg" height={25} width={25} alt="close button" />
          </button>
        </ModalHeader>
        {children}
      </ReactModal>
    </div>
  );
}

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #ffffff;
  margin-bottom: 1em;
`;
