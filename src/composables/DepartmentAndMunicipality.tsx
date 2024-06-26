import { useCitiesQuery, useDepartmentsQuery } from "@/domain/graphql";
import useShallowEffect from "@/hooks/useShallowEfect";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { SelectForm } from ".";

type departmentAndMunicipality = { currentIdDepartment: string; currentIdMunicipalities: string; disabledDepartment?: boolean; disabledMunicipality?: boolean };

interface IMunicipalitySelect {
  currentId: string;
  currentIdDepartment: string;
  disabledMunicipality?: boolean;
}



export const DepartmentAndMunicipality = ({ currentIdDepartment, currentIdMunicipalities, disabledDepartment = false, disabledMunicipality = false }: departmentAndMunicipality) => {
  const { data: departmentData, loading } = useDepartmentsQuery();
  const { setValue, getValues, formState: { errors } } = useFormContext();

  const departmentOptions = useMemo(() => {
    if (!departmentData) return [];
    const data = departmentData.departments
    return (
      data?.map(department => ({
        key: department.id,
        value: department.name,
      })) || []
    );
  }, [departmentData]);

  useShallowEffect(() => {
    if (departmentOptions.length > 0 && !getValues(currentIdDepartment)) {
      setValue(currentIdDepartment, departmentOptions[0].key || "", {
        shouldValidate: true,
      });
    } else {
        setValue(currentIdDepartment, getValues(currentIdDepartment) || "", {
            shouldValidate: true
        })
    }
  }, [departmentData]);
  
  if (loading) return <div className='loader flex-1' />;

  return (
    <div className='mb-5 flex flex-1 gap-2'>
      <SelectForm align="end" side="right" placeholder="Selecciona un departamento" className="flex-1" disabled={disabledDepartment}  label='Departamento' name={currentIdDepartment} options={departmentOptions} />
      {departmentOptions.length > 0 ? <MunicipalitySelect disabledMunicipality={disabledMunicipality} currentId={currentIdMunicipalities} currentIdDepartment={currentIdDepartment} /> : <div className='loader flex-1 rounded-sm' />}
    </div>
  );
};

export const MunicipalitySelect = ({ currentId, currentIdDepartment, disabledMunicipality = false }: IMunicipalitySelect) => {
  const { watch, setValue, trigger } = useFormContext();
  const currentDepartment = watch(currentIdDepartment);
  const { data: municipalitiesData, loading: isLoadingMunicipalities, refetch } = useCitiesQuery({
    variables: {
      departmentId: currentDepartment
    },
    // skip: !currentDepartment
  });

  const municipalityOptions = useMemo(() => {
    if (!municipalitiesData) return [];
    const data = municipalitiesData?.cities
    return (
      data?.map(municipality => ({
        key: municipality.id,
        value: municipality.name,
      })) || []
    );
  }, [municipalitiesData]);

  useShallowEffect(() => {
    if (currentDepartment) {
      trigger(currentId);
      refetch();
    } else {
      if (municipalityOptions[0]) {
        setValue(currentId, municipalityOptions[0].key || "", {
          shouldValidate: true,
        });
      }
    }
  }, [currentDepartment]);


  if (!municipalitiesData && isLoadingMunicipalities) return <div className='loader flex-1' />;

  return <SelectForm  align="end" side="right" placeholder="Selecciona un municipio" className="flex-1" disabled={disabledMunicipality} label='Municipio' name={currentId} options={municipalityOptions} />;
};