import React from "react";
import { Box, Typography } from "@mui/material";
import Task from "../Task";
import { useSelector, useDispatch } from "react-redux"; // Import the useDispatch hook
import { deleteTask } from "../../reducers"; // Import the deleteTask action

const TodoList = () => {
  const dispatch = useDispatch(); // Create a dispatch function
  const tasks = useSelector((state) => state.tasks);

  return (
    <Box mx={4} my={2}>
      <Typography variant="h4">My list</Typography>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          header={task.header}
          task={task.task}
          date={task.date}
          time={task.time}
          id={task.id}
          isCheckedTask={task.isCheckedTask}
          urgency={task.urgency}
          onDelete={() => dispatch(deleteTask(task.id))} // Use the new handler
          index={index}
        />
      ))}
    </Box>
  );
};

export default TodoList;
