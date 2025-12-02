import React, { useState } from "react";
import { PenLine, Trash2, Save, SaveOff, Plus } from "lucide-react";

const ExperienceTable = () => {
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      company: "Google",
      position: "Software Engineer",
      startDate: "2020",
      endDate: "2022",
      isEditing: false,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const handleEdit = (id: number) => {
    setExperienceList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSave = (id: number, updatedItem: any) => {
    setExperienceList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...updatedItem, isEditing: false } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setExperienceList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => setIsAdding(true);

  const handleSaveNew = () => {
    if (!newItem.company || !newItem.position) return;
    setExperienceList((prev) => [
      ...prev,
      { id: Date.now(), ...newItem, isEditing: false },
    ]);
    setNewItem({ company: "", position: "", startDate: "", endDate: "" });
    setIsAdding(false);
  };

  const handleCancelNew = () => {
    setNewItem({ company: "", position: "", startDate: "", endDate: "" });
    setIsAdding(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Update Your Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-left text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-3 pr-6 text-center md:w-[200px]">Actions</th>
            <th className="py-3 pr-6">Company</th>
            <th className="py-3 pr-6">Position</th>
            <th className="py-3 pr-6">Start Date</th>
            <th className="py-3 pr-6">End Date</th>
          </tr>
        </thead>
        <tbody>
          {/* Add New Row */}
          {isAdding && (
            <tr className="hover:bg-violet-50">
              <td className="py-3 pr-6 flex gap-1 justify-center">
                <button
                  onClick={handleSaveNew}
                  className="text-green-600 hover:text-green-800"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancelNew}
                  className="text-red-600 hover:text-red-800"
                >
                  <SaveOff className="w-4 h-4" />
                </button>
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Company"
                  className="input input-bordered w-full border rounded px-2 py-1"
                  value={newItem.company}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, company: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Position"
                  className="input input-bordered w-full border rounded px-2 py-1"
                  value={newItem.position}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, position: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="date"
                  className="input input-bordered w-full border rounded px-2 py-1"
                  value={newItem.startDate}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="date"
                  className="input input-bordered w-full border rounded px-2 py-1"
                  value={newItem.endDate}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </td>
            </tr>
          )}

          {/* Existing Rows */}
          {experienceList.map((item) => (
            <tr key={item.id} className="hover:bg-violet-50">
              <td className="py-3 pr-6 flex gap-1 justify-center">
                {item.isEditing ? (
                  <button
                    onClick={() => handleSave(item.id, item)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-violet-600 hover:text-violet-800"
                  >
                    <PenLine className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>

              {item.isEditing ? (
                <>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
                      className="input input-bordered w-full border rounded px-2 py-1"
                      value={item.company}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, company: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
                      className="input input-bordered w-full border rounded px-2 py-1"
                      value={item.position}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, position: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="date"
                      className="input input-bordered w-full border rounded px-2 py-1"
                      value={item.startDate}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, startDate: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="date"
                      className="input input-bordered w-full border rounded px-2 py-1"
                      value={item.endDate}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, endDate: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 pr-6">{item.company}</td>
                  <td className="py-3 pr-6">{item.position}</td>
                  <td className="py-3 pr-6">{item.startDate}</td>
                  <td className="py-3 pr-6">{item.endDate}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExperienceTable;
