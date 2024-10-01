import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import todoService from "../services/todoService";

const BASE_URL = "http://localhost:3000/todoList/";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  try {
    const { data } = await todoService.getAll();
    return data;
  } catch (error) {
    alert("Error");
  }
});

export const createTodoThunk = createAsyncThunk(
  "createTodo",
  async (body, thunkAPI) => {
    await todoService.create(body);
    thunkAPI.dispatch(fetchTodos());
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "deleteTodo",
  async (todoId, thunkAPI) => {
    await todoService.delete(todoId);
    thunkAPI.dispatch(fetchTodos());
  }
);

export const updateToDoThunk = createAsyncThunk(
  "updateTodo",
  async (newTodo, thunkAPI) => {
    const { todoDetail } = thunkAPI.getState().todos;
    await todoService.update(todoDetail.id, newTodo);
    thunkAPI.dispatch(fetchTodos());
    thunkAPI.dispatch(setTodoDetail({}));
  }
);

const initialState = {
  todos: [],
  status: "idle",
  todoDetail: {},
};

const ToDoList = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoDetail: (state, action) => {
      state.todoDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setTodoDetail } = ToDoList.actions;

export default ToDoList.reducer;
