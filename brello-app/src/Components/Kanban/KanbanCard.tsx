/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import { Draggable } from "@hello-pangea/dnd";
import { ActionIcon, Group, Paper, Space, Text, Textarea, Tooltip } from "@mantine/core";
import { IconCheck, IconPencil, IconTrash, IconX } from "@tabler/icons-react";
import { fromEvent, map } from "rxjs";

import { cardDeleted, cardUpdated } from "./model";

function KanbanCard({ key, id, index, title }: { key: string; id: string; index: number; title: string }) {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  function handleChange() {
    cardUpdated({ key: key, id: id, index: index, title: editTitle });
    setEditMode(false);
  }

  function handleDelete() {
    cardDeleted(id);
  }

  useEffect(() => {
    if (editMode) {
      const editTitle1_: any = document.getElementById("editTitle1");
      fromEvent(editTitle1_, "change")
        .pipe(map((e: any) => e.target.value))
        .subscribe((data) => {
          setEditTitle(data);
        });
    }
  }, [editMode]);

  if (editMode) {
    return (
      <div>
        <Paper p="md">
          <Textarea defaultValue={editTitle} id="editTitle1" />
          <Space h="10px" />
          <Group gap="xs">
            <Tooltip label="save">
              <ActionIcon onClick={handleChange}>
                <IconCheck size={14} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="delete">
              <ActionIcon onClick={handleDelete}>
                <IconX size={14} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Paper>
      </div>
    );
  }
  return (
    <Draggable draggableId={id} key={key} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div>
            <Paper p="md">
              <Text>{title}</Text>
              <Space h="10px" />
              <Group gap="xs">
                <Tooltip label="edit">
                  <ActionIcon onClick={() => setEditMode(true)}>
                    <IconPencil size={14} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="delete">
                  <ActionIcon onClick={handleDelete}>
                    <IconTrash size={14} />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Paper>
          </div>
        </div>
      )}
    </Draggable>
  );
}
export default KanbanCard;
