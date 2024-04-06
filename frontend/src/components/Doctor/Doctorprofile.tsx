import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import userSix from '../../images/user/user-06.png';

const Doctorprofile = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Doctor Profile" />

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative  mx-auto mt-5 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={userSix} alt="profile" />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              Deepak P M
            </h3>
            <p className="font-medium">MBBS/MD</p>
          </div>
        </div>

        <div className="mx-auto max-w-180"></div>

        <div className="mx-auto max-w-270 mt-12">
          <div className="mr-4">
            <div className="details-container  p-4 rounded">
              <h2 className="text-xl text-black font-semibold mb-4">Details</h2>
              <div className="mb-2">
                <strong>Address:</strong>
                <span className="pr-4">
                  101, Elanxa Apartments, 340 N Madison Avenue
                </span>
              </div>
              <div className="mb-2">
                <strong>Gender:</strong> Male
              </div>
              <div className="mb-2">
                <strong>Email:</strong> brucewillis@info.com
              </div>
              <div className="mb-2">
                <strong>Mobile:</strong> +1 23 456890
              </div>
              <div className="mb-2">
                <strong>Location:</strong> Los Angeles, CA
              </div>
              <div className="mb-2">
                <strong>Degree:</strong> Bachelor of Arts
              </div>
            </div>
          </div>

          <hr/>
         <div className="mx-auto max-w-270 mt-3">
            <div className="mr-4">
              <div className="details-container  p-2 rounded">
                <h2 className="text-xl text-black font-semibold mb-4">
                  Qualification
                </h2>
                <div className="overflow-x-auto">
                  <table className="table-auto border-collapse  border-gray-600">
                    <thead>
                      <tr className='font-bold font-'>
                        <td className="px-4 py-2 bg-gray-200  border-gray-600">Year</td>
                        <td className="px-4 py-2 bg-gray-200  -gray-600">
                          Degree
                        </td>
                        <td className="px-4 py-2 bg-gray-200  -gray-600">
                          Institute
                        </td>
                        <td className="px-4 py-2 bg-gray-200  -gray-600">
                          Result
                        </td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-4 py-2  -gray-600">2002-2005</td>
                        <td className="px-4 py-2  -gray-600">
                          M.D. of Medicine
                        </td>
                        <td className="px-4 py-2  -gray-600">
                          University of Wyoming
                        </td>
                        <td className="px-4 py-2  -gray-600">FirstClass</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2  -gray-600">2005-2014</td>
                        <td className="px-4 py-2  -gray-600">MBBS</td>
                        <td className="px-4 py-2  -gray-600">
                          Netherland Medical College
                        </td>
                        <td className="px-4 py-2  -gray-600">Distinction</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr/>
          <div className="mx-auto max-w-270 mt-3">
            <div className="mr-4">
              <div className="details-container  p-2 rounded">
                <h2 className="text-xl text-black font-semibold mb-4">
                  Experience
                </h2>
                <div className="overflow-x-auto">
      <table className="table-auto border-collapse  border-gray-600">
        <thead>
          <tr className='font-bold font-'>
            <td className="px-4 py-2 bg-gray-200 -gray-600">Year</td>
            <td className="px-4 py-2 bg-gray-200  -gray-600">Position</td>
            <td className="px-4 py-2 bg-gray-200  -gray-600">Hospital</td>
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2  -gray-600">2002-2005</td>
            <td className="px-4 py-2  -gray-600">Senior Doctor</td>
            <td className="px-4 py-2  -gray-600">Midtown Medical Clinic</td>
            <td className="px-4 py-2  -gray-600"></td>
          </tr>
          <tr>
            <td className="px-4 py-2  -gray-600">2005-2014</td>
            <td className="px-4 py-2  -gray-600">Associate Prof.</td>
            <td className="px-4 py-2  -gray-600">Netherland Medical College</td>
            <td className="px-4 py-2  -gray-600"></td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
              </div>
            </div>
          </div>
          <hr/>  

          <div className="mt-3">
            <div className="account-settings-container  p-2 rounded">
              <h2 className="text-xl font-semibold text-black mb-6">
                Specialisation
              </h2>
              Dermatology<br/><br/>
              Gynecology<br/><br/>
              Orthopedic<br/>
              
            </div>
          </div>
          
          <hr/>
          <div className="mt-3">
            <div className="account-settings-container  p-2 rounded">
              <h2 className="text-xl font-semibold text-black mb-6">
                Account Settings
              </h2>
              
              

            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Doctorprofile;