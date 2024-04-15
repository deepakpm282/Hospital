import { FormProvider, useForm } from 'react-hook-form';
import HosDetailsSection from './HosDetailsSection';
import { useLocation } from 'react-router-dom';

export type HospitalFormData = {
  hospital_name: string;
  phone_number_1: number;
  phone_number_2: number;
  email: string;
  //   password: string;
  //   confirm_password: string
  date_established: string;
  unique_identification_number: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip_code: string;
};

type props = {
  onSave: (docFormData: FormData) => void;
  isLoading: boolean;
};

const Hospital_Form_Data = ({ onSave, isLoading }: props) => {
  const formMethods = useForm<HospitalFormData>();
  const { handleSubmit } = formMethods;

  const location = useLocation();

  const onSubmit = handleSubmit((formDataJson: HospitalFormData) => {
    const searchParams = new URLSearchParams(location.search);
    const hospital_id = searchParams.get('id');

    const formData = new FormData();
    formData.append('hospital_name', formDataJson.hospital_name);
    formData.append('phone_number_1', formDataJson.phone_number_1.toString());
    formData.append('phone_number_2', formDataJson.phone_number_2.toString());
    formData.append('email', formDataJson.email);
    // formData.append('password', formDataJson.password);
    // formData.append('confirm_password', formDataJson.confirm_password);
    formData.append('date_established', formDataJson.date_established);
    formData.append(
      'unique_identification_number',
      formDataJson.unique_identification_number.toString(),
    );
    formData.append('address', formDataJson.address);
    formData.append('city', formDataJson.city);
    formData.append('state', formDataJson.state);
    formData.append('country', formDataJson.country);
    formData.append('zip_code', formDataJson.zip_code);

    formData.append('hospital_id', hospital_id as string);

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <div className="space-y-4">
        <h2 className="text-center text-2xl font-bold">
          Register Your Hospital here
        </h2>
        <form onSubmit={onSubmit}>
          <HosDetailsSection />
          <div className="flex justify-center">
            <button
              disabled={isLoading}
              type="submit"
              className="w-auto px-4 py-2 rounded-lg border border-primary bg-primary text-white transition hover:bg-opacity-90"
            >
              {isLoading ? 'Sending...' : 'Send Data For verification'}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Hospital_Form_Data;
