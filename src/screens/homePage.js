import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid'
import { Box, Button, Input, TextField } from '@mui/material';
import { newItem } from '../redux/list';
import { useSelector, useDispatch } from 'react-redux';
import MainTask from '../components/MainTask';

function Home() {
  const list = useSelector((state) => state.list.items);
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState('');

  const handleNewItem = () => {
    let id;
    let maxId = 0;
    if (list.length > 0) {
      list.forEach((el) => {
        if (el.id > maxId) {
          maxId = el.id
        }
      });
      id = maxId + 1;
    } else {
      id = 0;
    }
    let taskObj = {
      taskName: taskName,
      id: id,
      status: false,
      subtasks: []
    }
    dispatch(newItem(taskObj));
    setTaskName('');
  }


  return (
    <div>
      {/* <Grid container spacing={2} justify="center">
        {isSuccess && dataStore.map(item => (
          <Grid item xs={12} sm={6} md={4}>
            <Card title={item.title} text={item.text_content} />
          </Grid>
        ))}
      </Grid>
      {!isSuccess && error} */}
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <TextField
          sx={{
            width: 1,
          }}
          size="small"
          label="Task"
          value={taskName}
          onInput={(e) => { setTaskName(e.target.value) }}
        />
        <Button
          sx={{
            width: .08,
          }}
          variant='contained'
          type='submit'
          onClick={() => handleNewItem()}
        >
          Add to do
        </Button>
      </Box>
      {console.log(list)}
      
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {
          list.map((el) => {
            return <MainTask taskName={el.taskName} id={el.id} status={el.status} subtasks={el.subtasks} />
          })
        }
      </Box>
    </div>
  );
}

export default Home;