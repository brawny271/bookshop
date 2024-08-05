import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://68.178.162.203:8080/application-test-v1.1/books";

const initialState = {
  books: {
    items: [],
    status: "idle",
    error: null,
  },
  filters: {
    sort: "ASC",
    category: [],
    priceRange: [],
    ratingRange: [],
  },
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async (title) => {
  const response = await axios.get(`${API_URL}?title=${title}`);
  return response.data;
});

export const addBook = createAsyncThunk("books/addBook", async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
});

export const editBook = createAsyncThunk("books/editBook", async (book) => {
  const response = await axios.put(`${API_URL}/${book.id}`, book);
  return response.data;
});

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books.items = action.payload;
      state.books.status = "succeeded";
    },
    setSortOrder: (state, action) => {
      state.filters.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.books.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books.items = action.payload;
        state.books.status = "succeeded";
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.books.status = "failed";
        state.books.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.items.push(action.payload);
      })
      .addCase(editBook.fulfilled, (state, action) => {
        const index = state.books.items.findIndex(book => book.id === action.payload.id);
        state.books.items[index] = action.payload;
      });
  },
});

export const { setBooks, setSortOrder } = bookSlice.actions;

export default bookSlice.reducer;
