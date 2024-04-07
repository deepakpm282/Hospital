import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';

const Doctorlist = () => {
  const acceptRequest = () => {
    console.log("Request accepted");
  };

  const rejectRequest = () => {
    console.log("Request rejected");
  };

  const docData = [
    {
      fname: 'Deepak',
      lname: 'P',
      specialization:'Dentist',
      contact: 9962456231,
      id: 'M1545',
    },
    {
      fname: 'Deepak',
      lname: 'P',
      specialization:'Dentist',
      contact: 9962456231,
      id: 'M1545',
    },
    {
      fname: 'Deepak',
      lname: 'P',
      specialization:'Dentist',
      contact: 9962456231,
      id: 'M1545',
    },
    {
      fname: 'Deepak',
      lname: 'P',
      specialization:'Dentist',
      contact: 9962456231,
      id: 'M1545',
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Doctor List" />

      <div className="container mx-auto mt-5">
        <div className="mb-5 flex gap-3">
          <input
            type="text"
            placeholder="Search by name"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Search
          </button>
          <Link to='/Components/Doctor/Adddoctor'>
          <button className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
            Add Doctor
          </button>
          </Link>
        </div>
      </div>
      
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">First Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Last Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Specialization</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Contact Details</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Association ID</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Actions</h5>
            </div>
          </div>

          {docData.map((doc, key) => (
            <div
              className={`grid grid-cols-6 sm:grid-cols-6 ${
                key === docData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <Link to='/components/Doctor/Doctorprofile'>
                
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-blue dark:text-white sm:block">{doc.fname}</p>
              </div>
              </Link>
              <Link to='/components/Doctor/Doctorprofile'>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{doc.lname}</p>
              </div>
              </Link>
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{doc.specialization}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{doc.contact}</p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{doc.id}</p>
              </div>

              <div className="flex items-center justify-center p-2.5">
                <Link to='/components/Doctor/EditDoctor'>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded" >Edit</button>
                </Link>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-2 rounded" onClick={rejectRequest}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Doctorlist;
