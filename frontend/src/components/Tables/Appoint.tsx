import { useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";


const Appoint = () => {
  const [formData,setFormData] = useState({
    Pname:'',
    Date:'',
    time:'',
    location:'',
    doctor:'',
    token:'',
    status:'Active'
  });
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleCancel = () => {
    console.log("Cancel button clicked");
  };

  const today = new Date().toISOString().split('T')[0];
  // const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Appointment"/>
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="Pname" className="block text-sm font-medium">Patient Name *</label>
              <input type="text" id="Pname" name="Pname" value={formData.Pname} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
            <div className="flex-grow">
              <label htmlFor="doctor" className="block text-sm font-medium">Name of Doctor *</label>
              <input type="text" id="doctor" name="doctor" value={formData.doctor} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
          </div>
          
          <div className="flex">
          
            <div className="flex-grow">
                <label htmlFor="location" className="block text-sm font-medium">Location *</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
          </div>
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="Date" className="block text-sm font-medium">Select Date *</label>
              <input type="date" id="Date" name="Date" value={formData.Date} onChange={handleChange} min={today} className="mt-1 p-2 border rounded w-full" required />
            </div>
            <div className="flex-grow  mr-4 ">
              <label htmlFor="time" className="block text-sm font-medium ">Select Time *</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange}  className="mt-1 p-2 border rounded w-[100%]" required />
            </div>
            
            <div className="flex-grow ">
              <label htmlFor="token" className="block text-sm font-medium ">Token Number *</label>
              <input type="text" id="token" name="token" value={formData.token} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4 p-3">
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
              <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};


export default Appoint;
