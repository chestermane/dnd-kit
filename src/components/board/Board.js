import React, { useState } from "react";
import BoardColumn from "../board-column/BoardColumn";
import Header from "../header/Header";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import styles from "./Board.module.css";

function Board() {
  const [newItem, setNewItem] = useState();

  const categories = ["ready", "inProgress", "completed"];
  const [activeItem, setActiveItem] = useState();
  const [items, setItems] = useState({
    ready: ["Create Feature Flags", "Update Copy", "Finalize API Design"],
    inProgress: [],
    completed: [],
  });

  const handleOnDragStart = ({ active }) => {
    setActiveItem(active.id);
  };

  const handleOnDragOver = ({ active, over }) => {
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const overType = over.data.current.type;

    if (overType === "Column") {
      const activeContainer = active?.data?.current?.sortable?.containerId;
      const overContainer = over?.data?.current?.columnName;

      if (!activeContainer || !overContainer) {
        return;
      }

      if (activeContainer !== overContainer) {
        const activeIndex = items[activeContainer].findIndex(
          (item) => item === activeItem
        );
 
        setItems((prev) => {
          const newActiveContainerItems = [...prev[activeContainer]];
          newActiveContainerItems.splice(activeIndex, 1);

          return {
            ...prev,
            [activeContainer]: newActiveContainerItems,
            [overContainer]: [...prev[overContainer], activeItem],
          };
        });
      }
    }

    if (overType === "Task") {
      const activeTask = active?.data?.current?.item;
      const activeContainer = active?.data?.current?.sortable.containerId;
      const overContainer = over?.data?.current?.sortable.containerId;

      const overTask = over?.data.current.item;

      if (activeTask === overTask) {
        return;
      }

      if (!activeTask || !overTask) {
        return;
      }

      if (activeContainer !== overContainer) {
        const activeIndex = items[activeContainer].findIndex(
          (item) => item === activeItem
        );

        setItems((prev) => {
          const newActiveContainerItems = [...prev[activeContainer]];
          newActiveContainerItems.splice(activeIndex, 1);

          return {
            ...prev,
            [activeContainer]: newActiveContainerItems,
            [overContainer]: [...prev[overContainer], activeItem],
          };
        });
        return;
      }

      const activeIndex = items[activeContainer].findIndex(
        (item) => item === activeItem
      );

      const overIndex = items[overContainer].findIndex(
        (item) => item === over.id
      );

      setItems({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    setActiveItem(null);

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const overType = over.data.current.type;

    if (overType === "Task") {
      const activeTask = active?.data?.current?.item;
      const activeContainer = active?.data?.current?.sortable.containerId;
      const overContainer = over?.data?.current?.sortable.containerId;

      const overTask = over?.id;

      if (activeTask === overTask) {
        return;
      }

      if (!activeTask || !overTask) {
        return;
      }

      const activeIndex = items[activeContainer].findIndex(
        (item) => item === activeItem
      );

      const overIndex = items[overContainer].findIndex(
        (item) => item === over.id
      );

      setItems({
        ...items,
        [overContainer]: arrayMove(
          items[overContainer],
          activeIndex,
          overIndex
        ),
      });
    }
  };

  const addNewTask = () => {
    setItems((prevItems) => ({
      ...prevItems,
      ready: [...prevItems.ready, newItem],
    }));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className={styles.container}>
      <Header />
      <Input
        placeholder="Add New Task"
        onChange={(e) => setNewItem(e?.target?.value)}
        w="30%"
        mb={2}
        justifyContent="center"
      />
      <Button colorScheme="blackAlpha" onClick={addNewTask}>
        Add New Task
      </Button>
      <DndContext
        onDragStart={handleOnDragStart}
        onDragOver={handleOnDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <div className={styles.board}>
          {categories.map((category) => (
            <BoardColumn
              key={category}
              columnName={category}
              items={items[category]}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default Board;
