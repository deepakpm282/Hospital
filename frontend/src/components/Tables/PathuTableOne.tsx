import { useState } from "react";


const PathuTableOne = () => {
  // const acceptRequest = () => {
  //   console.log("Request accepted");
  
  // };
  // const rejectRequest = () => {
  //   console.log("Request rejected");
  // };

  const [brandData, setbrandData] = useState( [
    {
      Patient_Name: 'Aleena David',
      Age: '22',
      Gender: 'F',
      Address: 'Chunangamvely, Aluva - 683 112',
      Mobile: '0484-290 5100',
      Consulting_TimeandDate: '14:20 01/06/2013',
      E_mail: '1234@gmail.com'
    }
  ]);

  const addRow = () => {
    setbrandData((prevData: any) => [
      ...prevData,
    {
      Patient_Name: 'Aleena David',
      Age: '22',
      Gender: 'F',
      Address: 'Chunangamvely, Aluva - 683 112',
      Mobile: '0484-290 5100',
      Consulting_TimeandDate: '14:20 01/06/2013',
      E_mail: '1234@gmail.com'
    }
  ]);
  };

  


  return (

    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Patient List
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
          
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Patient Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Age
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Gender
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Address
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Mobile
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              Consulting Time,Date
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium  xsm:text-base">
              E-mail
            </h5>
          </div>
        </div>

        
        
       { brandData.map((brand: any, key: any) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-7 ${
              key === brandData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-10 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.Patient_Name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.Age}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.Gender}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.Address}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.Mobile}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.Consulting_TimeandDate}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.E_mail}</p>
            </div>

             
            
          </div>

            /* <div className="hidden items-center p-2.5 sm:flex">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded" onClick={acceptRequest}>Accept</button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 ml-2 rounded" onClick={rejectRequest}>Reject</button>
            </div> */
      
            ))} 
            <button onClick={addRow}>Add Row</button>
        </div>
        
    </div>
    
  );
};


export default PathuTableOne;

