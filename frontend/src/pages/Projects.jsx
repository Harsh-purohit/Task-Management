import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeProject } from "../features/projectSlice";
import ProjectModal from "../components/Projects/ProjectModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import ActivityTimeline from "../components/ActivityTimeline";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const navigate = useNavigate();

  // console.log("proj: ", projects);

  const [showModal, setShowModal] = useState(false);
  const [activeLogProject, setActiveLogProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL;

  const deleteProject = async (id) => {
    try {
      // const token = localStorage.getItem("token");

      // if (!token) {
      //   alert("Please login again");
      //   return;
      // }
      const confirmDelete = window.confirm("Delete this project?");
      if (!confirmDelete) return;

      const response = await axios.delete(`${url}/api/projects/${id}`, {
        withCredentials: true,
      });

      // console.log(response);
      dispatch(removeProject(id));
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="py-10 space-y-8 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Projects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-transform cursor-pointer"
        >
          + Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-gray-500 text-center py-20">
          No projects yet. Create your first project 🚀
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-6 rounded-xl shadow-sm hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="flex justify-between">
                <h3
                  className="text-lg font-medium cursor-pointer"
                  onClick={() => navigate(`/dashboard/projects/${project._id}`)}
                >
                  {project.name || project.title}
                </h3>

                <button
                  onClick={() =>
                    setActiveLogProject(
                      activeLogProject === project._id ? null : project._id,
                    )
                  }
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    size="lg"
                    style={{ color: "#63E6BE" }}
                  />
                </button>
              </div>

              {activeLogProject === project._id && (
                <ActivityTimeline id={project._id} />
              )}

              <p className="text-sm text-gray-500 mt-1">
                {project.description || "No description"}
              </p>

              <div className="flex gap-4 mt-4 text-sm">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    // style={{ color: "#0000ff" }}
                    size="lg"
                  />
                </button>

                <button
                  onClick={deleteProject.bind(null, project._id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    // style={{ color: "#ff0000" }}
                    size="lg"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showModal || selectedProject) && (
        <ProjectModal
          project={selectedProject}
          onClose={() => {
            setShowModal(false);
            setSelectedProject(null);
          }}
        />
      )}
    </div>
  );
};

export default Projects;
