import { Droppable } from "@hello-pangea/dnd";
import { /*type MantineColor,*/ Paper, Stack, Title } from "@mantine/core";

import type { KanbanListShort } from "../../miscellaneous/kanbanTypes";
import KanbanCard from "./KanbanCard";
import KanbanCreateCard from "./KanbanCreateCard";

function KanbanColumn({ cards, title, color }: KanbanListShort) {
  return (
    <Paper p="md" bg={color} radius="md" w="100%">
      <Title order={4} mb="md">
        {title}
      </Title>
      <Droppable droppableId={title} key={title}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Stack gap="xs">
              {cards.map((card, index) => (
                <KanbanCard key={card.id} id={card.id} index={index} title={card.title} />
              ))}
              {provided.placeholder}
              <KanbanCreateCard title={title} />
            </Stack>
          </div>
        )}
      </Droppable>
    </Paper>
  );
}
export default KanbanColumn;
