import { useState, useEffect } from "react";
import { Trash2, Edit, BookmarkPlus } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState([
    { id: 1, nama: "solat subuh", completed: false },
    { id: 2, nama: "piket asrama", completed: false },
    { id: 3, nama: "piket kampus", completed: true },
  ]);

  const [newProduct, setNewProduct] = useState({ nama: "" });
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [filter, setFilter] = useState("all");
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("id");

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      if (storedTasks) {
        setTasks(storedTasks);
      }
    } catch (error) {
      console.error("Error parsing tasks from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const isConfirmed = window.confirm(
      `Apakah Anda yakin ingin menghapus tugas dengan ID ${taskId} ?`
    );
    if (isConfirmed) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const handleAdd = () => {
    setShowAddProductForm(true);
  };

  const handleAddProduct = () => {
    if (newProduct.nama) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: prevTasks.length + 1, nama: newProduct.nama, completed: false },
      ]);
      resetNewProductForm();
    } else {
      alert("Harap isi semua field");
    }
  };

  const resetNewProductForm = () => {
    setNewProduct({ nama: "" });
    setShowAddProductForm(false);
    setEditTask(null);
  };

  const handleToggleCompleted = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleEdit = (taskId) => {
    setEditTask(taskId);
    setShowAddProductForm(true);
    setNewProduct({
      nama: tasks.find((task) => task.id === taskId).nama,
    });
  };

  const handleEditProduct = () => {
    if (newProduct.nama) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editTask ? { ...task, nama: newProduct.nama } : task
        )
      );
      resetNewProductForm();
    } else {
      alert("Harap isi semua field");
    }
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.nama.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) => {
      if (filter === "all") {
        return true;
      } else if (filter === "completed") {
        return task.completed;
      } else {
        return !task.completed;
      }
    });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === "id") {
      return a.id - b.id;
    } else if (sortOption === "nama") {
      return a.nama.localeCompare(b.nama);
    } else if (sortOption === "status") {
      return a.completed - b.completed;
    }
  });

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Tugas Harian</h2>
        <button
          className="bg-blue-500 text-white p-3 rounded-full"
          onClick={handleAdd}
        >
          <BookmarkPlus size={24} />
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => handleFilterChange("all")}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            filter === "all" && "opacity-75"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => handleFilterChange("completed")}
          className={`bg-green-500 text-white px-4 py-2 rounded ${
            filter === "completed" && "opacity-75"
          }`}
        >
          Selesai
        </button>
        <button
          onClick={() => handleFilterChange("unfinished")}
          className={`bg-red-500 text-white px-4 py-2 rounded ${
            filter === "unfinished" && "opacity-75"
          }`}
        >
          Belum Selesai
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Cari tugas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full mr-2"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="id">ID</option>
          <option value="nama">Nama</option>
          <option value="status">Status</option>
        </select>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li
            key={task.id}
            className={`flex justify-between items-center p-4 mb-2 border rounded ${
              task.completed ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <span
              className={`flex items-center ${
                task.completed ? "line-through" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(task.id)}
                className="mr-2"
              />
              {task.nama}
            </span>
            <div>
              <button
                className="mr-2 text-blue-500"
                onClick={() => handleEdit(task.id)}
              >
                <Edit className="inline" /> Edit
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDelete(task.id)}
              >
                <Trash2 className="inline" /> Hapus
              </button>
            </div>
          </li>
        ))}
      </ul>
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h1 className="text-xl mb-4">
              {editTask ? "Edit" : "Tambah"} Tugas
            </h1>
            <label className="block mb-2">
              Nama
              <input
                type="text"
                value={newProduct.nama}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, nama: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
            <div className="flex justify-between">
              <button
                onClick={editTask ? handleEditProduct : handleAddProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
              <button
                onClick={resetNewProductForm}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
