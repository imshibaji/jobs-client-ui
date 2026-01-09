import React, { useEffect, useState } from "react";
import { PenLine, Trash2, Save, Plus, SaveOff } from "lucide-react";
import { useHttpClient } from "@/utils/useHttpClient";
import { Education } from "@/utils/types/Applicant";
import { BASE_URL } from "astro:env/client";

const EducationTable = ({token, applicantId}: {token: string, applicantId?: number | string}) => {
  const {post, put, get, delete: del} = useHttpClient(token);
  const [educationList, setEducationList] = useState<Education[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Education>({
    degree: "",
    institution: "",
    fieldOfStudy: "",
    grade: "",
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString(),
    applicantId: Number(applicantId),
    isEditing: false
  });

  useEffect(() => {
    if (applicantId &&  educationList.length === 0) {
      get(`${BASE_URL}/education`)
      .then(res => res.json())
      .then((educations: Education[]) => {
        console.log(educations);
        const data = educations.map(education => {
          return {
            ...education,
            isEditing: false
          }
        }).filter(education => education.applicantId === Number(applicantId));
        setEducationList(data);
      });
    }
  }, [applicantId]);

  const handleEdit = (id: number) => {
    setEducationList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };

  const handleSave = (id: number, updatedItem: Education) => {
    const {isEditing, ...rest} = updatedItem;
    put(`${BASE_URL}/education/${id}`, rest).then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setEducationList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...updatedItem, isEditing: false } : item
        )
      );
    });
  };

  const handleDelete = (id: number) => {
    del(`${BASE_URL}/education/${id}/delete`).then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setEducationList((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleSaveNew = () => {
    const {isEditing, ...rest} = newItem;
    post(`${BASE_URL}/education`, rest)
    .then((res: any) => {
      if (res.error) {
        console.log(res.error);
        return;
      }
      setEducationList((prev) => [
        ...prev,
        { id: Date.now(), ...newItem, isEditing: false },
      ]);
      setNewItem({ degree: "", institution: "", fieldOfStudy: "", grade: "", startDate: "", endDate: "", applicantId: Number(applicantId), isEditing: false });
      setIsAdding(false);
    })
  };

  const handleCancelNew = () => {
    setIsAdding(false);
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
            <th className="py-3 pr-6 text-center md:w-[200px]">Actions</th>
            <th className="py-3 pr-6">Degree</th>
            <th className="py-3 pr-6">Institution</th>
            <th className="py-3 pr-6">Field Of Study</th>
            <th className="py-3 pr-6">Grade</th>
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
                  placeholder="Degree"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.degree}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, degree: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Institution"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.institution}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, institution: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Field Of Study"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.fieldOfStudy}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, fieldOfStudy: e.target.value }))
                  }
                />
              </td>
              <td className="py-3 pr-6">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full border border-violet-600 focus:border-violet-800 rounded px-2 py-1"
                  value={newItem.grade}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, grade: e.target.value }))
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
          {educationList.map((item) => (
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
                      value={item.fieldOfStudy}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, fieldOfStudy: e.target.value }
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
                      value={item.grade}
                      onChange={(e) =>
                        setEducationList((prev) =>
                          prev.map((x) =>
                            x.id === item.id
                              ? { ...x, grade: e.target.value }
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
                        setEducationList((prev) =>
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
                        setEducationList((prev) =>
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
                  <td className="py-3 pr-6">{item.degree}</td>
                  <td className="py-3 pr-6">{item.institution}</td>
                  <td className="py-3 pr-6">{item.fieldOfStudy}</td>
                  <td className="py-3 pr-6">{item.grade}</td>
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

export default EducationTable;
