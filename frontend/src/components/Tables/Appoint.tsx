import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePicker, { DateObject, Value } from 'react-multi-date-picker';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import * as apiClient from '../../api-client';
import { useAppContext } from '../../contexts/AppContext';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import "react-multi-date-picker/styles/colors/teal.css"
import DatePanel from 'react-multi-date-picker/plugins/date_panel';
import { format } from 'date-fns';

export type Appointment_Data = {
  hospital_id: string;
  hospital_name: string;
  slot_date: Date[];
  time_slot: string;
  location: string;
  doctor_name: string;
  doctor_id: string;
  token: number;
};

const Appointment: React.FC = () => {

  const [fromTime, setFromTime] = useState({ hour: 1, ampm: 'AM' });
  const [toTime, setToTime] = useState({ hour: 1, ampm: 'AM' });
  const [selectedDates, setSelectedDates] = useState<DateObject[]>([]);

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

  const { data: allDocs } = useQuery(['fetchDoctors'], apiClient.fetchDoctors);

  useEffect(() => {
    if (HosData) {
      setValue('hospital_name', HosData[0].hospital_name);
      setValue('location', HosData[0].address);
    }
  }, [HosData, setValue]);

  const handleDateChange = (dates: DateObject[]) => {
    setSelectedDates(dates);
  };

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
    data.slot_date =  selectedDates.map(date => date.toDate());
    data.time_slot = `${fromTime.hour}${fromTime.ampm} - ${toTime.hour}${toTime.ampm}`;
    const selected_doc = allDocs?.find(
      (doctor) =>
        `${doctor.first_name} ${doctor.last_name}` === data.doctor_name,
    );
    if (hospital_id) data.hospital_id = hospital_id;
    if (selected_doc) data.doctor_id = selected_doc._id;
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
                Hospital *
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
                {...register('doctor_name', {
                  required: 'Doctor name is required',
                })}
              >
                <option value="">Select Doctor</option>
                {allDocs?.map((doctor) => (
                  <option
                    key={doctor._id}
                    value={`${doctor.first_name} ${doctor.last_name}`}
                  >
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
                className="mt-1 p-2 border rounded w-full cursor-not-allowed"
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
                <DatePicker
                  inputClass='custom-input'
                  required
                  multiple
                  value={selectedDates}
                  onChange={handleDateChange}
                  placeholder="Select dates"
                  plugins={[
                    <DatePanel/>
                  ]}
                />
              {errors.slot_date && (
                <span className="text-red-500">{errors.slot_date.message}</span>
              )}
            </div>

            <div className="flex-grow time-slot-selector">
              <div className="flex items-center">
                <div className="mr-4">
                  <label htmlFor="from" className="block text-sm font-medium">
                    From *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      id="from"
                      min="1"
                      max="12"
                      className="mt-1 p-2 border rounded w-15"
                      value={fromTime.hour}
                      onChange={(e) =>
                        setFromTime({
                          ...fromTime,
                          hour: parseInt(e.target.value),
                        })
                      }
                    />
                    <select
                      className="mt-1 p-2 border rounded w-10 appearance-none"
                      value={fromTime.ampm}
                      onChange={(e) =>
                        setFromTime({ ...fromTime, ampm: e.target.value })
                      }
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="to" className="block text-sm font-medium">
                    To *
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      id="to"
                      min="1"
                      max="12"
                      className="mt-1 p-2 border rounded w-15"
                      value={toTime.hour}
                      onChange={(e) =>
                        setToTime({ ...toTime, hour: parseInt(e.target.value) })
                      }
                    />
                    <select
                      className="mt-1 p-2 border rounded w-10 appearance-none"
                      value={toTime.ampm}
                      onChange={(e) =>
                        setToTime({ ...toTime, ampm: e.target.value })
                      }
                    >
                      <option value="AM">AM</option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow">
              <label htmlFor="token" className="block text-sm font-medium ">
                Number of Tokens *
              </label>
              <input
                type="number"
                id="token"
                className="mt-1 p-2 border rounded w-full"
                min="1"
                {...register('token', { required: 'Token number is required' })}
              />
              {errors.token && (
                <span className="text-red-500">{errors.token.message}</span>
              )}
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
                onClick={() => navigate(-1)}
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
