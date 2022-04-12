import { useState } from "react";
import { TimePointTypeList } from "../model/TimePointTypeList";
import { getSession, useSession } from "next-auth/react";
import { AppButton } from "../components/styledComponents/AppButton";
import { AppInput } from "../components/styledComponents/AppInput";
import styled from "styled-components";
import Image from "next/image";
import Modal from "../components/Modal";
import TimepointList from "../components/TimepointList/TimepointList";
import Combobox from "react-widgets/Combobox";
import React from "react";
import useSWR from "swr";
import Loading from "../components/Loading/Loading";

const resetTimepointObj = {
  id: 0,
  title: "",
  content: "",
  date: "",
  picture: "",
  type: TimePointTypeList[0].type,
};

export default function Home() {
  const { data: session } = useSession();
  const timepoints = useSWR(`/api/timepoints/usertimepoint/${session.user.id}`);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createTimepointMode, setCreateTimepointMode] = useState(false);
  const [editTimepointMode, setEditTimepointMode] = useState(false);
  const [deleteTimepointMode, setDeleteTimepointMode] = useState(false);
  const [currentTimepoint, setCurrentTimepoint] = useState(resetTimepointObj);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    setCurrentTimepoint(resetTimepointObj);
    setEditTimepointMode(false);
    setCreateTimepointMode(false);
    setDeleteTimepointMode(false);
  }

  async function handleOnSubmit(event) {
    try {
      event.preventDefault();
      if (createTimepointMode) {
        const response = await fetch(`/api/timepoints/usertimepoint/${session.user.id}`, {
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
        <Loading />
      )}

      <AddTimepointContainer>
        <button onClick={handleCreateTimepoint}>
          <Image src="/SVG/add.svg" height={75} width={75} alt="add timepoint button" />
        </button>
      </AddTimepointContainer>

      {(createTimepointMode || editTimepointMode) && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <ModalContent>
            <CreateTimepointModalForm onSubmit={handleOnSubmit}>
              <AppInput name="title" placeholder="Title" value={currentTimepoint.title.toString()} onChange={handleOnChangeForm} required />
              <AppInput name="date" placeholder="Date" type="date" value={currentTimepoint.date.toString()} onChange={handleOnChangeForm} required />
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
              <AppButton value="Upload" className="uploadButton" type="button">
                Upload
              </AppButton>
              <AppButton value={createTimepointMode ? "Erstellen" : "Bearbeiten"} className="createEditButton" type="submit">
                {createTimepointMode ? "Erstellen" : "Bearbeiten"}
              </AppButton>
            </CreateTimepointModalForm>
          </ModalContent>
        </Modal>
      )}

      {deleteTimepointMode && (
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <ModalContent>
            <MondalDeleteContainer>
              <p>
                Möchten Sie das ausgewählte
                <br /> Ereignis wirklich löschen?
              </p>
              <DeleteModalOptions>
                <AppButton value="Nein" onClick={closeModal}>
                  Nein
                </AppButton>
                <AppButton value="Ja" onClick={handleDelete}>
                  Ja
                </AppButton>
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
    color: #ffffff;
  }
  .closeModalButton {
    color: black;
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

const DeleteModalOptions = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    margin-right: 1em;
  }
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
