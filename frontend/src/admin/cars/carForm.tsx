import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload } from 'lucide-react';

interface CarFormData {
  title: string;
  category: string;
  price: string;
  features: string;
  description: string;
  transmission: string;
  fuel: string;
  mileage: string;
  image: string;
  status: 'available' | 'booked' | 'maintenance';
}

export default function CarForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CarFormData>({
    title: '',
    category: '',
    price: '',
    features: '',
    description: '',
    transmission: 'Automatic',
    fuel: 'Petrol',
    mileage: 'Unlimited',
    image: '',
    status: 'available',
  });

  useEffect(() => {
    if (id) {
      fetchCar();
    }
  }, [id]);

  const fetchCar = async () => {
    try {
      const response = await fetch(`/api/cars/${id}`);
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.error('Failed to fetch car:', error);
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
      const url = id ? `/api/cars/${id}` : '/api/cars';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/admin/cars');
      }
    } catch (error) {
      console.error('Failed to save car:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/cars')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {id ? 'Edit Car' : 'Add New Car'}
          </h1>
          <p className="text-gray-500 mt-1">
            {id ? 'Update car details' : 'Add a new vehicle to your fleet'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Model *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., Toyota RAV4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., SUV, Sedan, Bus"
            />
          </div>
        </div>

        {/* Price & Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., $85/day"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features
            </label>
            <input
              type="text"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., 5 seats • AC • GPS"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
            placeholder="Describe the car..."
          />
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transmission
            </label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fuel Type
            </label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
            >
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mileage
            </label>
            <input
              type="text"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c9a86c] focus:border-transparent"
              placeholder="e.g., Unlimited"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
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
        </div>

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
            <option value="available">Available</option>
            <option value="booked">Booked</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/cars')}
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
            {isLoading ? 'Saving...' : id ? 'Update Car' : 'Save Car'}
          </button>
        </div>
      </form>
    </div>
  );
}