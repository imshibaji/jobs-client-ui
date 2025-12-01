import { PenLine, Plus, Save, SaveOff, Trash2 } from "lucide-react";
import { useState } from "react";

export default function ApplicantPortfolios({token, profiles}: {token: string, profiles?: any}) {
    const [skillsList, setSkillsList] = useState([
      { id: 1, skill: "HTML", proficiency: "Proficient", experience: "3 years", isEditing: false },
    ]);
  
    const [isAdding, setIsAdding] = useState(false);
    const [newSkill, setNewSkill] = useState({
      skill: "",
      proficiency: "",
      experience: "",
    });
  
    const handleEdit = (id: number) => {
      setSkillsList((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isEditing: true } : item))
      );
    };
  
    const handleSave = (id: number, updatedItem: any) => {
      setSkillsList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updatedItem, isEditing: false } : item
        )
      );
    };
  
    const handleDelete = (id: number) => {
      setSkillsList((prev) => prev.filter((item) => item.id !== id));
    };
  
    const handleAdd = () => {
      setIsAdding(true);
    };

    const handleSaveNew = () => {
      const newItem = {
        id: Date.now(),
        skill: newSkill.skill,
        proficiency: newSkill.proficiency,
        experience: newSkill.experience,
        isEditing: false,
      };
      setSkillsList((prev) => [newItem, ...prev]);
      setIsAdding(false);
      setNewSkill({ skill: "", proficiency: "", experience: "" });
    };
  
    const handleCancelNew = () => {
      setIsAdding(false);
    };


    return <div className="w-full bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Update Your Portfolios</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          <Plus className="w-4 h-4" /> Add Portfolio
        </button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-left text-xs text-gray-500 uppercase border-b">
          <tr>
            <th className="py-3 pr-6 text-center md:w-[200px]">Actions</th>
            <th className="py-3 pr-6">Skill</th>
            <th className="py-3 pr-6">Proficiency</th>
            <th className="py-3 pr-6">Experience</th>
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
                  value={newSkill.skill}
                  onChange={(e) =>
                    setNewSkill((prev) => ({ ...prev, skill: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Proficiency"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.proficiency}
                  onChange={(e) =>
                    setNewSkill((prev) => ({
                      ...prev,
                      proficiency: e.target.value,
                    }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Experience"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newSkill.experience}
                  onChange={(e) =>
                    setNewSkill((prev) => ({
                      ...prev,
                      experience: e.target.value,
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
                      className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                      value={item.skill}
                      onChange={(e) =>
                        setSkillsList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, skill: e.target.value }
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
                    />
                  </td>
                  <td className="py-3 pr-6">
                    <input
                      type="text"
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
                    />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 pr-6">{item.skill}</td>
                  <td className="py-3 pr-6">{item.proficiency}</td>
                  <td className="py-3 pr-6">{item.experience}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>;
}