import { FlatList, TextInput, View, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native"
import { useAuth } from "../../contexts/AuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "../../contexts/NotificationContext";
import { createTask, deleteTask, getTasksPerIdUser, updateTask } from "../../services/tasks";
import Header from "./components/Header";
import Footer from "./components/Footer";
import styled from "styled-components/native";
import { Task } from "../../interfaces";
import TaskItem from "./components/Task";


const Home = () => {
  const { user } = useAuth()
  const { notify } = useNotification()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [filterInputText, setFilterInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const LIMIT_REQUESTS = 20;
  const filteredList = filterInputText.length > 0 ?
    tasks?.filter((item) => item.title.toLowerCase().includes(filterInputText.toLowerCase())) :
    tasks

  useEffect(() => {
    user && getTasks()
  }, [user])

  const getTasks = async (newPage = 0) => {
    if (!user?.id || loading || loadingMore || !hasMoreData) return; 
    const offset = newPage > 0 ? ((newPage - 1) * LIMIT_REQUESTS) : 0

    newPage === 0 ? setLoading(true) : setLoadingMore(true)

    try {

      const { data } = await getTasksPerIdUser(offset, LIMIT_REQUESTS, user?.id)
      if (data.data) {
        setTasks((prevTasks) => (newPage === 0 ? data.data : [...prevTasks, ...data.data]));
        data.data.length < LIMIT_REQUESTS && setHasMoreData(false);
      } else notify('error', data.message);

    } catch (error) {
      notify('error', 'Error to get tasks');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const { data } = await deleteTask(id)
    if (data.data > 0) {
      setTasks(prev => prev.filter(e => e.id !== id))
      notify('success', data.message)
    } else notify('error', data.message)
  }

  const handleAddNewTask = useCallback(async (inputValue: string) => {
    if (inputValue.trim() === "" || !user?.id) return;

    const { data } = await createTask(inputValue, user?.id)
    if (data.data) {
      setTasks(prev => [...prev, data.data])
      notify('success', data.message)
    } else notify('error', data.message)
  }, [user?.id]);

  const handleCompleteTask = async (task: Task, value: boolean, showNotify = false) => {
    const { data } = await updateTask(task.id, value, task.title)

    if (data.data.affected > 0) {
      setTasks(prevTasks =>
        prevTasks.map(oldTask =>
          oldTask.id === task.id
            ? { ...task, completed: value }
            : oldTask
        )
      )
      showNotify && notify('success', data.message)
    } else notify('error', data.message)

  }

  const loadMoreTasks = () => {
    if (!loadingMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      getTasks(nextPage);
    }
  };

  const renderEmptyList = () => (
    <NoDataText >No activities found.</NoDataText>
  );

  return (
    <Container>
      <Header setFilterInputText={setFilterInputText} />
      {loading ? (
        <ViewLoader style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </ViewLoader>
      ) : (
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={filteredList}
          keyExtractor={(item) => item.id}
          onEndReached={() => loadMoreTasks()}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              handleCompleteTask={handleCompleteTask}
              handleDeleteTask={handleDeleteTask}
            />
          )}
          ListEmptyComponent={renderEmptyList}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#0000ff" /> : null}
        />
      )}
      <Footer handleAddNewTask={handleAddNewTask} />
    </Container>

  );
}

const Container = styled(View)`
  padding: 10px;
  flex:1;
`;

const NoDataText = styled.Text`
  font-size: 18px;
  text-align: center;
  margin-top: 15px;
`;

const ViewLoader = styled.View`
  flex:1;
  align-items:center;
  justify-content:center
`


export default Home