import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client';

export type AddDoctorFormData = {
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  date_of_birth: string;
  gender: string;
  degrees: string;
  registration_number: number;
  year_of_registration: number;
  state_medical_council: string;
  experience: number;
  department: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  photo: FileList;
  // status: string;
};

const AddDoctor: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddDoctorFormData>();

  const mutation = useMutation(apiClient.doctorRegister, {
    onSuccess: () => {
      showToast({
        message: 'Data have been sent for verification',
        type: 'SUCCESS',
      });
      navigate('/dashboard'); // Adjust the destination URL accordingly
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
      <Breadcrumb pageName="Add Doctor" />
      <div className="container mx-auto mt-10">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="first_name" className="block text-sm font-medium">
                First Name *
              </label>
              <input
                type="text"
                autoComplete="first_name"
                placeholder="Enter your first_name"
                className="mt-1 p-2 border rounded w-full"
                {...register('first_name', {
                  required: 'first_name is required.!',
                  minLength: {
                    value: 6,
                    message: 'first_name must be at least 6 characters..',
                  },
                })}
              />
              {errors.first_name && (
                <span className="text-red-500">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="flex-grow mr-4">
              <label htmlFor="last_name" className="block text-sm font-medium">
                Last Name *
              </label>
              <input
                type="text"
                autoComplete="last_name"
                placeholder="Enter your last_name"
                className="mt-1 p-2 border rounded w-full"
                {...register('last_name', {
                  required: 'last_name is required.!',
                  minLength: {
                    value: 6,
                    message: 'last_name must be at least 6 characters..',
                  },
                })}
              />
              {errors.last_name && (
                <span className="text-red-500">{errors.last_name.message}</span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow mr-4">
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium"
              >
                Mobile *
              </label>
              <input
                type="text"
                placeholder="Enter your phone_number"
                className="mt-1 p-2 border rounded w-full"
                {...register('phone_number', {
                  required: 'phone_number is required.',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'phone_number must be 10 digits.',
                  },
                })}
              />
              {errors.phone_number && (
                <span className="text-red-500">
                  {errors.phone_number.message}
                </span>
              )}
            </div>
            <div className="flex-grow">
              <label htmlFor="email" className="block text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                {...register('email', {
                  required: 'Email is required.!',
                  minLength: {
                    value: 6,
                    message: 'Email must be at least 6 characters..',
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow mr-4">
              <label
                htmlFor="date_of_birth"
                className="block text-sm font-medium"
              >
                Date of Birth *
              </label>
              <input
                type="date"
                placeholder="Enter your Date Of Birth"
                className="mt-1 p-2 border rounded w-full"
                {...register('date_of_birth', {
                  required: 'Date of Birth is required.',
                })}
              />
              {errors.date_of_birth && (
                <span className="text-red-500">
                  {errors.date_of_birth.message}
                </span>
              )}
            </div>
            <div className="flex-grow">
              <label htmlFor="gender" className="block text-sm font-medium">
                Gender *
              </label>
              <select
                id="gender"
                placeholder="Enter your gender"
                className="mt-1 p-2 border rounded w-full"
                {...register('gender', { required: 'Gender is required.' })}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="degrees" className="block text-sm font-medium">
                Degree *
              </label>
              <input
                type="text"
                placeholder='Enter your degrees(Seperated by ",")'
                className="mt-1 p-2 border rounded w-full"
                {...register('degrees', { required: 'Degree is required' })}
              />
              {errors.degrees && (
                <span className="text-red-500">{errors.degrees.message}</span>
              )}
            </div>
            <div className="flex-grow mr-4">
              <label
                htmlFor="registration_number"
                className="block text-sm font-medium"
              >
                Registration Number *
              </label>
              <input
                type="number"
                placeholder="Enter Your Registration number(According to IMC)"
                className="mt-1 p-2 border rounded w-full"
                {...register('registration_number', {
                  required: 'Registration number required',
                })}
              />
              {errors.registration_number && (
                <span className="text-red-500">
                  {errors.registration_number.message}
                </span>
              )}
            </div>

            <div className="flex-grow mr-4">
              <label
                htmlFor="year_of_registration"
                className="block text-sm font-medium"
              >
                Year of Registration *
              </label>
              <input
                type="number"
                placeholder="Enter Your Year of Registration(According to IMC)"
                className="mt-1 p-2 border rounded w-full"
                {...register('year_of_registration', {
                  required: 'year_of_registration required',
                })}
              />
              {errors.year_of_registration && (
                <span className="text-red-500">
                  {errors.year_of_registration.message}
                </span>
              )}
            </div>
            <div className="flex-grow mr-4">
              <label
                htmlFor="state_medical_council"
                className="block text-sm font-medium"
              >
                state_medical_council *
              </label>
              <input
                type="text"
                placeholder="Enter Your state_medical_council(According to IMC)"
                className="mt-1 p-2 border rounded w-full"
                {...register('state_medical_council', {
                  required: 'state_medical_council required',
                })}
              />
              {errors.state_medical_council && (
                <span className="text-red-500">
                  {errors.state_medical_council.message}
                </span>
              )}
            </div>
            <div className="flex-grow mr-4">
              <label htmlFor="experience" className="block text-sm font-medium">
                Experience *
              </label>
              <input
                type="number"
                placeholder="Enter Your Experience"
                className="mt-1 p-2 border rounded w-full"
                {...register('experience', {
                  required: 'Experience required',
                })}
              />
              {errors.experience && (
                <span className="text-red-500">
                  {errors.experience.message}
                </span>
              )}
            </div>
            <div className="flex-grow">
              <label htmlFor="department" className="block text-sm font-medium">
                Department *
              </label>
              <select
                id="department"
                placeholder="Enter Your department(Specialization)"
                className="mt-1 p-2 border rounded w-full"
                {...register('department', {
                  required: 'Specialization required',
                })}
              >
                <option value="">Select Department</option>
                <option value="Oncology">Oncology</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Opthalamology">Opthalamology</option>
              </select>
              {errors.department && (
                <span className="text-red-500">
                  {errors.department.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">
              Address *
            </label>
            <textarea
              id="address"
              placeholder="Enter your current address"
              className="mt-1 p-5 border rounded w-full"
              {...register('address', { required: 'Address is Required' })}
            />
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="city" className="block text-sm font-medium">
                City *
              </label>
              <input
                type="text"
                placeholder="Enter your city"
                className="mt-1 p-2 border rounded w-full"
                {...register('city', { required: 'City is Required' })}
              />
              {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
              )}
            </div>

            <div className="flex-grow mr-4">
              <label htmlFor="state" className="block text-sm font-medium">
                State/Province *
              </label>
              <input
                type="text"
                placeholder="Enter your state"
                className="mt-1 p-2 border rounded w-full"
                {...register('state', { required: 'State is Required' })}
              />
              {errors.state && (
                <span className="text-red-500">{errors.state.message}</span>
              )}
            </div>

            <div className="flex-grow mr-4">
              <label htmlFor="country" className="block text-sm font-medium">
                Country *
              </label>
              <input
                type="text"
                placeholder="Enter your Country"
                className="mt-1 p-2 border rounded w-full"
                {...register('country', { required: 'Country is Required' })}
              />
              {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
              )}
            </div>

            <div className="flex-grow">
              <label htmlFor="postalCode" className="block text-sm font-medium">
                Postal Code *
              </label>
              <input
                type="number"
                placeholder="Enter your postalCode"
                className="mt-1 p-2 border rounded w-full"
                {...register('postalCode', {
                  required: 'postalCode is Required',
                })}
              />
              {errors.postalCode && (
                <span className="text-red-500">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex">
            <div className="flex-grow mr-4">
              <div>
                <label htmlFor="photo" className="block text-sm font-medium">
                  Photo
                </label>
                <input
                  type="file"
                  placeholder="No file chosen"
                  className="mt-1 p-2 border rounded w-full"
                  {...register('photo', {
                    required: 'photo is Required',
                    validate: (value: FileList) =>
                      value.length > 0 || 'Please select a photo',
                  })}
                />
                {errors.photo && (
                  <span className="text-red-500">{errors.photo.message}</span>
                )}
              </div>
            </div>
            {/* <div className="flex-grow">
              <div>
                <label className="block text-sm font-medium">Status *</label>
                <div className="flex items-center gap-3 p-3 ">
                  <label htmlFor="active" className="inline-flex items-center">
                    <input
                      type="radio"
                      id="active"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-green"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label
                    htmlFor="inactive"
                    className="inline-flex items-center"
                  >
                    <input
                      type="radio"
                      id="inactive"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={handleChange}
                      className="form-radio h-4 w-4 text-green"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div> */}
          </div>
          <div className="mb-5">
            <input
              type="submit"
              value="Create account"
              className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white transition hover:bg-opacity-90"
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddDoctor;
