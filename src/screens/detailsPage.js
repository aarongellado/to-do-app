import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import MainTask from '../components/MainTask';

export default function Details() {
  const list = useSelector((state) => state.list.items);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {
          list.map((el) => {
            return <MainTask showSubtasks={true} taskName={el.taskName} id={el.id} status={el.status} subtasks={el.subtasks} />
          })
        }
      </Box>
    </div>
  );
}