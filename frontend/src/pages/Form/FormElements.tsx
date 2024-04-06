import { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const docData = [
  {
    fname: 'Deepak',
    lname: 'P',
    specialization:'Dentist',
    contact: 9962456231,
    id: 'M1545',
  },
];

const DoctorList = () => {
  const [searchName, setSearchName] = useState('');
  const filteredDoctors = docData.filter(doctor =>
    doctor.fname.toLowerCase().includes(searchName.toLowerCase())
  );

  const acceptRequest = () => {
    // Function logic for accepting request
  };

  const rejectRequest = () => {
    // Function logic for rejecting request
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Doctor List" />

      <div className="container mx-auto mt-5">
        <div className="mb-5 flex gap-3">
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Search
          </button>
          <button className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
            Add Doctor
          </button>
        </div>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">First Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">Last Name</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">Specialization</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">Contact Details</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">Association Id</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium w-full">Action</p>
        </div>
      </div>

      {filteredDoctors.map((doc, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white w-full">
              {doc.fname}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white w-full">
              {doc.lname}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white w-full">
              {doc.specialization}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white w-full">
              {doc.contact}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white w-full">
              {doc.id}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded" onClick={acceptRequest}>Edit</button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-2 rounded" onClick={rejectRequest}>Delete</button>
          </div>
        </div>
      ))}
    </DefaultLayout>
  );
};

export default DoctorList;
