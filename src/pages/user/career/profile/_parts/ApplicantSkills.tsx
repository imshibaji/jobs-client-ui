import React, { useEffect, useState } from "react";
import { PenLine, Trash2, Save, SaveOff, Plus } from "lucide-react";
import { useHttpClient } from "@/utils/useHttpClient";
import { Skill } from "@/utils/types/Applicant";
import { BASE_URL } from "astro:env/client";

const SkillsTable = ({token, applicantId}: {token: string, applicantId?: number | string}) => {
  const {post, put, get, delete: del} = useHttpClient(token);
  const [skillsList, setSkillsList] = useState<Skill[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    proficiency: "",
    experience: "",
    applicantId: Number(applicantId),
    lastUsed: "",
    isEditing: false
  });

  useEffect(() => {
    if (applicantId &&  skillsList.length === 0) {
      get(`${BASE_URL}/skills`)
      .then(res => res.json())
      .then((skills: Skill[]) => {
        console.log(skills);
        const data = skills.map(skill => {
          return {
            ...skill,
            isEditing: false
          }
        }).filter(skill => skill.applicantId === Number(applicantId));
        setSkillsList(data);
      });
    }
  }, [applicantId]);

  const handleEdit = (id: number) => {
    setSkillsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
    );
  };

  const handleSave = (id: number, updatedItem: Skill) => {
    const {isEditing, ...rest} = updatedItem;
    
    put(`${BASE_URL}/skills/${id}`, rest)
    .then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setSkillsList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updatedItem, isEditing: false } : item
        )
      );
    });
  };

  const handleDelete = (id: number) => {
    del(`${BASE_URL}/skills/${id}/delete`).then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setSkillsList((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleAdd = () => setIsAdding(true);

  const handleSaveNew = () => {
    if (!newSkill.name) return;
    const {isEditing, ...rest} = newSkill;
    post(`${BASE_URL}/skills`, {...rest, applicantId})
    .then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setSkillsList((prev) => [
        ...prev,
        { id: Date.now(), ...newSkill, isEditing: false },
      ]);
      setNewSkill({ name: "", proficiency: "", experience: "", lastUsed: "", applicantId: Number(applicantId)});
      setIsAdding(false);
    });
  };

  const handleCancelNew = () => {
    setNewSkill({ name: "", proficiency: "", experience: "", lastUsed: "", applicantId: Number(applicantId)});
    setIsAdding(false);
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Update Your Skills</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          <Plus className="w-4 h-4" /> Add Skills
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-left text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-3 pr-6 text-center md:w-[200px]">Actions</th>
            <th className="py-3 pr-6">Skill</th>
            <th className="py-3 pr-6">Proficiency</th>
            <th className="py-3 pr-6">Experience</th>
            <th className="py-3 pr-6">Last Used</th>
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
                  placeholder="Skill"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <select
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.proficiency}
                  onChange={(e) =>
                    setNewSkill((prev) => ({
                      ...prev,
                      proficiency: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Proficiency</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Proficient">Proficient</option>
                  <option value="Expert">Expert</option>
                </select>
              </td>
              <td className="py-3 pr-6">
                <select
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.experience}
                  onChange={(e) =>
                    setNewSkill((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Experience</option>
                  <option value="0-1 years">0-1 years</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-5 years">2-5 years</option>
                  <option value="5-8 years">5-8 years</option>
                  <option value="8-10 years">8-10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </td>
              <td className="py-3 pr-6">
                <input
                  type="date"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.lastUsed}
                  onChange={(e) =>
                    setNewSkill((prev) => ({
                      ...prev,
                      lastUsed: e.target.value,
                    }))
                  }
                />
              </td>
            </tr>
          )}

          {/* Existing Rows */}
          {skillsList.map((item) => (
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
                      value={item.name}
                      onChange={(e) =>
                        setSkillsList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, name: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <select
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.proficiency}
                      onChange={(e) =>
                        setSkillsList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, proficiency: e.target.value }
                              : x
                          )
                        )
                      }
                    >
                      <option value="">Select Proficiency</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Proficient">Proficient</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </td>
                  <td className="py-3 pr-6">
                    <select
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.experience}
                      onChange={(e) =>
                        setSkillsList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, experience: e.target.value }
                              : x
                          )
                        )
                      }
                    >
                      <option value="">Select Experience</option>
                      <option value="0-1 years">0-1 years</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-5 years">2-5 years</option>
                      <option value="5-8 years">5-8 years</option>
                      <option value="8-10 years">8-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="date"
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.lastUsed}
                      onChange={(e) =>
                        setSkillsList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, lastUsed: e.target.value }
                              : x
                          )
                        )
                      }
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 pr-6">{item.name}</td>
                  <td className="py-3 pr-6">{item.proficiency}</td>
                  <td className="py-3 pr-6">{item.experience}</td>
                  <td className="py-3 pr-6">{new Date(item.lastUsed).toLocaleDateString()}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillsTable;
