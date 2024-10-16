import React, { useState } from "react";
import { Button, Pressable, Text } from "react-native";
import { Task } from "../../../../interfaces";
import styled from "styled-components/native";
import Checkbox from "../../../components/Checkbox";
import Edit from '../../../../images/edit.png'
import Trash from '../../../../images/trash.png'

interface TaskProps {
  task: Task,
  handleCompleteTask: (item: Task, newValue: boolean, showNotify: boolean) => void
  handleDeleteTask: (id: string) => void
}

const TaskItem: React.FC<TaskProps> = ({ task, handleCompleteTask, handleDeleteTask },) => {
  const [editingItemId, setEditingItemId] = useState<string>('');
  const [editInputValue, setEditInputValue] = useState<string>("");
  const [excludingID, setExcludingID] = useState<string>("");

  const handleUpdateTitle = async () => {
    if (editInputValue.length === 0) return setEditingItemId('')

    const newtask = { ...task, title: editInputValue }
    await handleCompleteTask(newtask, task.completed, true)
    setEditingItemId('')
  }

  return (
    <Container onPress={() => handleCompleteTask(task, !task.completed, false)}>
      {(editingItemId === task.id && !excludingID) && (
        <InputEdit
          autoFocus
          value={editInputValue}
          onChangeText={setEditInputValue}
          onSubmitEditing={handleUpdateTitle}
        />
      )}
      {!excludingID && !editingItemId &&
        (<Checkbox
          label={task.title}
          onChange={(value) => handleCompleteTask(task, value, false)}
          value={task.completed}
          strikeThroughOnChecked
        />)
      }

      {(excludingID === task.id && !editingItemId) &&
        <TextQuestionExclusion>Are you sure about this?</TextQuestionExclusion>
      }

      {(editingItemId !== task.id && !excludingID) ?
        <ViewOptions>
          <Pressable onPress={() => {
            setEditInputValue(task.title)
            setEditingItemId(task.id)
          }}>
            <ActionIcon source={Edit} />
          </Pressable>
          <Pressable onPress={() => {
            setEditInputValue('')
            setExcludingID(task.id)
          }}>
            <ActionIcon source={Trash} />
          </Pressable>
        </ViewOptions>
        :
        <ViewOptions>

          <Button
            title={excludingID ? 'Yes' : 'Save'}
            onPress={excludingID ?
              () => handleDeleteTask(task.id) :
              () => handleUpdateTitle()} />

          <ButtonCancel onPress={() => {
            setEditingItemId('')
            setExcludingID('')
          }} >
            <TextCancel>CANCEL</TextCancel>
          </ButtonCancel>
        </ViewOptions>
      }

    </Container >
  );
};

const InputEdit = styled.TextInput`
      flex:1;
      border:1px solid black;
      padding:2px;
      margin-right: 5px
      `

const Container = styled.TouchableOpacity`
      flex-direction:row;
      align-items: center;
      justify-content:space-between;
      margin-vertical: 8px;
      `

const ViewOptions = styled.View`
      gap:5px;
      flex-direction:row
      `
const ActionIcon = styled.Image`
      width: 32px;
      height: 32px;
      `
const ButtonCancel = styled.TouchableOpacity`
      width:60px;
      background-color:red;
      align-items:center;
      justify-content:center;
      `

const TextCancel = styled.Text`
      color:white;
      font-weight:bold
      `
const TextQuestionExclusion = styled.Text`
font-size:18px;
font-weight: bold;
text-align:center`

export default TaskItem;
