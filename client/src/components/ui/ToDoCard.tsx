import React, { useState } from 'react';
import { Button, Card, CardBody, Flex, Input, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import type { CardType } from '../../types/CardTypes';

type CardTypes = {
  card: CardType;
  deleteHandler: (id: CardType['id']) => void;
  editHandler: (id: CardType['id'], updatedCard: CardType) => void;
  updateStatusHandler: (id: CardType['id'], status: string) => void;
};

export default function ToDoCard({
  card,
  deleteHandler,
  editHandler,
  updateStatusHandler,
}: CardTypes): JSX.Element {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSave = (): void => {
    setIsEditing(false);
    editHandler(card.id, { ...card, title, description });
  };

  return (
    <Card>
      <CardBody>
        <Flex justify="space-between" align="center">
          <Flex align="center">
            {isEditing ? (
              <>
                <Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <Text>{card.title}</Text>
                <Text>{card.description}</Text>
                <Text>{card.status}</Text>
              </>
            )}
          </Flex>
          <Flex>
            {isEditing ? (
              <Button colorScheme="green" onClick={handleSave}>
                Save
              </Button>
            ) : (
              <>
                <Button colorScheme="blue" onClick={handleEdit} mr={2}>
                  Edit
                </Button>
                <Button colorScheme="red" onClick={() => deleteHandler(card.id)}>
                  Delete
                </Button>
                <Menu>
                  <MenuButton as={Button} colorScheme="blue" ml={2}>
                    Change Status
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => updateStatusHandler(card.id, 'Новая')}>Новая</MenuItem>
                    <MenuItem onClick={() => updateStatusHandler(card.id, 'В обработке')}>В обработке</MenuItem>
                    <MenuItem onClick={() => updateStatusHandler(card.id, 'Завершена')}>Завершена</MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
