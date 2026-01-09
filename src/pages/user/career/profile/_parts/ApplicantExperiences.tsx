import React, { useEffect, useState } from "react";
import { PenLine, Trash2, Save, SaveOff, Plus } from "lucide-react";
import { useHttpClient } from "@/utils/useHttpClient";
import { Experience } from "@/utils/types/Applicant";
import { BASE_URL } from "astro:env/client";

const ExperienceTable = ({token, applicantId}: {token: string, applicantId?: string | number}) => {
  const { post, put, get, delete:del } = useHttpClient(token);
  const [experienceList, setExperienceList] = useState<Experience[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Experience>({
    company: "",
    position: "",
    usedSkills: "",
    location: "",
    startDate: "",
    endDate: "",
    applicantId: Number(applicantId),
    isEditing: false
  });

  useEffect(() => {
    if(applicantId && experienceList.length === 0){
      get(`${BASE_URL}/experiences`)
      .then((res: Response) => res.json())
      .then((data: Experience[]) => {
        // console.log(data);
        
        const res = data.map((item: Experience) => ({ ...item, isEditing: false }))
        .filter((item) => item.applicantId === Number(applicantId));
        setExperienceList(res);
      });
    }
  }, [applicantId]);

  const handleEdit = (id: number) => {
    setExperienceList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSave = (id: number, updatedItem: Experience) => {
    const {isEditing, ...rest} = updatedItem;
    put(`${BASE_URL}/experiences/${id}`, rest)
    .then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setExperienceList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updatedItem, isEditing: false } : item
        )
      );
    });
  };

  const handleDelete = (id: number) => {
    del(`${BASE_URL}/experiences/${id}/delete`).then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setExperienceList((prev) => prev.filter((item) => item.id !== id));
    });
    
  };

  const handleAdd = () => setIsAdding(true);

  const handleSaveNew = () => {
    if (!newItem.company || !newItem.position) return;
    const { isEditing, ...rest } = newItem;
    post(`${BASE_URL}/experiences`, rest)
      .then((res: any) => {
        if (res.error) {
          console.log(res.error);
          return;
        }
        setExperienceList((prev) => [
          ...prev,
          { id: Date.now(), ...newItem, isEditing: false },
        ]);
        setNewItem({ company: "", position: "", startDate: "", endDate: "", usedSkills: "", location: "", applicantId: Number(applicantId) });
        setIsAdding(false);
    });
  };

  const handleCancelNew = () => {
    setNewItem({ company: "", position: "", startDate: "", endDate: "", usedSkills: "", location: "", applicantId: Number(applicantId) });
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
            <th className="py-3 pr-6">Used Skills</th>
            <th className="py-3 pr-6">Location</th>
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
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.position}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, position: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Used Skills"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.usedSkills}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, usedSkills: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.location}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, location: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="date"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.startDate}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="date"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                    onClick={() => handleSave(item.id as number, item)}
                    className="text-green-600 hover:text-green-800"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item.id as number)}
                    className="text-violet-600 hover:text-violet-800"
                  >
                    <PenLine className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item.id as number)}
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
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                      type="text"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.usedSkills}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, usedSkills: e.target.value }
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
                      value={item.location}
                      onChange={(e) =>
                        setExperienceList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, location: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="date"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
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
                  <td className="py-3 pr-6">{item.usedSkills}</td>
                  <td className="py-3 pr-6">{item.location}</td>
                  <td className="py-3 pr-6">{new Date(item.startDate).toLocaleDateString()}</td>
                  <td className="py-3 pr-6">{new Date(item.endDate).toLocaleDateString()}</td>
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
