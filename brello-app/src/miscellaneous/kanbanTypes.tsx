export type KanbanBoard = KanbanList[];

export type KanbanList = {
  id: string;
  title: string;
  cards: KanbanCard[];
  color: string;
};

export type KanbanListShort = Pick<KanbanList, "title" | "cards" | "color">;

export type KanbanCard = {
  id: string;
  title: string;
};
