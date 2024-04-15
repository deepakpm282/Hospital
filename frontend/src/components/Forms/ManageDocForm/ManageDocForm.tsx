import { FormProvider, useForm } from 'react-hook-form';
import DocDetilsSections from './DocDetilsSections';

export type DoctorFormData = {
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
  zip_code: string;
  photo: FileList;
};

type props = {
  onSave: (docFormData: FormData) => void;
  isLoading: boolean;
};

const DocFormData = ({ onSave, isLoading }: props) => {
  const formMethods = useForm<DoctorFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((formDataJson: DoctorFormData) => {
    const formData = new FormData();
    formData.append('first_name', formDataJson.first_name);
    formData.append('last_name', formDataJson.last_name);
    formData.append('phone_number', formDataJson.phone_number.toString());
    formData.append('email', formDataJson.email);
    formData.append('date_of_birth', formDataJson.date_of_birth);
    formData.append('gender', formDataJson.gender);
    formData.append('degrees', formDataJson.degrees);
    formData.append(
      'registration_number',
      formDataJson.registration_number.toString(),
    );
    formData.append(
      'year_of_registration',
      formDataJson.year_of_registration.toString(),
    );
    formData.append(
      'state_medical_council',
      formDataJson.state_medical_council,
    );
    formData.append('experience', formDataJson.experience.toString());
    formData.append('department', formDataJson.department);
    formData.append('address', formDataJson.address);
    formData.append('city', formDataJson.city);
    formData.append('state', formDataJson.state);
    formData.append('country', formDataJson.country);
    formData.append('zip_code', formDataJson.zip_code);
    if (formDataJson.photo && formDataJson.photo.length > 0) {
      formData.append('photo', formDataJson.photo[0]);
    }

    console.log('[DocFormData] formData >>> ', formData);
    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form className="space-y-4" onSubmit={onSubmit}>
        <DocDetilsSections />
        <span className="flex justify-end">
          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
          >
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default DocFormData;
