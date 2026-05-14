"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Edit2, Trash2, X } from "lucide-react";

type DocumentItem = {
  _id: string;
  title: string;
  description: string;
  priorityNumber: number;
  countrySpecificNote: string;
  status: "active" | "inactive";
};

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { register, handleSubmit, reset, setValue } = useForm<DocumentItem>();

  const fetchDocuments = async () => {
    try {
      const res = await fetch("/api/documents");
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const onSubmit = async (data: DocumentItem) => {
    try {
      const url = editingId ? `/api/documents/${editingId}` : "/api/documents";
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
        fetchDocuments();
      } else {
        toast.error("Failed to save");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleEdit = (doc: DocumentItem) => {
    setEditingId(doc._id);
    setValue("title", doc.title);
    setValue("description", doc.description);
    setValue("priorityNumber", doc.priorityNumber);
    setValue("countrySpecificNote", doc.countrySpecificNote);
    setValue("status", doc.status);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const res = await fetch(`/api/documents/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Deleted successfully");
        fetchDocuments();
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
          <h1 className="text-3xl font-extrabold text-[#24342b]">Documents</h1>
          <p className="text-gray-500 mt-2">Manage the required eligibility document list</p>
        </div>
        <button
          onClick={() => {
            reset();
            setEditingId(null);
            setIsModalOpen(true);
          }}
          className="bg-[#24342b] text-white px-6 py-3 rounded-xl font-medium shadow-[0_4px_14px_0_rgba(36,52,43,0.39)] hover:shadow-[0_6px_20px_rgba(36,52,43,0.23)] hover:-translate-y-0.5 transition-all flex items-center gap-2"
        >
          <Plus size={20} /> Add New Document
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#F5B301] rounded-full animate-spin"></div>
            <p className="text-gray-500 font-medium">Loading documents...</p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-100 text-sm">
                <tr>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-bold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-green-50/30 transition-colors">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-800">{doc.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{doc.description.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-600">{doc.priorityNumber}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${doc.status === 'active' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEdit(doc)} className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(doc._id)} className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors border border-transparent hover:border-red-100">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {documents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-lg font-medium">No documents found</p>
                        <p className="text-sm">Click the "Add New Document" button to get started.</p>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#24342b] to-[#F5B301]"></div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">{editingId ? "Edit Document" : "Add New Document"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Title</label>
                <input {...register("title", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. Passport" />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Description</label>
                <textarea {...register("description", { required: true })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all resize-none" rows={3} placeholder="Valid for at least 6 months"></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5">Country Specific Note (Optional)</label>
                <input {...register("countrySpecificNote")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" placeholder="e.g. For UAE, require original degree" />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1.5">Priority Number</label>
                  <input type="number" {...register("priorityNumber")} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F5B301] focus:border-transparent outline-none transition-all" defaultValue={0} />
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
                <button type="submit" className="px-6 py-2.5 bg-[#24342b] text-white rounded-xl font-bold hover:bg-[#1a251f] shadow-[0_4px_14px_0_rgba(36,52,43,0.39)] hover:shadow-[0_6px_20px_rgba(36,52,43,0.23)] hover:-translate-y-0.5 transition-all">Save Document</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
