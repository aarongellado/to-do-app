import { createSlice } from '@reduxjs/toolkit'

export const listSlice = createSlice({
    name: 'list',
    initialState: {
        items: []
    },
    reducers: {
        newItem: (state, action) => {
            state.items.push(action.payload);
        },
        updateStatus: (state, action) => {
            let selectedItem;
            let tempArr = state.items.filter((el) => {
                if (el.id === action.payload.id) {
                    selectedItem = el
                }
                return el.id !== action.payload.id;
            });

            selectedItem.status = action.payload.status

            state.items = [...tempArr, selectedItem];
        },
        deleteItem: (state, action) => {
            let tempArr = state.items.filter((el) => {
                return el.id !== action.payload;
            });
            state.items = [...tempArr];
        },

        newSubTask: (state, action) => {
            let mainTask;
            let tempArr = state.items.filter((el) => {
                if (el.id === action.payload.id) {
                    mainTask = el;
                }
                return el.id !== action.payload.id;
            });
            mainTask.subtasks.push({
                subtaskName: action.payload.subtaskName,
                status: false
            });
            tempArr.push(mainTask)
        },
        deleteSubTask: (state, action) => {
            let selectedItem;
            let tempArr = state.items.filter((el) => {
                if (el.id === action.payload.mainTaskId) {
                    selectedItem = el;
                }
                return el.id !== action.payload.mainTaskId;
            });
            selectedItem.subtasks.splice(action.payload.index, 1);
            state.items = [...tempArr, selectedItem];
        },
        updateSubTaskStatus: (state, action) => {
            let selectedItem;
            let tempArr = state.items.filter((el) => {
                if (el.id === action.payload.mainTaskId) {
                    selectedItem = el;
                }
                return el.id !== action.payload.mainTaskId;
            });
            selectedItem.subtasks[action.payload.index].status = action.payload.checked
            state.items = [...tempArr, selectedItem];
        },
    },
})

// Action creators are generated for each case reducer function
export const { newItem, deleteItem, updateStatus, newSubTask, deleteSubTask, updateSubTaskStatus } = listSlice.actions

export default listSlice.reducer