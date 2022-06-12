import React, { useState } from "react";
import useSWR from "swr";
import { Todo } from "../../lib/db";
import axios from '../../services/axios'

function AddTodo() {
  const { data: todos, mutate } = useSWR('/api/todo')

  const [description, setDescription] = useState("")

  const handleClick = async (e: any) => {
    try {
      const newData = [...todos, { description }]
      mutate(newData, false)

      await axios.post('api/todo', { description })
      setDescription('')
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div>
      <div className="flex justify-center mt-10">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h1 className="text-center mb-4">Lista de Todos</h1>
          <div className="flex space-x-2 p-2 bg-white rounded-md">
            <input
              value={description}
              onChange={(e) => setDescription(e.currentTarget.value)}
              type="text"
              placeholder="Write here..."
              className="w-full outline-none"
            />
            <button
              className="bg-green-500 px-2 py-1 rounded-md text-white font-semibold"
              onClick={handleClick}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
