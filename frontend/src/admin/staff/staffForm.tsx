import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, User, Mail, Briefcase, Linkedin } from 'lucide-react';

interface StaffFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  linkedin: string;
  image: string;
  status: 'active' | 'inactive';
}

export default function StaffForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    role: '',
    email: '',
    phone: '',
    bio: '',
    linkedin: '',
    image: '',
    status: 'active',
  });

  useEffect(() => {
    if (id) {
      fetchStaff();
    }
  }, [id]);

  const fetchStaff = async () => {
    try {
      const response = await fetch(`/api/staff/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch staff member:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = id ? `/api/staff/${id}` : '/api/staff';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/admin/staff');
      }
    } catch (error) {
      console.error('Failed to save staff member:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/staff')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {id ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h1>
          <p className="text-gray-500 mt-1">
            {id ? 'Update team member information' : 'Add a new person to your team'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
                placeholder="e.g., Cardinal Loic Hirwa"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role/Position *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
                placeholder="e.g., CEO, Chief Marketing Officer"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., 0782169162"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="https://linkedin.com/in/..."
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biography
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
            placeholder="Tell the story of this team member..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Image URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="https://..."
            />
            <button
              type="button"
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Recommended: Square image, at least 400x400px
          </p>
        </div>

        {/* Image Preview */}
        {formData.image && (
          <div className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Image Preview</p>
            <div className="flex justify-center">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Invalid+Image';
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/staff')}
            className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 bg-[#c9a86c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {isLoading ? 'Saving...' : id ? 'Update Staff' : 'Save Staff'}
          </button>
        </div>
      </form>
    </div>
  );
}