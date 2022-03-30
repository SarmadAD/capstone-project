import ExportedModal from "react-modal";

export default function Modal({ modalIsOpen, children, closeModal, createTimePointModalStyle }) {
  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = "#f00";
  // }

  return (
    <div>
      <ExportedModal isOpen={modalIsOpen} onRequestClose={closeModal} style={createTimePointModalStyle}>
        {children}
      </ExportedModal>
    </div>
  );
}
