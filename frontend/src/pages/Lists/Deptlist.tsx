import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
const Deptlist = () => {


  
  const acceptRequest = () => {
    
  };

  const rejectRequest = () => {
    console.log("Request rejected");
  };

  const DeptData = [
    {
      name: 'Oncology',
      num: 12,
      Contact: '0484-290 5100',
      hod: 'Dr. Sirius Black'
    },
    {
      name: 'Opthalamology',
      num: 5,
      Contact: '0484-290 5100',
      hod: 'Dr. Percy Jackson'
    },
    {
      name: 'Cardiology',
      num: 3,
      Contact: '0484-290 5100',
      hod: 'Dr. Wanda Maximoff'
    }
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Department List" />

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
          <Link to="/components/Hospital/AddDept">
          <button className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-200">
            Add Department
          </button>
          </Link>
          
        </div>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Department Name</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">No. of Doctors</h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Head of Department</h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Contact Details</h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium xsm:text-base">Actions</h5>
            </div>
          </div>
        {DeptData.map((Hos, key) => (
          <div
            className={`grid grid-cols-2 sm:grid-cols-5 ${
              key === DeptData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <Link to='/components/Hospital/DeptProfile'>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">{Hos.name}</p>
            </div>
            </Link>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{Hos.num}</p>
            </div>
            
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{Hos.hod}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{Hos.Contact}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex">
              <Link to="/components/Hospital/EditDept">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">Edit</button>
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

export default Deptlist;
