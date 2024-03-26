import React from "react";
import BoardItem from "../board-item/BoardItem";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Box, Text } from "@chakra-ui/react";

import styles from "./BoardColumn.module.css";

function BoardColumn({ columnName, items }) {
  const { setNodeRef } = useSortable({
    id: columnName,
    data: {
      type: "Column",
      columnName,
    },
  });

  return (
    <div className={styles.boardContainer} ref={setNodeRef}>
      <Text textTransform='uppercase'> {columnName}</Text>

      <Box
        border="1px solid black"
        borderRadius={5}
        w="100%"
        h="100%"
        p={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="15px"
      >
        <SortableContext
          id={columnName}
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items?.map((item) => (
            <BoardItem key={item} item={item} />
          ))}
        </SortableContext>
      </Box>
    </div>
  );
}

export default BoardColumn;
