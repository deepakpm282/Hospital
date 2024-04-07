// import React, { useState } from 'react';
// import Breadcrumb from '../Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../../layout/DefaultLayout';
// import Select from 'react-select';

// const AddDept = () => {
//   const [formData, setFormData] = useState({
//     DName: '',
//     mobile: '',
//     email: '',
//     doctors: [],
//     services: [],
//     facilities: [],
//     about:'',
//     // date:'',
//     // time:'',
//     additional:''
//   });

//   const doctorsOptions = [
//     { value: 'Dr. Tony Stark', label: 'Dr. Tony Stark' },
//     { value: 'Dr. Moosa', label: 'Dr. Moosa' },
//     { value: 'Dr. Khushi Kumari Gupta', label: 'Dr. Khushi Kumari Gupta' }
//   ];

//   const servicesOptions = [
//     { value: 'Emergency', label: 'Emergency Services' },
//     { value: 'Maternity', label: 'Maternity Services' },
//     { value: 'Surgery', label: 'Surgery' },
//     { value: 'Laboratory', label: 'Laboratory Services' },
//     { value: 'Radiology', label: 'Radiology Services' },
//     { value: 'Physical Therapy', label: 'Physical Therapy' },
//     { value: 'Pharmacy', label: 'Pharmacy' },
//     { value: 'Dental', label: 'Dental Services' },
//     { value: 'Mental Health', label: 'Mental Health Services' },
//     // Add more services as needed
//   ];

//   const facilitiesOptions = [
//   { value: 'DiagnosticImaging', label: 'Diagnostic Imaging' },
//   { value: 'Laboratory', label: 'Laboratory' },
//   { value: 'SurgicalSuites', label: 'Surgical Suites' },
//   { value: 'IntensiveCareUnit', label: 'Intensive Care Unit (ICU)' },
//   { value: 'EmergencyDepartment', label: 'Emergency Department' },
//   { value: 'Pharmacy', label: 'Pharmacy' },
//   { value: 'RehabilitationServices', label: 'Rehabilitation Services' },
//   { value: 'MaternityWard', label: 'Maternity Ward' },
//   { value: 'CardiacCareUnit', label: 'Cardiac Care Unit (CCU)' },
//   // Add more facilities as needed
// ];

//   const handleChange = (selectedOptions: any, actionMeta: any) => {
//     const { name } = actionMeta;
//     const selectedValues = selectedOptions ? selectedOptions.map(option => option.value) : [];
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: selectedValues,
//     }));
//   };

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const handleCancel = () => {
//     console.log("Cancel button clicked");
//   };

//   // const handleTimeChange = (e) => {
//   //   setFormData({ ...formData, time: e.target.value });
//   // };

//   // const handleDateChange = (e) => {
//   //   setFormData({ ...formData, date: e.target.value });
//   // };

//   return (
//     <DefaultLayout>
//       <Breadcrumb pageName="Add Department" />
//       <div className="container mx-auto mt-10">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex">
//             <div className="flex-grow mr-4">
//               <label htmlFor="DName" className="block text-sm font-medium">Department Name *</label>
//               <input type="text" id="DName" name="DName" value={formData.DName} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
//             </div>
//             <div className="flex-grow mr-4">
//               <label htmlFor="mobile" className="block text-sm font-medium">Mobile *</label>
//               <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
//             </div>
//             <div className="flex-grow">
//               <label htmlFor="email" className="block text-sm font-medium">Email *</label>
//               <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border rounded w-full" required />
//             </div>
//           </div>
//           <div className='flex'>
//           <div className="flex-grow pr-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2 ">
//                 Facilities *
//               </label>
//               <Select
//                 isMulti
//                 name="facilities"
//                 options={facilitiesOptions}
//                 value={facilitiesOptions.filter(option => formData.facilities.includes(option.value))}
//                 onChange={handleChange}
//               />
//             </div>
            
//             <div className="flex-grow mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Services *
//               </label>
//               <Select
//                 isMulti
//                 name="services"
//                 options={servicesOptions}
//                 value={servicesOptions.filter(option => formData.services.includes(option.value))}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="about" className="block text-sm font-medium">About *</label>
//             <textarea id="about" name="about" value={formData.about} onChange={handleChange} className="mt-1 p-5 border rounded w-full" required />
//           </div>
//           <div className="flex gap-4">
//           <div className="flex-grow   ">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Add Doctors *
//               </label>
//               <Select
//                 isMulti
//                 name="doctors"
//                 options={doctorsOptions}
//                 value={doctorsOptions.filter(option => formData.doctors.includes(option.value))}
//                 onChange={handleChange}
//               />
//             </div>
//             {/* <div className='w-[20%'>
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                  Time *
//               </label>
//               <input
//                   type="time"
//                   name="time"
//                   value={formData.time}
//                   onChange={handleTimeChange}
//                   className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             <div className='w-[20%'>
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Date *
//               </label>
//               <input
//                 type="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleDateChange}
//                 className="block w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div> */}
//           </div>

//           <div>
//             <label htmlFor="address" className="block text-sm font-bold">Additional Informations *</label>
//             <textarea id="address" name="address" value={formData.additional} onChange={handleChange} className="mt-1 p-5 border rounded w-full" required />
//           </div>
          
//           <div className="flex gap-4 p-3">
//               <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
//               <button type="button" onClick={handleCancel} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Cancel</button>
//           </div>
          
//         </form>
//       </div>
//     </DefaultLayout>
//   );
// };

// export default AddDept;
