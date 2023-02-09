import { render, screen, cleanup } from '@testing-library/react'
import TestRenderer from 'react-test-renderer';
import MainTask from '../MainTask'
import SubTask from '../SubTask'
import { Provider } from 'react-redux'
import store from '../../redux/store'

test('Should render MainTask component', () => {
    const mainTask = {
        taskName: "walk dog",
        id: 1,
        status: false,
        subtasks: [
            {
                subTaskName: "walk through park",
                status: false
            },
            {
                subTaskName: "get back home",
                status: false
            }
        ],
    }
    render(<Provider store={store}><MainTask showSubtasks={mainTask.showSubtasks} taskName={mainTask.taskName} id={mainTask.id} status={mainTask.status} subtasks={mainTask.subtasks} /></Provider>);
    const mainTaskElement = screen.getByTestId('mainTask-1');
    expect(mainTaskElement).toBeInTheDocument();
    expect(mainTaskElement).toHaveTextContent("walk dog");
});

cleanup();

test('Should render SubTask component', () => {
    const subTask = {
        mainTaskId: 1,
        index: 1, 
        subTaskName: "walk through park",
        status: false
    }
    render(<Provider store={store}><SubTask mainTaskId={subTask.mainTaskId} index={subTask.mainTaskId} subtaskName={subTask.subTaskName} status={false} /></Provider>);
    const subTaskElement = screen.getByTestId('subTask-1');
    expect(subTaskElement).toBeInTheDocument();
    expect(subTaskElement).toHaveTextContent("walk through park");
});

cleanup();

test('snapshot matched', ()=>{
    const mainTask = {
        taskName: "walk dog",
        id: 1,
        status: false,
        subtasks: [
            {
                subTaskName: "walk through park",
                status: false
            },
            {
                subTaskName: "get back home",
                status: false
            }
        ],
    }
    const tree = TestRenderer.create(<Provider store={store}><MainTask showSubtasks={mainTask.showSubtasks} taskName={mainTask.taskName} id={mainTask.id} status={mainTask.status} subtasks={mainTask.subtasks} /></Provider>).toJSON
    expect(tree).toMatchSnapshot();
});

cleanup();
