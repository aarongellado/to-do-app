import { Add, Close } from "@mui/icons-material";
import { Box, IconButton, Input, TextField, Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { newSubTask, deleteItem, updateStatus } from "../redux/list";
import SubTask from "./SubTask";

export default function MainTask(props) {
    const [subtaskValue, setSubtaskValue] = useState('');
    const dispatch = useDispatch();

    const handleAddSubtask = () => {
        let payload = {
            taskName: props.taskName,
            id: props.id,
            status: props.status,
            subtasks: props.subtasks,
            subtaskName: subtaskValue
        }
        dispatch(newSubTask(payload));
        setSubtaskValue('');
    }

    const handleRemoveTask = () => {
        dispatch(deleteItem(props.id));
    }

    return (
        <Box
            sx={{
                width: .23,
                marginRight: "2%"
            }}
            data-testid={`mainTask-${props.id}`}
        >
            {console.log(props)}
            <Box
                className="main-task-container"
                sx={{
                    border: "1px solid #bbbbbb",
                    borderRadius: 2,
                    maxWidth: 1,
                    marginTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingLeft: "10px"
                }}
            >
                <Typography variant="h6">{props.taskName}</Typography>
                <Box>
                    <Checkbox
                        checked={props.status}
                        onChange={(e) => {
                            dispatch(updateStatus({
                                id: props.id,
                                status: e.target.checked
                            }))
                        }}
                    />
                    <IconButton onClick={() => handleRemoveTask()}><Close /></IconButton>
                </Box>
            </Box>
            {props.showSubtasks &&
                <Box
                    className="subtask-container"
                    sx={{
                        maxWidth: .95,
                        marginLeft: "2.5%"
                    }}>
                    {props.subtasks.length > 0 &&
                        props.subtasks.map((el, index) => {
                            return (
                                <SubTask
                                    subtaskName={el.subtaskName}
                                    status={el.status}
                                    index={index}
                                    mainTaskId={props.id}
                                />
                            );
                        })
                    }
                    <Box
                        sx={{
                            border: "1px solid #bbbbbb",
                            borderRadius: 2,
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px 10px"
                        }}
                    >
                        <TextField
                            sx={{ width: "auto" }}
                            size="small"
                            value={subtaskValue}
                            onInput={(e) => setSubtaskValue(e.target.value)}
                        />
                        <IconButton onClick={() => handleAddSubtask()}><Add /></IconButton>
                    </Box>
                </Box>
            }
        </Box>
    )
}