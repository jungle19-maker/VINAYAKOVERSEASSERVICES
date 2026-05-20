"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, X } from "lucide-react";

type Requirement = {
  _id: string;
  title: string;
  icon: string;
  countries: string[];
  shortDescription: string;
  roles: string[];
  eligibilityRequirements: string[];
  status: "active" | "inactive";
  orderNumber: number;
  details: string;
};

export default function AdminRequirements() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<Requirement>();

  const fetchRequirements = async () => {
    try {
      const res = await fetch("/api/requirements");
      const data = await res.json();
      setRequirements(data);
    } catch (error) {
      toast.error("Failed to load requirements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequirements();
  }, []);

  const onSubmit = async (data: Requirement) => {
    try {
      // Clean up strings to array
      if (typeof data.countries === "string") {
        data.countries = (data.countries as string).split(",").map((c: string) => c.trim()).filter(Boolean);
      }
      if (typeof data.roles === "string") {
        data.roles = (data.roles as string).split(",").map((c: string) => c.trim()).filter(Boolean);
      }
      if (typeof data.eligibilityRequirements === "string") {
        data.eligibilityRequirements = (data.eligibilityRequirements as string).split("\n").map((c: string) => c.trim()).filter(Boolean);
      }

      const url = editingId ? `/api/requirements/${editingId}` : "/api/requirements";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(editingId ? "Updated successfully" : "Created successfully");
        setIsModalOpen(false);
        reset();
        setEditingId(null);
        fetchRequirements();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (req: Requirement) => {
    setEditingId(req._id);
    setValue("title", req.title);
    setValue("icon", req.icon);
    setValue("countries", req.countries?.join(", ") as any);
    setValue("roles", req.roles?.join(", ") as any);
    setValue("eligibilityRequirements", req.eligibilityRequirements?.join("\n") as any);
    setValue("shortDescription", req.shortDescription);
    setValue("status", req.status);
    setValue("orderNumber", req.orderNumber);
    setValue("details", req.details);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`/api/requirements/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully");
        fetchRequirements();
      } else {
        toast.error("Failed to delete");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-[#24342b]">Requirements</h1>
          <p className="text-gray-500 mt-2">Manage your job categories and requirements</p>
        </div>
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-[#24342b] text-white px-6 py-3 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(36,52,43,0.39)] hover:shadow-[0_6px_20px_rgba(36,52,43,0.23)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add New Requirement
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#F5B301] rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading requirements...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100 text-sm">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Countries</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {requirements.map((req) => (
                  <tr key={req._id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-800">{req.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{req.shortDescription.substring(0, 50)}...</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-1">
                        {req.countries.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">{c}</span>
                        ))}
                        {req.countries.length > 2 && <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">+{req.countries.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-600">{req.orderNumber}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${req.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(req)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(req._id)} className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {requirements.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium">No requirements found</p>
                        <p className="text-sm">Click the "Add New Requirement" button to get started.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#24342b] to-[#F5B301]"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Requirement" : "Add New Requirement"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
                  <input {...register("title", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. Nursing & Healthcare" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Icon (Lucide name)</label>
                  <input {...register("icon", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. Stethoscope" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Countries (comma separated)</label>
                <input {...register("countries", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. Canada, Germany, UK" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Short Description</label>
                <textarea {...register("shortDescription", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all resize-none" rows={2}></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Common Roles (comma separated)</label>
                  <input {...register("roles")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. Staff Nurse, Caregiver" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Eligibility Requirements (one per line)</label>
                  <textarea {...register("eligibilityRequirements")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all resize-none" rows={3} placeholder="B.Sc Nursing&#10;Valid passport"></textarea>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Detailed Content (HTML/Text)</label>
                <textarea {...register("details")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all resize-none font-mono text-sm" rows={5}></textarea>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Order Number</label>
                  <input type="number" {...register("orderNumber")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" defaultValue={0} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Status</label>
                  <select {...register("status")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-[#24342b] text-white rounded-xl font-bold hover:bg-[#1a251f] shadow-[0_4px_14px_0_rgba(36,52,43,0.39)] hover:shadow-[0_6px_20px_rgba(36,52,43,0.23)] hover:-translate-y-0.5 transition-all">Save Requirement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
