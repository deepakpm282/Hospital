import { useQuery } from 'react-query';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import * as apiClient from '../../api-client';

const Doctorlist = () => {
  const searchParams = new URLSearchParams(location.search);
  const hospital_id = searchParams.get('id');
  const { data: docData, isLoading } = useQuery(
    ['fetchDocData', hospital_id],
    () => {
      if (hospital_id) {
        return apiClient.fetchDocData(hospital_id);
      }
    },
  );
  if(isLoading) {
    return <span>Loading...</span>;
  }
  const editDoctor = () => {
    console.log('Request accepted');
  };

  const deleteDoctor = () => {
    console.log('Request rejected');
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
          />
          <button className="px-3 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Search
          </button>
          <Link to={`/Components/Doctor/Adddoctor?id=${hospital_id}`}>
            <button className="px-3 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200">
              Add Doctor
            </button>
          </Link>
        </div>
      </div>
      { docData?.length == 0 ? (
        <div className="flex justify-center items-center h-screen text-black font-sherif">
          <div className="text-center">
            <span className="text-4xl font-bold">No Doctors Found</span>
          </div>
        </div>
      ) : (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="flex flex-col">
            <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
              <div className="p-2.5 xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">
                  First Name
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">Last Name</h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">
                  Specialization
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">
                  Contact Details
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">
                  Association ID
                </h5>
              </div>
              <div className="p-2.5 text-center xl:p-5">
                <h5 className="text-sm font-medium xsm:text-base">Actions</h5>
              </div>
            </div>

            {docData?.map((doc, key) => (
              <div
                className={`grid grid-cols-6 sm:grid-cols-6 ${
                  key === docData.length - 1
                    ? ''
                    : 'border-b border-stroke dark:border-strokedark'
                }`}
                key={key}
              >
                <Link to="/components/Doctor/Doctorprofile">
                  <div className="flex items-center gap-3 p-2.5 xl:p-5">
                    <p className="hidden text-blue dark:text-white sm:block">
                      {doc.first_name}
                    </p>
                  </div>
                </Link>
                <Link to="/components/Doctor/Doctorprofile">
                  <div className="flex items-center justify-center p-2.5 xl:p-5">
                    <p className="text-black dark:text-white">
                      {doc.last_name}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-meta-3">{doc.state_medical_council}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{doc.email}</p>
                </div>

                <div className="flex items-center justify-center p-2.5 xl:p-5">
                  <p className="text-black dark:text-white">{doc.experience}</p>
                </div>

                <div className="flex items-center justify-center p-2.5">
                <Link to={`/components/Doctor/EditDoctor/${doc._id}`}>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded"
                      onClick={editDoctor}
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-2 rounded"
                    onClick={deleteDoctor}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Doctorlist;
