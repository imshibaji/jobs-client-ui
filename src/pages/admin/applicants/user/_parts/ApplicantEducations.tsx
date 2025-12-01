import React, { useState } from "react";
import { PenLine, Trash2, Save, Plus } from "lucide-react";

const EducationTable = ({token, educations}: {token: string, educations?: any}) => {
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Los Angeles",
      year: "2020",
      isEditing: false,
    },
  ]);

  const handleEdit = (id: number) => {
    setEducationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSave = (id: number, updatedItem: any) => {
    setEducationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...updatedItem, isEditing: false } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    setEducationList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now(),
      degree: "",
      institution: "",
      year: "",
      isEditing: true,
    };
    setEducationList((prev) => [newItem, ...prev]);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Update Your Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-left text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-3 pr-6 text-center w-[120px]">Actions</th>
            <th className="py-3 pr-6">Degree</th>
            <th className="py-3 pr-6">Institution</th>
            <th className="py-3 pr-6">Year</th>
          </tr>
        </thead>
        <tbody>
          {educationList.map((item) => (
            <tr key={item.id} className="hover:bg-violet-50">
              <td className="py-3 pr-6 text-center flex justify-center gap-2">
                {item.isEditing ? (
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleSave(item.id, item)}
                  >
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    className="text-violet-600 hover:text-violet-800"
                    onClick={() => handleEdit(item.id)}
                  >
                    <PenLine className="w-4 h-4" />
                  </button>
                )}
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>

              {item.isEditing ? (
                <>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.degree}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, degree: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.institution}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, institution: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.year}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, year: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 pr-6">{item.degree}</td>
                  <td className="py-3 pr-6">{item.institution}</td>
                  <td className="py-3 pr-6">{item.year}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EducationTable;
