/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Textarea } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

import { cardCreateClicked } from "./model";

function KanbanCreateCard({ title }: any) {
  function handleSubmit(e: any) {
    e.preventDefault();

    cardCreateClicked({ card: { id: "", title: e.target.textArea1.value }, columnTitle: title });
    e.target.textArea1.value = "";
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Textarea placeholder="Ввести новую карточку" id="textArea1" name="textArea1" required />
        <Button
          type="submit"
          fullWidth
          color="black"
          bg="blue.1"
          variant="light"
          mt="sm"
          leftSection={<IconPlus size={14} />}
        >
          Добавить карточку
        </Button>
      </form>
    </>
  );
}
export default KanbanCreateCard;
