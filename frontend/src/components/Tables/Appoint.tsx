import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../../api-client';
import { useForm } from 'react-hook-form';
import { useAppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export type Appointment_Data = {
  hospital_name: string;
  slot_date: Date;
  time_slot: string;
  location: string;
  doctor_name: string;
  token: number;
  status: boolean;
};

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Appointment_Data>();

  const searchParams = new URLSearchParams(location.search);
  const hospital_id = searchParams.get('id');

  const { data: HosData } = useQuery(
    ['fetchHosData', hospital_id],
    () => {
      if (hospital_id) {
        return apiClient.fetchHosData(hospital_id);
      }
    },
    {
      onError: () => {},
    },
  );

  const { data: allDocs } = useQuery(
    ['fetchDoctors'],
    apiClient.fetchDoctors,
  );

  useEffect(() => {
    if (HosData) {
      setValue('hospital_name', HosData[0].hospital_name);
      setValue('location', HosData[0].address);
    }
  },[HosData, setValue]);

  const today = new Date().toISOString().split('T')[0];

  const mutation = useMutation(apiClient.Appointment_Booking, {
    onSuccess: () => {
      showToast({ message: 'Appointment saved', type: 'SUCCESS' });
      navigate(-1);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Appointment" />
      <div className="container mx-auto mt-10">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex">
            <div className="flex-grow mr-4">
              <label
                htmlFor="hospital_name"
                className="block text-sm font-medium"
              >
                Hopsital *
              </label>
              <input
                type="text"
                id="hospital_name"
                name="hospital_name"
                className="mt-1 p-2 border rounded w-full cursor-not-allowed"
                value={HosData && HosData[0] ? HosData[0].hospital_name : ''}
                readOnly
              />
            </div>
            <div className="flex-grow">
              <label
                htmlFor="doctor_name"
                className="block text-sm font-medium"
              >
                Name of the Doctor *
              </label>
              <select
                className="mt-1 p-2 border rounded w-full"
                {...register('doctor_name')}
                required
              >
              <option value="">Select Doctor</option>
              {allDocs?.map((doctor) => (
                <option key={doctor._id} value={`${doctor.first_name} ${doctor.last_name}`}>
                  {`${doctor.first_name} ${doctor.last_name}`}
                </option>
              ))}
              </select>
              {errors.doctor_name && (
                <span className="text-red-500">
                  {errors.doctor_name.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow">
              <label htmlFor="location" className="block text-sm font-medium">
                Location *
              </label>
              <input
                type="text"
                className= "mt-1 p-2 border rounded w-full cursor-not-allowed"
                value={HosData && HosData[0] ? HosData[0].address : ''}
                readOnly
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="slot_date" className="block text-sm font-medium">
                Select Date *
              </label>
              <input
                type="date"
                min={today}
                className="mt-1 p-2 border rounded w-full"
                required
              />
              {errors.slot_date && (
                <span className="text-red-500">{errors.slot_date.message}</span>
              )}
            </div>
            <div className="flex-grow  mr-4 ">
              <label htmlFor="time_slot" className="block text-sm font-medium ">
                Select time_slot *
              </label>
              <input
                type="time_slot"
                className="mt-1 p-2 border rounded w-[100%]"
                required
              />
            </div>

            <div className="flex-grow ">
              <label htmlFor="token" className="block text-sm font-medium ">
                Token Number *
              </label>
              <input
                type="number"
                id="token"
                name="token"
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-4 p-3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default Appointment;
