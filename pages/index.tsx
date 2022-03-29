import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";
import TimepointList from "../components/TimepointList/TimepointList";
import { timepoints } from "../db";
import Combobox from "react-widgets/Combobox";
import { TimePointTypeList } from "../model/TimePointTypeList";
import { TimepointModel } from "../model/TimepointModel";
import React from "react";

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

export default function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentTimepoint, setCurrentTimepoint] = useState<TimepointModel>({
    id: 0,
    title: "",
    content: "",
    date: "",
    picture: "",
    type: TimePointTypeList[0].type,
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    console.log("Submit!");
    console.log(currentTimepoint);
  }

  function handleOnChangeForm(event) {
    switch (event.target.name) {
      case "title":
        setCurrentTimepoint((current) => ({ ...current, title: event.target.value }));
        break;
      case "date":
        setCurrentTimepoint((current) => ({ ...current, date: event.target.value }));
        break;
      case "content":
        setCurrentTimepoint((current) => ({ ...current, content: event.target.value }));
        break;
      default:
        break;
    }
  }

  function handleTypeChange(selectedItem) {
    setCurrentTimepoint((current) => ({ ...current, type: selectedItem }));
  }

  const textForNoTimepoints = "Füge Timepoints hinzu, um deine Timeline zu erstellen";
  return (
    <HomeContainer>
      {timepoints.length > 0 ? <TimepointList listOfTimepoints={timepoints} /> : <p>{textForNoTimepoints}</p>}
      {/* <Image src={"/components/SVG/loadingcapstone.svg"} alt="schade" width={100} height={100} /> */}
      <AddTimepointContainer>
        <button onClick={openModal}>
          <Image src="/SVG/add.svg" height={75} width={75} alt="add timepoint button" />
        </button>
      </AddTimepointContainer>

      <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} createTimePointModalStyle={createTimePointModalStyle}>
        <ModalHeader>
          <button onClick={closeModal} className="closeModalButton">
            <Image src="/SVG/close.svg" height={25} width={25} alt="close button" />
          </button>
        </ModalHeader>
        <ModalContent>
          <CreateTimepointModalForm onSubmit={handleOnSubmit}>
            <ModalInput name="title" placeholder="Title" value={currentTimepoint.title.toString()} onChange={handleOnChangeForm} required />
            <ModalInput name="date" placeholder="Date" type="date" value={currentTimepoint.date.toString()} onChange={handleOnChangeForm} required />
            <ModalTextArea
              name="content"
              placeholder="Beschreibung..."
              value={currentTimepoint.content.toString()}
              onChange={handleOnChangeForm}
              required
            />
            <Combobox
              defaultValue={TimePointTypeList[0].type}
              data={TimePointTypeList.map((TimePointType) => TimePointType["type"])}
              onSelect={handleTypeChange}
            />
            <ModalButton value="Upload" className="uploadButton" type="button">
              Upload
            </ModalButton>
            <ModalButton value="Erstellen/Edit" className="createButton" type="submit">
              Erstellen/Edit
            </ModalButton>
          </CreateTimepointModalForm>
        </ModalContent>
      </Modal>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    text-align: center;
    font-size: 2.5em;
  }
  .closeModalButton {
    color: black;
  }
`;

const AddTimepointContainer = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: fixed;
  bottom: 0;
  margin-bottom: 1em;
  button {
    background-color: #9e94d6;
    border-radius: 50%;
  }
`;

const ModalContent = styled.div``;

const CreateTimepointModalForm = styled.form`
  display: flex;
  flex-direction: column;
  .uploadButton {
    align-self: flex-end;
    margin-bottom: 1em;
  }
  .createButton {
    align-self: center;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalInput = styled.input`
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid;
  border-radius: 15px;
  font-size: 1em;
`;

const ModalTextArea = styled.textarea`
  padding: 0.5em;
  margin-bottom: 0.5em;
  border: 1px solid;
  border-radius: 15px;
  font-size: 1em;
`;

const ModalButton = styled.button`
  background: #9e94d6;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 19px;
  padding: 0.5em;
  width: 50%;
  margin-top: 0.5em;
`;
