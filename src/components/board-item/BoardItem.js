import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Card,
  CardBody,
  Text,
  Badge,
  Avatar,
  Container,
} from "@chakra-ui/react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function BoardItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item,
      data: {
        type: "Task",
        item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      w="100%"
      bg="whitesmoke"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      <CardBody display='flex' flexDirection='column' justifyContent='space-between' alignItems='center'>
        <Text> {item}</Text>
        <Container display='flex' justifyContent='space-between'>
          <Badge colorScheme="red">high</Badge>
          <Avatar
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
            size="xs"
          />
        </Container>
      </CardBody>
    </Card>
  );
}

export default BoardItem;
