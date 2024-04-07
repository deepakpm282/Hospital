import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useState } from 'react';

interface Doctor{
    firstName: string,
    lastName: string,
    userName: string,
    mobile: string,
    email: string,
    dob: string,
    gender: string,
    education: string,
    designation: string,
    department: string,
    address: string,
    city: string,
    country: string,
    state: string,
    postalCode: string,
    biography: string,
    avatar: string,
    status: string
}
interface EditDocProps {
    onSave: (formData: Doctor) => void;
    onCancel: () => void;
  }
const EditDoctor:React.FC<EditDocProps> =({onSave,onCancel}) =>{
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: '',
    education: '',
    designation: '',
    department: '',
    address: '',
    city: '',
    country: '',
    state: '',
    postalCode: '',
    biography: '',
    avatar: '',
    status: ''
  });

  // const handleChange = (e: { target: { name: any; value: any; }; }) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Doctor" />
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="firstName" className="block text-sm font-medium">First Name *</label>
          <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow mr-4">
          <label htmlFor="lastName" className="block text-sm font-medium">Last Name *</label>
          <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow">
          <label htmlFor="userName" className="block text-sm font-medium">User Name *</label>
          <input type="text" id="userName" name="userName" value={formData.userName} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
      </div>


      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="mobile" className="block text-sm font-medium">Mobile *</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow">
          <label htmlFor="email" className="block text-sm font-medium">Email *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
      </div>
     
      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="dob" className="block text-sm font-medium">Date of Birth *</label>
          <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow">
          <label htmlFor="gender" className="block text-sm font-medium">Gender *</label>
          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div className="flex">
        <div className="flex-grow mr-4">
            <label htmlFor="education" className="block text-sm font-medium">Education *</label>
            <input type="text" id="education" name="education" value={formData.education} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow mr-4">
            <label htmlFor="designation" className="block text-sm font-medium">Designation *</label>
            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
        </div>
        <div className="flex-grow">
            <label htmlFor="department" className="block text-sm font-medium">Department *</label>
            <select id="department" name="department" value={formData.department} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required>
            <option value="">Select Department</option>
            <option value="Oncology">Oncology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Opthalamology">Opthalamology</option>
            </select>
        </div>
        </div>

        
        <div>
          <label htmlFor="address" className="block text-sm font-medium">Address *</label>
          <textarea id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 p-5 border rounded w-full" required />
        </div>
        <div className="flex">
            <div className="flex-grow mr-4">
                <label htmlFor="city" className="block text-sm font-medium">City *</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
            <div className="flex-grow mr-4">
                <label htmlFor="country" className="block text-sm font-medium">Country *</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
            <div className="flex-grow mr-4">
                <label htmlFor="state" className="block text-sm font-medium">State/Province *</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
            <div className="flex-grow">
                <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code *</label>
                <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
            </div>
        
        {/* Start Biography */}
        <div>
          <label htmlFor="biography" className="block text-sm font-medium">Biography *</label>
          <textarea id="biography" name="biography" value={formData.biography} onChange={handleChange} className="mt-1 p-5 border rounded w-full" required />
        </div>
        <div className="flex">
        <div className="flex-grow mr-4">
            {/* Avatar */}
            <div>
            <label htmlFor="avatar" className="block text-sm font-medium">Avatar</label>
            <input type="file" id="avatar" name="avatar" onChange={handleChange} className="mt-1 p-2 border rounded w-full" />
            </div>
        </div>
        <div className="flex-grow">
            {/* Status */}
            <div>
            <label className="block text-sm font-medium">Status *</label>
            <div className="flex items-center gap-3 p-3 ">
                <label htmlFor="active" className="inline-flex items-center">
                <input type="radio" id="active" name="status" value="Active" checked={formData.status === 'Active'} onChange={handleChange} className="form-radio h-4 w-4 text-green" />
                <span className="ml-2">Active</span>
                </label>
                <label htmlFor="inactive" className="inline-flex items-center">
                <input type="radio" id="inactive" name="status" value="Inactive" checked={formData.status === 'Inactive'} onChange={handleChange} className="form-radio h-4 w-4 text-green" />
                <span className="ml-2">Inactive</span>
                </label>
            </div>
            </div>
        </div>
        </div>
        <div className="flex gap-4 p-3">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
            <button type="button" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
        </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default EditDoctor;
