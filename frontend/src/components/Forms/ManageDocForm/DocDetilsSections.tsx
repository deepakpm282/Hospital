import { useFormContext } from 'react-hook-form';
import { DoctorFormData } from './ManageDocForm';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import * as apiClient from '../../../api-client'


interface Option {
  value: string;
  label: string;
}

const DocDetails = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<DoctorFormData>();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const associated_hos_id = searchParams.get('id');
  
  const { data: allDept } = useQuery(
    ['fetchDepartments', associated_hos_id],
    () => apiClient.fetchDepartments(associated_hos_id || ''),
    {
      enabled: !!associated_hos_id,
    },
  );


  const departmentOptions = Array.isArray(allDept) ? allDept?.map(dept => ({
    value: dept._id,
    label: dept.department_name,
  })) : [];

  const selectedDepartment = departmentOptions.find(
    option => option.value === watch('department')
  ) || null;

  const handleSelectChange = (selectedOption: Option | null) => {
    if (selectedOption) {
      setValue('department',  selectedOption.value);
    }
  };

  // const existingImageUrl = watch('photo_Url');

  // const handleDelete = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  // ) => {
  //   event.preventDefault();
  //   setValue('photo_Url', ''); // Reset the value of 'photo' field to remove the existing image
  // };

  return (
    <div className="container mx-auto mt-05">
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
              maxLength: {
                value: 10,
                message: 'first_name must be at least 6 characters..',
              },
            })}
          />
          {errors.first_name && (
            <span className="text-red-500">{errors.first_name.message}</span>
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
            })}
          />
          {errors.last_name && (
            <span className="text-red-500">{errors.last_name.message}</span>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="phone_number" className="block text-sm font-medium">
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
            <span className="text-red-500">{errors.phone_number.message}</span>
          )}
        </div>
        <div className="flex-grow mr-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email *
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            className="mt-1 p-2 border rounded w-full"
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
          <label htmlFor="date_of_birth" className="block text-sm font-medium">
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
            <span className="text-red-500">{errors.date_of_birth.message}</span>
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
            Reg Number *
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
            Medical Council *
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
          <input // The value should not be
            type="number"
            placeholder="Enter Your Experience"
            className="mt-1 p-2 border rounded w-full"
            {...register('experience', {
              required: 'Experience required',
              validate: (value: number) =>
                value >= 0 || 'Value should be greater than zero',
            })}
            min="0"
          />
          {errors.experience && (
            <span className="text-red-500">{errors.experience.message}</span>
          )}
        </div>
      </div>
      <div className="flex-grow mr-4">
          <label htmlFor="department" className="block text-sm font-medium">
            Department *
          </label>
          <Select
            id="department"
            placeholder="Select Department"
            options={departmentOptions}
            onChange={handleSelectChange}
            value = {selectedDepartment}
          />
          {errors.department && (
            <span className="text-red-500">{errors.department.message}</span>
          )}
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
          <label htmlFor="zip_code" className="block text-sm font-medium">
            Postal Code *
          </label>
          <input
            type="number"
            placeholder="Enter your zip_code"
            className="mt-1 p-2 border rounded w-full"
            {...register('zip_code', {
              required: 'zip_code is Required',
            })}
          />
          {errors.zip_code && (
            <span className="text-red-500">{errors.zip_code.message}</span>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="flex-grow mr-4">
          <div>
            <label htmlFor="photo" className="block text-sm font-medium">
              Photo
            </label>
            {/* <div className="border rounded p-4 flex flex-col gap-4">
              {existingImageUrl && (
                <div className="relative-group">
                  <img
                    src={existingImageUrl}
                    className="min-h-full object-cover"
                  />
                  <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleDelete(event)}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div> */}
            <input
              type="file"
              accept="image/*"
              placeholder="No file chosen"
              className="mt-1 p-2 border rounded w-full"
              {...register('photo', {
                required: 'photo is Required',
                validate: (value: FileList) =>
                  value !== null || 'Please select a photo',
              })}
            />
            {errors.photo && (
              <span className="text-red-500">{errors.photo.message}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DocDetails;
