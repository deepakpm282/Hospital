import React, { useState } from 'react';
import Breadcrumb from '../Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import Select, { MultiValue, ActionMeta } from 'react-select';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

interface Option {
  value: string;
  label: string;
}

type FormFieldName = 'doctors' | 'services' | 'facilities';

const AddDept = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const hospital_id = searchParams.get('id');

  const [formData, setFormData] = useState({
    DName: '',
    mobile: '',
    email: '',
    doctors: [] as string[],
    services: [] as string[],
    facilities: [] as string[],
    about: '',
    additional: '',
    hospital_id: '',
  });

  // const { data: allDocs } = useQuery(        """"= = = >>> Doctor Selection Option <<< = = = """"
  //   ['fetchDoctors'],
  //   apiClient.fetchDoctors,
  // );

  // const doctorsOptions: Option[] = allDocs
  //   ? allDocs.map((doctor: { _id:string; first_name: string; last_name: string }) => ({
  //       value: doctor._id,
  //       label: doctor.first_name +" "+doctor.last_name,
  //     }))
  //   : [];

  const servicesOptions: Option[] = [
    { value: 'Emergency', label: 'Emergency Services' },
    { value: 'Maternity', label: 'Maternity Services' },
    { value: 'Surgery', label: 'Surgery' },
    { value: 'Laboratory', label: 'Laboratory Services' },
    { value: 'Radiology', label: 'Radiology Services' },
    { value: 'Physical Therapy', label: 'Physical Therapy' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'Dental', label: 'Dental Services' },
    { value: 'Mental Health', label: 'Mental Health Services' },
  ];

  const facilitiesOptions: Option[] = [
    { value: 'DiagnosticImaging', label: 'Diagnostic Imaging' },
    { value: 'Laboratory', label: 'Laboratory' },
    { value: 'SurgicalSuites', label: 'Surgical Suites' },
    { value: 'IntensiveCareUnit', label: 'Intensive Care Unit (ICU)' },
    { value: 'EmergencyDepartment', label: 'Emergency Department' },
    { value: 'Pharmacy', label: 'Pharmacy' },
    { value: 'RehabilitationServices', label: 'Rehabilitation Services' },
    { value: 'MaternityWard', label: 'Maternity Ward' },
    { value: 'CardiacCareUnit', label: 'Cardiac Care Unit (CCU)' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    selectedOptions: MultiValue<Option>,
    actionMeta: ActionMeta<Option>,
  ) => {
    const name = actionMeta.name as FormFieldName;
    const selectedValues = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: selectedValues,
    }));
  };

  const { mutate } = useMutation(apiClient.createDepartment, {
    onSuccess: () => {
      showToast({
        message: 'Department Added',
        type: 'SUCCESS',
      });
      navigate(-1);
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: 'ERROR' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('DName', formData.DName);
    newFormData.append('mobile', formData.mobile);
    newFormData.append('email', formData.email);
    newFormData.append('doctors', formData.doctors.join(','));
    newFormData.append('services', formData.services.join(','));
    newFormData.append('facilities', formData.facilities.join(','));
    newFormData.append('about', formData.about);
    newFormData.append('additional', formData.additional);
    newFormData.append('hospital_id', hospital_id as string);
    mutate(newFormData);
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Department" />
      <div className="container mx-auto mt-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex">
            <div className="flex-grow mr-4">
              <label htmlFor="DName" className="block text-sm font-medium">
                Department Name *
              </label>
              <input
                type="text"
                id="DName"
                name="DName"
                value={formData.DName}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="flex-grow mr-4">
              <label htmlFor="mobile" className="block text-sm font-medium">
                Mobile *
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="email" className="block text-sm font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Facilities *
              </label>
              <Select
                isMulti
                name="facilities"
                required
                options={facilitiesOptions}
                value={facilitiesOptions.filter((option) =>
                  formData.facilities.includes(option.value),
                )}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex-grow mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Services *
              </label>
              <Select
                isMulti
                name="services"
                required
                options={servicesOptions}
                value={servicesOptions.filter((option) =>
                  formData.services.includes(option.value),
                )}
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="about" className="block text-sm font-medium">
              About *
            </label>
            <textarea
              id="about"
              name="about"
              required
              value={formData.about}
              onChange={handleChange}
              className="mt-1 p-5 border rounded w-full"
            />
          </div>
          {/*<div className="flex gap-4">             """"= = = >>> Doctor Selection Option <<< = = = """"
            <div className="flex-grow">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Add Doctors *
              </label>
              <Select
                isMulti
                name="doctors"
                required
                options={doctorsOptions}
                value={doctorsOptions.filter((option) =>
                  formData.doctors.includes(option.value),
                )}
                onChange={handleSelectChange}
              />
            </div>
          </div>*/}
          <div>
            <label htmlFor="additional" className="block text-sm font-bold">
              Additional Informations *
            </label>
            <textarea
              id="additional"
              name="additional"
              value={formData.additional}
              onChange={handleChange}
              className="mt-1 p-5 border rounded w-full"
              required
            />
          </div>
          <div className="flex gap-4 p-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddDept;
