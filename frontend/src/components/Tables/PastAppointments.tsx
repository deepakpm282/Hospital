

const PastAppointments = () => {
  

    const brandData = [
      {
        Pname: 'Christopher',
        Dname: 'Dr. Tony Stark',
        Department: 'Oncology',
        Date : new Date(2024, 1, 27),
        Time: new Date(0, 0, 0, 13, 15)
      },
    ];
  
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Past Appointments
        </h4>
  
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium  xsm:text-base">
                Patient Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium  xsm:text-base">
                Doctor Name
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium  xsm:text-base">
                Department
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium  xsm:text-base">
                Date
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium  xsm:text-base">
                Time
              </h5>
            </div>
          </div>
  
          
          {brandData.map((brand, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === brandData.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.Pname}
                </p>
              </div>
  
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.Dname}</p>
              </div>
  
              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">{brand.Department}</p>
              </div>
  
              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brandData[0].Date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              </div>
  
              <div className="hidden items-center justify-center p-2.5 sm:flex">
              <p className="text-black dark:text-white">{brandData[0].Time.toLocaleTimeString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default PastAppointments;
