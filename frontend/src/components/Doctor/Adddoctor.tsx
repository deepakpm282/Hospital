import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import * as apiClient from '../../api-client';
import { useMutation } from 'react-query';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import ManageDocForm from '../Forms/ManageDocForm/ManageDocForm';

const AddDoctorData = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.Add_Doc_To_Hos, {
    onSuccess: () => {
      showToast({
        message: 'Doctor Added',
        type: 'SUCCESS',
      });
      navigate(-1);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleSave = (docFormData: FormData) => {
    mutate(docFormData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Doctor" />
      <ManageDocForm onSave={handleSave} isLoading={isLoading} />
    </DefaultLayout>
  );
};

export default AddDoctorData;
