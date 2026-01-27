import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const ActivityTimeline = ({ id }) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [logs, setLogs] = useState([]);

  console.log(id);

  useEffect(() => {
    const fetchLogs = async () => {
      const { data } = await axios.get(`${BACKEND_URL}/api/activity/${id}`, {
        withCredentials: true,
      });

      console.log(data);
      setLogs(data);
    };

    fetchLogs();
  }, [id]);

  return (
    <div className="space-y-3 max-h-60 overflow-y-auto">
      {logs.map((log) => (
        <div key={log._id} className="bg-gray-50 p-3 rounded-lg text-sm">
          <p>
            <span className="font-semibold">{log.userRef?.name}</span>{" "}
            {log.message}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(log.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;
