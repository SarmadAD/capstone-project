import ReactModal from "react-modal";

export default function Modal({ modalIsOpen, children, closeModal, createTimePointModalStyle }) {
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = "#f00";
  // }

  return (
    <div>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal} style={createTimePointModalStyle}>
        {children}
      </ReactModal>
    </div>
  );
}
