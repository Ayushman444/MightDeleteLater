import { useState } from "react";
import "./App.css";
import NewTaskModel from "./components/NewTaskModel";
import DescriptionModal from "./components/DescriptionModal";

// A custom component for each task item
const TaskItem = ({ task, onDelete, onComplete, onSelect, isSelected }) => {
  const backgroundColor = isSelected ? "bg-gray-200" : "bg-white";

  return (
    <div
      className={`flex items-center ${backgroundColor} w-[100%] rounded-lg justify-between p-2 border-b-2 mb-2 font-bold`}
      onClick={() => onSelect(task.id)}
    >
      <div className="flex items-center">
        <span className={task.completed ? "line-through text-gray-400" : ""}>
          {task.description}
        </span>
      </div>

      <div className="flex">
        {task.completed ? (
          // Render delete only for completed tasks
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded-md bg-red-300 text-red-800 font-bold px-4 mr-2"
          >
            Delete
          </button>
        ) : (
          <>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 rounded-md bg-red-300 text-red-800 font-bold px-4 mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => onComplete(task.id)}
              className="p-1 rounded-md bg-green-300 text-green-800 font-bold px-4 mr-2 hidden lg:block "
            >
              Complete
            </button>
          </>
        )}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task.id)}
          className="mr-2"
        />
      </div>
    </div>
  );
};

// The main component for the to-do list app
const App = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [descShow, setDescShow] = useState(false);
  const handleDescShow = () => setDescShow(true);
  const handleDescClose = () => setDescShow(false);

  // Data for the tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      description: "Buy a file",
      completed: false,
      dateCreated: new Date("2023-01-01"),
      dueDate: new Date("2023-01-10"),
      imageUrl: "https://i.imgflip.com/3m9bmx.png",
    },
    {
      id: 2,
      description: "Call Rohan and ask him if he has completed his assignment",
      completed: false,
      dateCreated: new Date("2023-01-02"),
      dueDate: new Date("2023-01-15"),
      imageUrl:
        "https://th.bing.com/th/id/OIP.iTV0hYDoAcMiNljgA84rHgHaIY?w=600&h=679&rs=1&pid=ImgDetMain",
    },
    {
      id: 3,
      description: "Take back power bank from sachin",
      completed: false,
      dateCreated: new Date("2023-01-05"),
      dueDate: new Date("2023-01-20"),
      imageUrl:
        "https://th.bing.com/th/id/OIP.Kn6fbpVuxpPKvQPqkdgdEgAAAA?rs=1&pid=ImgDetMain",
    },
    {
      id: 4,
      description: "Get my girlfriend's phone recharged",
      completed: false,
      dateCreated: new Date("2023-01-03"),
      dueDate: new Date("2023-01-12"),
      imageUrl:
        "https://th.bing.com/th/id/OIP.sZtcIwIkko0dKKF9h_PwNwHaHC?w=1022&h=971&rs=1&pid=ImgDetMain",
    },
    {
      id: 5,
      description: "If the text is too long for heading, Try to change it",
      completed: false,
      dateCreated: new Date("2023-01-04"),
      dueDate: new Date("2023-01-18"),
      imageUrl:
        "https://i.pinimg.com/originals/a3/b8/5c/a3b85c97a71b549904c12b13eaf1c493.png",
    },
  ]);

  // A state variable for the task input
  const [taskInput, setTaskInput] = useState("");

  // A state variable for the selected task
  const [selectedTask, setSelectedTask] = useState(null);

  // A function to handle the task input change
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const sortByDateCreated = () => {
    const sortedTasks = [...tasks].sort(
      (a, b) => a.dateCreated - b.dateCreated
    );
    setTasks(sortedTasks);
  };

  const sortByDueDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.dueDate - b.dueDate);
    setTasks(sortedTasks);
  };

  // A function to handle the task form submit
  const handleTaskFormSubmit = (e) => {
    e.preventDefault();
  };

  // A function to handle the task deletion
  const handleTaskDelete = (id) => {
    // Filter out the task with the given id
    const newTasks = tasks.filter((task) => task.id !== id);
    // Set the new tasks array
    setTasks(newTasks);
    // Clear the selected task if it is deleted
    if (selectedTask && selectedTask.id === id) {
      setSelectedTask(null);
    }
  };

  // function to handle the task completion
  const handleTaskComplete = (id) => {
    // Map the tasks array and change the completed status of the task with the given id
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    // setting the new tasks array
    setTasks(newTasks);
  };

  // function to handle the task selection
  const handleTaskSelect = (id) => {
    // Find the task with the given id
    const task = tasks.find((task) => task.id === id);
    // Setting the selected task
    setSelectedTask(task);
  };

  return (
    <>
      <NewTaskModel
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
      <DescriptionModal
        handleDescClose={handleDescClose}
        handleDescShow={handleShow}
        descShow={descShow}
        selectedTask={selectedTask}
      />

      <div className="container mx-auto p-4">
        {/* //Heading hai  */}
        <div className="bg-white p-4 rounded-lg  mb-4">
          <h1 className="text-6xl font-bold text-blue-800">To-Do List</h1>
        </div>

        {/* //Buttons Hain */}
        <div className="flex flex-col-reverse items-center justify-items-center mb-4 w-[94%] lg:justify-items-end lg:flex-row-reverse ">
          <div className="ml-8">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out md:hidden sm:inline lg:inline lg:mt-0 sm:mt-4 sm:mr-8 "
              onClick={handleShow}
            >
              Create new task
            </button>
          </div>
          <div className="flex flex-row border-solid border-2 border-blue-900 rounded-lg px-0">
            <div className="bg-blue-200 px-4 py-1 ml-0 rounded-l-md">
              Sort by
            </div>
            <div className="px-4 py-1 mb-0  bg-gray-400">
              <button onClick={sortByDateCreated} className="">
                Date Created
              </button>
            </div>
            <div className="px-4 py-1">
              <button onClick={sortByDueDate}>Due Date</button>
            </div>
          </div>
        </div>

        {/* Main Dabba hai */}
        <div className="flex w-[90%] h-[470px] mx-auto bg-blue-200 rounded-lg">
          {/* Task wala dabba hai  */}
          <div
            id="task-list"
            className="ml-0 w-[100%] h-[100%]  rounded-l-lg border-r-4 border-r-gray-400 lg:w-[70%] "
          >
            {/* Pending Tasks Heading */}
            <div className="mb-6 flex flex-row justify-between">
              <h2 className="text-2xl font-bold px-4 pt-4">Pending Tasks</h2>
              <div className="ml-8">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out hidden md:block lg:hidden mt-4 mr-4"
                  onClick={handleShow}
                >
                  Create new task
                </button>
              </div>
            </div>

            {/* Tasks hain */}
            <div
              id="TasksList"
              className="mr-2 ml-0 w-[100%] h-[325px] overflow-y-auto"
            >
              <ul className="ml-0 w-[100%]">
                {tasks.map((task) => (
                  <TaskItem
                    className="w-[100%]"
                    key={task.id}
                    task={task}
                    onDelete={handleTaskDelete}
                    onComplete={handleTaskComplete}
                    onSelect={handleTaskSelect}
                    isSelected={selectedTask && selectedTask.id === task.id}
                  />
                ))}
              </ul>
            </div>

            {/* Ye kya hai */}

            <div
              id="Random"
              className="flex flex-row w-[100%] h-16 border rounded-md"
            >
              <div className="bg-blue-300 w-1/2 h-[100%] font-bold mt-0 mb-0 rounded-l-md flex justify-center items-center">
                <span>Pending</span>
              </div>
              <div className="w-1/2 h-[100%] text-center font-bold bg-blue-100 rounded-r-md flex justify-center items-center">
                Completed
              </div>
            </div>
          </div>

          {/* Description wala hai */}
          <div
            id="description"
            className="mx-auto w-1/2 p-4 rounded-r-lg  overflow-y-auto hidden lg:block "
          >
            <button className="rounded-md text-black" onClick={handleDescShow}>
              <h1>Description</h1>
            </button>
            {selectedTask ? (
              <>
                <h2 className="text-xl font-bold mb-2">
                  {selectedTask.description}
                </h2>
                <p className="text-gray-600">
                  Due:{" "}
                  {selectedTask.dueDate
                    ? selectedTask.dueDate.toLocaleDateString()
                    : "Not specified"}
                </p>
                <p className="text-gray-600 mt-4">
                  {selectedTask.details ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
                </p>
                {selectedTask.imageUrl && (
                  <img
                    src={selectedTask.imageUrl}
                    alt="Task Image"
                    className="mt-4 rounded-md w-[200px]"
                  />
                )}
              </>
            ) : (
              <p className="text-center text-gray-400">
                Select a task to see the description
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
