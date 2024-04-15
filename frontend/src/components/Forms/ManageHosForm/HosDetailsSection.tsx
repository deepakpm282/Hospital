import { useFormContext } from 'react-hook-form';
import { HospitalFormData } from './ManageHosForm';

const DocDetails = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HospitalFormData>();
  return (
    <div className="container mx-auto mt-05">
      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="hospital_name" className="block text-sm font-medium">
            Hospital Name *
          </label>
          <input
            type="text"
            autoComplete="hospital_name"
            placeholder="Enter your hospital_name"
            className="mt-1 p-2 border rounded w-full"
            {...register('hospital_name', {
              required: 'Hospital Name is required.!',
              minLength: {
                value: 6,
                message: 'Hospital must be at least 6 characters..',
              },
            })}
          />
          {errors.hospital_name && (
            <span className="text-red-500">{errors.hospital_name.message}</span>
          )}
        </div>
      </div>

      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="phone_number_1" className="block text-sm font-medium">
            phone number *
          </label>
          <input
            type="text"
            placeholder="Enter your phone_number_1"
            className="mt-1 p-2 border rounded w-full"
            {...register('phone_number_1', {
              required: 'phone_number is required.',
              pattern: {
                value: /^\d{10}$/,
                message: 'phone_number must be 10 digits.',
              },
            })}
          />
          {errors.phone_number_1 && (
            <span className="text-red-500">
              {errors.phone_number_1.message}
            </span>
          )}
        </div>
        <div className="flex-grow mr-4">
          <label htmlFor="phone_number_2" className="block text-sm font-medium">
            Alternate number *
          </label>
          <input
            type="text"
            placeholder="Enter your phone_number_2"
            className="mt-1 p-2 border rounded w-full"
            {...register('phone_number_2', {
              required: 'Alternate number is required.',
              pattern: {
                value: /^\d{10}$/,
                message: 'phone number must be 10 digits.',
              },
            })}
          />
          {errors.phone_number_2 && (
            <span className="text-red-500">
              {errors.phone_number_2.message}
            </span>
          )}
        </div>
      </div>
      {/* <div className="flex">
        <div className="flex-grow">
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
        <div className="flex-grow">
          <label htmlFor="password" className="block text-sm font-medium">
            Password *
          </label>
          <input
            type="password"
            autoComplete="password"
            placeholder="Enter your password"
            className="mt-1 p-2 border rounded w-full"
            {...register('password', {
              required: 'Password field is required..',
            })}
          />
          {errors.password && (
            <span className="text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex-grow">
          <label htmlFor="password" className="block text-sm font-medium">
            Confirm Password *
          </label>
          <input
            type="password"
            autoComplete="password"
            placeholder="Re-enter your password"
            className="mt-1 p-2 border rounded w-full"
            {...register('confirm_password', {
              required: 'Confirm password field is required..',
              validate: (val) => {
                if (!val) {
                  return 'This field is required..';
                } else if (watch('password') !== val) {
                  return 'Password does not match';
                }
              },
            })}
          />
          {errors.confirm_password && (
            <span className="text-red-500">
              {errors.confirm_password.message}
            </span>)};
        </div>
      </div> */}

      <div className="flex">
        <div className="flex-grow mr-4">
          <label htmlFor="date_of_birth" className="block text-sm font-medium">
            Date Established *
          </label>
          <input
            type="date"
            placeholder="Enter the date established"
            className="mt-1 p-2 border rounded w-full"
            {...register('date_established', {
              required: 'Date of Birth is required.',
            })}
          />
          {errors.date_established && (
            <span className="text-red-500">
              {errors.date_established.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex">
        <div className="flex-grow mr-4">
          <label
            htmlFor="unique_identification_number"
            className="block text-sm font-medium"
          >
            Unique Registration number *
          </label>
          <input
            type="number"
            placeholder="Enter Your Registration number(According to IMC)"
            className="mt-1 p-2 border rounded w-full"
            {...register('unique_identification_number', {
              required: 'Unique Registration number required',
            })}
          />
          {errors.unique_identification_number && (
            <span className="text-red-500">
              {errors.unique_identification_number.message}
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
    </div>
  );
};
export default DocDetails;
