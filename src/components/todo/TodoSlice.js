import { createSlice, nanoid } from "@reduxjs/toolkit";
// import { sub, format} from 'date-fns';
const initialState = [
    { id:'1', 
    name:"Buy bread",
    content: "We need buy bread for dinner",
    state: "Done",
    },
    {
    id:'2', 
    name:"Buy ",
    content: "Buy butter",
    state: "To do",
    }
];

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        taskAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare( name, content, state, isEditing ) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        content,
                        state,
                        // isEditing: false
                    }
                }
            }
        },
        taskUpdatedState: (state, action) => {
            const { id, taskState } = action.payload;
            const task = state.find((task) => task.id === id);
            if (task) {
                task.state = taskState;
            }
        },
       
        taskUpdated: (state, action) => {
            const { id, state: taskState, name: taskName, content: taskContent } = action.payload;
        
            return state.map(task => {
                if (task.id === id) {
                    return {
                        ...task,
                        state: taskState,
                        name: taskName,
                        content: taskContent,
                    };
                }
                return task;
            });
        },
        taskDeleted: (state, action) => {
            const taskId = action.payload;
            return state.filter(task => task.id !== taskId);
        },
    }})

export const selectAllTasks = (state) => state.tasks;


export const { taskAdded,taskUpdatedState, taskUpdated, taskDeleted} = taskSlice.actions;

export default taskSlice.reducer;