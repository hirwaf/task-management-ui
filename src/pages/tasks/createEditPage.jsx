import React, {useEffect, useRef, useState} from 'react';
import '../../App.css';
import {Helmet} from "react-helmet";
import {allUsers} from "../../services/user.service";
import 'select2/dist/css/select2.css';
import $ from 'jquery';
import {projects as projectsList} from "../../services/tasks.service";
import {useDispatch, useSelector} from "react-redux";
import {createTaskAction, updateTaskAction} from "../../redux/actions/task";
import {ErrorSpan} from "../../components/ErrorSpan";
import {LoadingSpinner} from "../../components/LoadingSpinner";

window.jQuery = $;
window.$ = $;
require('select2');
const CreateEditTaskPage = (props) => {
    const {task: createdTask, error, loading} = useSelector(state => state.task);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: '',
        start: '',
        end: '',
        isDraft: true,
        assignees: [],
        projects: [],
    });
    const [assignees, setAssignees] = useState([]);
    const [projects, setProjects] = useState([]);

    const assigneeSelect = useRef(null);
    const projectSelect = useRef(null);
    const [fileList, setFileList] = useState(null);
    const files = fileList ? [...fileList] : [];

    const handleFileChange = (e) => {
        setFileList(e.target.files);
    };
    const handleSave = (event) => {
        const {name, value} = event.target;
        let newTaskData = {...newTask};
        newTaskData[name] = value;
        setNewTask(newTaskData);
    };

    useEffect(() => {
        console.log(createdTask);
    }, [createdTask]);

    useEffect(() => {
        // Fetch data from API and initialize Select2
        allUsers().then(res => {
            setAssignees(res);
            $(assigneeSelect.current).select2();
        });

        projectsList().then(res => {
            setProjects(res);
            $(projectSelect.current).select2();
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (createdTask) {
            dispatch(updateTaskAction(createdTask.id, formData));
        } else {
            dispatch(createTaskAction(formData));
        }
    };
    return (
        <>
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Create Tasks - Task Management</title>
            </Helmet>
            <form className="space-y-4 py-4" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className={'w-full'}>
                    <label>Name</label>
                    <input type="text" name="title"
                           onChange={handleSave}
                           required
                           placeholder="Name" className="border p-2 w-full"/>
                </div>
                <div className={'flex row'}>
                    <div className={'w-full'}>
                        <label>Start Date</label>
                        <input type="datetime-local"
                               onChange={handleSave}
                               name="start" className="border p-2 w-full"/>
                    </div>
                    <div className={'w-full'}>
                        <label>End Date</label>
                        <input type="datetime-local"
                               onChange={handleSave}
                               name="end" className="border p-2 w-full"/>
                    </div>
                </div>

                <div className={'w-full'}>
                    <label>Assignees</label>
                    <select ref={assigneeSelect} name="assignees[]" multiple
                            onChange={handleSave}
                            className="border p-2 w-full">
                        {assignees.map(assignee => (
                            <option key={assignee.id} value={assignee.id}>{assignee.name}</option>
                        ))}
                    </select>
                </div>

                <div className={'w-full'}>
                    <label>Projects</label>
                    <select ref={projectSelect} name="projects[]" multiple
                            onChange={handleSave}
                            className="border p-2 w-full">
                        {projects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                    </select>
                </div>

                <div className={'w-full'}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleSave}
                        maxLength="100"
                        className="border p-2 w-full"
                    ></textarea>
                </div>

                <div className={'w-full'}>
                    <label>Priority</label>
                    <div className="space-x-4">
                        <label>
                            <input type="radio" name="priority" onChange={handleSave} value="High"
                                   className="mr-2"/> High
                        </label>
                        <label>
                            <input type="radio" name="priority" onChange={handleSave} value="Medium"
                                   className="mr-2"/> Medium
                        </label>
                        <label>
                            <input type="radio" name="priority" onChange={handleSave} value="Low" className="mr-2"/> Low
                        </label>
                    </div>
                </div>

                <div className={'w-full'}>
                    <label>attachments</label>
                    <input type="file" name="attachments[]" multiple
                           onChange={handleFileChange}
                           className="border p-2 w-full"/>
                    <div>
                        {files.map((file, i) => (
                            <li key={i}>
                                {file.name} - {file.type}
                            </li>
                        ))}
                    </div>
                </div>
                <div>
                    <ErrorSpan message={error} />
                </div>
                <button type="submit"
                disabled={loading === true}
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                    Submit { loading === true && <LoadingSpinner />}
                </button>
            </form>
        </>
    );
}

export default CreateEditTaskPage;
