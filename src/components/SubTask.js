import { Close } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteSubTask, updateSubTaskStatus } from "../redux/list";

export default function SubTask(props) {
    const dispatch = useDispatch();

    const handleRemoveSubtask = () => {
        let payload = {
            mainTaskId: props.mainTaskId,
            index: props.index
        }
        dispatch(deleteSubTask(payload))
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: 'row',
                border: "1px solid #bbbbbb",
                borderRadius: 2,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "5px 10px"
            }}
            data-testid={`subTask-${props.index}`}
        >
            <Typography>{props.subtaskName}</Typography>
            <Box>
                <Checkbox
                    checked={props.status}
                    onChange={
                        (e) => {
                            dispatch(updateSubTaskStatus({
                                mainTaskId: props.mainTaskId,
                                index: props.index,
                                checked: e.target.checked
                            }))
                        }} />
                <IconButton
                    onClick={() => handleRemoveSubtask()}
                >
                    <Close />
                </IconButton>
            </Box>
        </Box>
    )
}