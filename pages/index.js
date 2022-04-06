import { useState } from "react";
import { TimePointTypeList } from "../model/TimePointTypeList";
import { TimepointModel } from "../model/TimepointModel";
import styled from "styled-components";
import Image from "next/image";
import Modal from "../components/Modal";
import TimepointList from "../components/TimepointList/TimepointList";
import Combobox from "react-widgets/Combobox";
import React from "react";
import { getSession } from "next-auth/react";
import { StyledAppButton } from "../components/Buttons/StyledAppButton";
import useSWR from "swr";

import loadingcapstone from "../public/SVG/loadingcapstone.svg";

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

const resetTimepointObj = {
  id: 0,
  title: "",
  content: "",
  date: "",
  picture: "",
  type: TimePointTypeList[0].type,
};

export default function Home() {
  const timepoints = useSWR("/api/timepoints");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [createTimepointMode, setCreateTimepointMode] = useState(false);
  const [editTimepointMode, setEditTimepointMode] = useState(false);
  const [deleteTimepointMode, setDeleteTimepointMode] = useState(false);
  const [currentTimepoint, setCurrentTimepoint] = useState(resetTimepointObj);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setCurrentTimepoint(resetTimepointObj);
    setEditTimepointMode(false);
    setCreateTimepointMode(false);
    setDeleteTimepointMode(false);
  }

  async function handleOnSubmit(event) {
    try {
      event.preventDefault();
      if (createTimepointMode) {
        const response = await fetch("/api/timepoints", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(currentTimepoint),
        });
        if (response.ok) {
          timepoints.mutate();
        }
      } else if (editTimepointMode) {
        const response = await fetch(`/api/timepoints/${currentTimepoint._id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(currentTimepoint),
        });
        if (response.ok) {
          timepoints.mutate();
        }
      }
    } catch (error) {
      console.error();
    } finally {
      setCurrentTimepoint(resetTimepointObj);
      closeModal();
    }
  }

  async function handleDelete() {
    try {
      const response = await fetch(`/api/timepoints/${currentTimepoint._id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(currentTimepoint),
      });
      if (response.ok) {
        timepoints.mutate();
      }
    } catch (error) {
      console.error();
    } finally {
      setCurrentTimepoint(resetTimepointObj);
      closeModal();
    }
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

  function handleCreateTimepoint() {
    setCreateTimepointMode(true);
    openModal();
  }

  const textForNoTimepoints = "Füge Timepoints hinzu, um deine Timeline zu erstellen";
  return (
    <HomeContainer>
      {timepoints.data && timepoints.data.length > 0 ? (
        <TimepointList
          listOfTimepoints={timepoints.data}
          setEditTimepointMode={setEditTimepointMode}
          setDeleteTimepointMode={setDeleteTimepointMode}
          setCurrentTimepoint={setCurrentTimepoint}
          openModal={openModal}
        />
      ) : timepoints.data && timepoints.data.length === 0 ? (
        <p>{textForNoTimepoints}</p>
      ) : (
        <object type="image/svg+xml" data="/SVG/loadingcapstone.svg" aria-labelledby="loading">
          loading-animation
        </object>
      )}
      {/* <Image src={"/components/SVG/loadingcapstone.svg"} alt="schade" width={100} height={100} /> */}
      <AddTimepointContainer>
        <button onClick={handleCreateTimepoint}>
          <Image src="/SVG/add.svg" height={75} width={75} alt="add timepoint button" />
        </button>
      </AddTimepointContainer>

      {(createTimepointMode || editTimepointMode) && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} createTimePointModalStyle={createTimePointModalStyle}>
          <ModalHeader>
            <button onClick={closeModal} className="closeModalButton">
              <Image src="/SVG/close.svg" height={25} width={25} alt="close button" />
            </button>
          </ModalHeader>
          <ModalContent>
            <CreateTimepointModalForm onSubmit={handleOnSubmit}>
              <ModalInput name="title" placeholder="Title" value={currentTimepoint.title.toString()} onChange={handleOnChangeForm} required />
              <ModalInput
                name="date"
                placeholder="Date"
                type="date"
                value={currentTimepoint.date.toString()}
                onChange={handleOnChangeForm}
                required
              />
              <ModalTextArea
                name="content"
                placeholder="Beschreibung..."
                value={currentTimepoint.content.toString()}
                onChange={handleOnChangeForm}
                required
              />
              <Combobox
                defaultValue={TimePointTypeList[0].type}
                value={currentTimepoint.type}
                data={TimePointTypeList.map((TimePointType) => TimePointType["type"])}
                onSelect={handleTypeChange}
              />
              <StyledAppButton value="Upload" className="uploadButton" type="button">
                Upload
              </StyledAppButton>
              <StyledAppButton value={createTimepointMode ? "Erstellen" : "Bearbeiten"} className="createEditButton" type="submit">
                {createTimepointMode ? "Erstellen" : "Bearbeiten"}
              </StyledAppButton>
            </CreateTimepointModalForm>
          </ModalContent>
        </Modal>
      )}

      {deleteTimepointMode && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal} createTimePointModalStyle={createTimePointModalStyle}>
          <ModalHeader>
            <button onClick={closeModal} className="closeModalButton">
              <Image src="/SVG/close.svg" height={25} width={25} alt="close button" />
            </button>
          </ModalHeader>
          <ModalContent>
            <MondalDeleteContainer>
              <p>
                Möchten Sie das ausgewählte
                <br /> Ereignis wirklich löschen?
              </p>
              <DeleteModalOptions>
                <StyledAppButton value="Nein" onClick={closeModal}>
                  Nein
                </StyledAppButton>
                <StyledAppButton value="Ja" onClick={handleDelete}>
                  Ja
                </StyledAppButton>
              </DeleteModalOptions>
            </MondalDeleteContainer>
          </ModalContent>
        </Modal>
      )}
    </HomeContainer>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5em;
  p {
    text-align: center;
    font-size: 2.5em;
  }
  .closeModalButton {
    color: black;
  }
  object {
    @media only screen and (max-width: 576px) {
      width: 100%;
    }
    @media only screen and (min-width: 576px) {
      width: 50%;
    }
    @media only screen and (min-width: 768px) {
      width: 50%;
    }
    @media only screen and (min-width: 1200px) {
      width: 30%;
    }
  }
`;

const AddTimepointContainer = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: fixed;
  bottom: 10vh;
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
  .createEditButton {
    align-self: center;
  }
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #ffffff;
`;

const DeleteModalOptions = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-right: 1em;
  }
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

const MondalDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: #ffffff;
`;

const LoadingContainer = styled.div`
  display: flex;
`;
