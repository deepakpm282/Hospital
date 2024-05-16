import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../../api-client'
import EditDocForm from "../Forms/EditDocForm/EditDocForm";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const EditDoc = () => {
  const { DocId } = useParams();

  const { data: doctor } = useQuery("fetchDocById", () => apiClient.fetchDocById(DocId || ''), {
    enabled: !!DocId,
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Doctor" />
      <EditDocForm doctor = { doctor }/>
    </DefaultLayout>
  );
}

export default EditDoc;