/* eslint-disable @typescript-eslint/no-explicit-any */
import { createEvent, createStore } from "effector";
import { nanoid } from "nanoid";
import { debug } from "patronum";
import { exhaustMap, from } from "rxjs";

import type { KanbanBoard, KanbanCard, KanbanList } from "../../miscellaneous/kanbanTypes";
import type {} from "../../miscellaneous/userTypes";

export const TASK_NAMES = [
  "Set up development environment",
  "Create component structure",
  "Implement basic routing",
  "Design task board layout",
  "Add drag-and-drop functionality for cards",
  "Develop notification system",
  "Integrate user authentication",
  "Connect Google api for OAuth",
  "Implement task filtering by status",
  "Add tagging functionality",
  "Develop task prioritization system",
  "Integrate third-party analytics api",
  "Set up automatic data saving",
  "Create user roles system",
  "Add comments to tasks",
  "Integrate external file storage",
  "Enable public boards functionality",
  "Develop mobile interface version",
  "Add push notifications",
  "Optimize application performance",
  "Implement board archiving functionality",
  "Develop import/export data feature",
  "Create dark mode for interface",
  "Add card copying functionality",
  "Integrate Jira data migration",
  "Create task charts and graphs",
  "Implement search functionality for tasks",
  "Develop quick task evaluation widget",
  "Add deadlines feature for cards",
  "Set up automatic data backups",
  "Add multi-language support",
  "Create board customization system",
  "Integrate with Slack for task updates",
  "Add task change history tracking",
  "Create “My Tasks” page for users",
  "Develop api for external system integration",
  "Create statistics for completed tasks",
  "Implement bulk card movement system",
  "Add task subscription functionality",
  "Connect Google Analytics for tracking",
  "Develop user documentation",
  "Integrate calendar sync for deadlines",
  "Add task recovery from trash functionality",
  "Develop “Reports and Analysis” section",
  "Create admin panel for user management",
  "Implement multi-level subtask system",
  "Integrate GitHub sync for task tracking",
  "Optimize database for large datasets",
  "Create metrics system to track productivity",
  "Add task grouping by category functionality",
];

//function randomTaskName() {
//  return TASK_NAMES[Math.floor(Math.random() * TASK_NAMES.length)];
//}

//function createRandomTaskList(amount: number): KanbanCard[] {
//  return Array.from({ length: amount }, () => ({ id: nanoid(), title: randomTaskName() }));
//}

let INITIAL_BOARD: KanbanList[];

INITIAL_BOARD = [
  {
    id: nanoid(),
    title: "To Do",
    //cards: createRandomTaskList(15),
    cards: [],
    color: "teal.5",
  },
  {
    id: nanoid(),
    title: "In Progress",
    //cards: createRandomTaskList(4),
    cards: [],
    color: "grape.5",
  },
  {
    id: nanoid(),
    title: "Done",
    //cards: createRandomTaskList(30),
    cards: [],
    color: "gray.7",
  },
];

export const $board = createStore<KanbanBoard>(INITIAL_BOARD);
export const $userMode = createStore<boolean | null>(null);

export const boardUpdated = createEvent<KanbanBoard>();
export const userModeSet = createEvent<boolean>();

fetch("/api/userboard/get", {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((json) => {
    console.log(json);
    if (json.status == 200) {
      console.log(-1000, json.status, json);
      INITIAL_BOARD = json.userBoard.kanbanboard;
      boardUpdated(INITIAL_BOARD);
      userModeSet(true);
    }
    if (json.status == 401) {
      userModeSet(false);
    }
  })
  .catch((error) => console.log(error));

/////////////////////
export const cardCreateClicked = createEvent<{ card: KanbanCard; columnTitle: string }>();
export const cardDeleted = createEvent<any>();
export const cardUpdated = createEvent<any>();
///////////////////////

/* eslint-disable */
// @ts-ignore
$userMode.on(userModeSet, (state, payload: boolean) => (state = payload));

$board.on(cardCreateClicked, (board, { card, columnTitle }) => {
  const updatedBoard = board.map((column) => {
    if (column.title == columnTitle) {
      card.id = nanoid();
      return { ...column, cards: [...column.cards, card] };
    }

    return column;
  });

  from(updatedBoard)
    .pipe(
      exhaustMap((): any => {
        return fetch("/api/userboard/update", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedBoard),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 200) {
              boardUpdated(updatedBoard);
              userModeSet(true);
            }
            if (json.status == 401) {
              userModeSet(false);
            }
          })
          .catch((error) => console.log(error));
      }),
    )
    .subscribe();
});

$board.on(cardDeleted, (board, id) => {
  const updatedBoard = board.map((column) => {
    let columnTitle;
    const index = column.cards.findIndex((card) => card.id == id);
    if (index !== -1) {
      columnTitle = column.title;
    }
    if (column.title == columnTitle) column.cards.splice(index, 1);
    return column;
  });

  from(updatedBoard)
    .pipe(
      exhaustMap((): any => {
        return fetch("/api/userboard/update", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedBoard),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 200) {
              boardUpdated(updatedBoard);
              userModeSet(true);
            }
            if (json.status == 401) userModeSet(false);
          })
          .catch((error) => console.log(error));
      }),
    )
    .subscribe();
  console.log(888, updatedBoard);

  return updatedBoard;
});

$board.on(cardUpdated, (board, editedCard) => {
  const updatedBoard = board.map((column) => {
    column.cards.map((card) => {
      if (editedCard.id == card.id) return (card.title = editedCard.title);
    });

    return column;
  });

  from(updatedBoard)
    .pipe(
      exhaustMap((): any => {
        return fetch("/api/userboard/update", {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(updatedBoard),
        })
          .then((res) => res.json())
          .then((json) => {
            if (json.status == 200) {
              userModeSet(true);
              boardUpdated(updatedBoard);
            }
            if (json.status == 401) userModeSet(false);
          })
          .catch((error) => console.log(error));
      }),
    )
    .subscribe();
  console.log(888, updatedBoard);

  return updatedBoard;
});

$board.on(boardUpdated, (_, board) => board);

debug({ trace: true }, $board);
