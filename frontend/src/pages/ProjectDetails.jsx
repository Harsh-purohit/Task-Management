import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTasks, clearTasks } from "../features/taskSlice";
import TaskModal from "../components/Tasks/TaskModal";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks.tasks);

  const [showModal, setShowModal] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setTasks(data));
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();

    return () => dispatch(clearTasks());
  }, [id]);

  return (
    <div className="py-10 space-y-8 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Project Tasks</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-gray-500 text-center py-20">
          No tasks yet. Create one 🚀
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-lg shadow-sm flex justify-between"
            >
              <span>{task.title}</span>
              <span className="text-sm text-gray-500">{task.status}</span>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <TaskModal projectId={id} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default ProjectDetails;
