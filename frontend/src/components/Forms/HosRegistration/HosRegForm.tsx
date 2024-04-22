import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../contexts/AppContext';
import * as apiClient from '../../../api-client';
import { useMutation } from 'react-query';
import ManageHosForm from '../ManageHosForm/ManageHosForm';

const Hospital_Registration = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.Hospital_Register, {
    onSuccess: () => {
      showToast({
        message: 'Data have been send for verification',
        type: 'SUCCESS',
      });
      navigate('/');
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return <ManageHosForm onSave={handleSave} isLoading={isLoading} />;
};

export default Hospital_Registration;
