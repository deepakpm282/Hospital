import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../../api-client'
import EditDocForm from "../Forms/EditDocForm/EditDocForm";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const EditDoc = () => {
  const { DocId } = useParams();

  const { data: doctorData, isLoading } = useQuery(["fetchDocById", DocId], () => apiClient.fetchDocById(DocId || ''),
   {
    enabled: !!DocId,
  });

  console.log("Doctor Data => ", doctorData)
  const handleSave= () => {
    console.log(doctorData)
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Doctor" />
      <EditDocForm doctor = { doctorData } onSave={ handleSave} isLoading = {isLoading}/>
    </DefaultLayout>
  );
}

export default EditDoc;