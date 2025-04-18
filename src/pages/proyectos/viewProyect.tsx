import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ProyectosStatusEnum, useCitiesQuery, useClientsQuery, useCreateProyectoMutation, useCreateProyectoReferenciaMutation, useMarcaProyectosQuery, useProyectoQuery, useRemoveProyectoReferenciaMutation, useTipoProyectosQuery, useUpdateProyectoMutation, useUsersQuery } from "../../domain/graphql";
import { z } from "zod";
import { toast } from "sonner";
import { ToastyErrorGraph } from "../../lib/utils";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table";
import { Loader, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { apolloClient } from "../../main.config";
import TextArea from "antd/es/input/TextArea";
import SearchableSelect, { Option } from "@/components/ui/selectSeach";
import { formatCurrency } from "../Reports/table/marcasVenta";
import Select from "antd/es/select";
import { fireAlert } from "@/domain/store/general.store";
import { Button } from "@/components/ui/button";

interface ProjectItem {
  id: string;
  tipo: string;
  marca: string;
  referencia: string;
  valor: number;
  description?: string;
  idTipo: string;
  idMarca: string;
  idReferencia: string;
}
const proyectoSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  dueDate: z.string().min(7, "La fecha de vencimiento es requerida"),
  status: z.nativeEnum(ProyectosStatusEnum),
  clientIntegrador: z.string().min(1, "El cliente integrador es requerido"),
  clientFinal: z.string().min(1, "El cliente final es requerido"),
  cityId: z.string().min(1, "La ciudad es requerida"),
});
export default function ViewProyecto({ id }: {id: string}) {  
  // Mover todos los hooks al inicio
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [observacion, setObservacion] = useState("");
  const [clientIntegrador, setClientIntegrador] = useState('');
  const [userProyect, setUserProyect] = useState<string>();
  const [clientFinal, setClientFinal] = useState('');
  const [cityId, setCityId] = useState('');
  const [status, setStatus] = useState<ProyectosStatusEnum>();
  const [value, setValue] = useState(0);
  const [valor, setValor] = useState(0);
  const [dueDate, setDueDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedTipo, setSelectedTipo] = useState("");
  const [selectedMarca, setSelectedMarca] = useState("");
  const [selectedReferencia, setSelectedReferencia] = useState("");
  const [referenciaMaca, setReferenciaMarca] = useState<Option[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [actualizarProyecto] = useUpdateProyectoMutation()
  const [addItem] = useCreateProyectoReferenciaMutation()
  const [remove] = useRemoveProyectoReferenciaMutation()

  // Consultas - también deben estar al inicio
  const {data: dataProyect, loading: loadingProyect, error,refetch} = useProyectoQuery({
    variables: {
      proyectoId: id || '' // Asegurar que siempre tenga un valor
    },
    skip: !id // Saltar si no hay id
  });

  const {data, loading} = useClientsQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  });
  const {data: dataCity, loading: loadingCity} = useCitiesQuery({});
  const {data: dataTipoProyecto, loading: loadingTipoProyecto} = useTipoProyectosQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  })
  const {data: dataMarca, loading: loadingMarca} = useMarcaProyectosQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  })
  const {data: dataUser, loading: loadingUser} = useUsersQuery({
    variables: {
      pagination: {
        skip: 0,
        take: 99999999
      }
    }
  })
  // Inicializar estados cuando los datos llegan
  useEffect(() => {
    if (dataProyect?.proyecto) {
      setTitle(dataProyect.proyecto.name);
      setDescription(dataProyect.proyecto.description || '');
      setClientIntegrador(dataProyect.proyecto.clientIntegrador.id);
      setClientFinal(dataProyect.proyecto.clientFinal.id);
      setCityId(dataProyect.proyecto.city?.id || '');
      setStatus(dataProyect.proyecto.status);
      setValue(dataProyect.proyecto.value);
      setUserProyect(dataProyect?.proyecto?.worker?.id)
      setDueDate(dayjs(dataProyect.proyecto.dateExpiration).format("YYYY-MM-DD hh:mm:ss"));
    }
  }, [dataProyect]);
  useEffect(()=>{
    if(dataMarca?.marcaProyectos){
      const marcaSelectd = dataMarca?.marcaProyectos.find((value) => value.id == selectedMarca)
      if(marcaSelectd){
        const referenciasOption: Option[] = marcaSelectd.referencias.map((refe) => {
          return {
            label: refe.codigo,
            value: refe.id
          }
        })
        setReferenciaMarca(referenciasOption)
      }
    }
  }, [selectedMarca])
  // Validaciones y returns condicionales deben ir DESPUÉS de todos los hooks
  if (!id) {
    return <div>ID NOT SEND</div>;
  }

  if (loadingProyect || !dataProyect) {
    return <Loader />;
  }

  if (error) {
    return <div>Hubo un error</div>;
  }
  const clienteOptions: Option[] = data?.clients.map((client) => {
    return {
      value: client.id,
      label: client.name
    }
  }) || []
  const userOption: Option[] = dataUser?.users.map((user) => {
    return {
      value: user.id,
      label: user.fullName
    }
  }) || []
  const cityOptions: Option[] = dataCity?.cities.map((city) => {
    return {
      value: city.id,
      label: city.name
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const proyectosStatusOptions: Option[] = Object.values(ProyectosStatusEnum).map((value) => ({
    label: value.replace("_", " "), // Opcional: Formatear los labels
    value,
  }));
  const tipoProyectoOptions: Option[] = dataTipoProyecto?.tipoProyectos.map((tp) => {
    return {
      value: tp.id,
      label: tp.nombre
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const marcaOptions: Option[] = dataMarca?.marcaProyectos.map((tp) => {
    return {
      value: tp.id,
      label: tp.nombre
    }
  }).sort((a,b) => a.label.localeCompare(b.label)) || []
  const onCreateSubmit = async () => {
    const validationResult = proyectoSchema.safeParse({
      title,
      description,
      dueDate,
      clientIntegrador,
      clientFinal,
      cityId, 
      status
    });
    

    if (!validationResult.success) {
      toast.error(validationResult.error.errors[0].message);
      return;
    }
    try {
        const resAlert = await fireAlert({
          type: "warning",
          title: "¿Estás seguro?",
          description: "¿Deseas actualizar este proyecto?",
          showCancelButton: true,
        })
        if(resAlert) {          
          const res = await actualizarProyecto({
          variables: {
            updateInput: {
              id: dataProyect.proyecto.id,
              dateExpiration: dueDate,
              name: title,
              status: status,
              cityId: cityId,
              description: description,
              clientFinalId: clientFinal,
              clientIntegradorId: clientIntegrador,
              value: value,
              workerId: userProyect
            }
          }
          })
          if(res.errors){
            toast.error('Hubo un error: ' + res.errors[0]);
            return
          }
          toast.success('Proyecto Actualizado con exito')
        }
    } catch (err){
      ToastyErrorGraph(err as any)
    }
  }
    // Función para agregar un nuevo proyecto a la tabla
  const handleAddProject = async () => {
    if (selectedTipo && selectedMarca && selectedReferencia) {
      const tipo =  tipoProyectoOptions.find(opt => opt.value === selectedTipo);
      const marca = marcaOptions.find(opt => opt.value === selectedMarca);
      const referencia = referenciaMaca.find(opt => opt.value === selectedReferencia);
      const newProject: ProjectItem = {
        id: Date.now().toString(),
        tipo: tipo?.label || selectedTipo,
        marca: marca?.label || selectedMarca,
        referencia: referencia?.label || selectedReferencia,
        idMarca: marca?.value || '',
        idReferencia: referencia?.value || '',
        idTipo: tipo?.value || '',
        valor: valor,
        description: observacion
      };
      try {
        const resAlert = await fireAlert({
          type: "warning",
          title: "¿Estás seguro?",
          description: "¿Deseas actualizar este proyecto?",
          showCancelButton: true,
        })
        if(resAlert) {          
          const res = await addItem({
          variables: {
            createInput: {
              proyectoId: id,
              marcaId: newProject.idMarca,
              referenciaId: newProject.idReferencia,
              tipoProyectoId: newProject.idTipo,
              valor: newProject.valor,
              observacion: newProject.description
            }
          }
          })
          if(res.errors){
            toast.error('Hubo un error: ' + res.errors[0]);
            return
          }
          refetch()
          toast.success('Item agregado con exito')
        }
    } catch (err){
      ToastyErrorGraph(err as any)
    }
    setProjects([...projects, newProject]);
    }
  };
  
    // Función para eliminar un proyecto de la tabla
  const handleRemoveProject = async (id: string) => {
    const resAlert = await fireAlert({
      type: "warning",
      title: "¿Estás seguro?",
      description: "¿Deseas actualizar este proyecto?",
      showCancelButton: true,
    })
    if(!resAlert){
      return
    }
    const res = await remove({
      variables: {
        removeProyectoReferenciaId: id
      }
    })
    if(res.errors){
      toast.error(res.errors[0].message);
      return
    }
    refetch()
    toast.success('Eliminado con exito')
    setProjects(projects.filter(project => project.id !== id));
  };
  return (
    <div>
      {/* <PageBreadcrumb pageTitle="Blank Page" /> */}
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-[1000px] text-center">
          <h3 className="mb-4 font-semibold text-gray-800 text-theme-xl dark:text-white/90 sm:text-2xl">
            Información general del proyecto
          </h3>
          <div>
            <div className="mt-8">
              {/* Campo: Título de la tarea */}
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Trabajador
                </label>
                <div className="relative">
                {
                  userProyect
                  && 
                  (
                    <SearchableSelect 
                    placeholder="Selecione un trabajador"
                    options={userOption}
                    onChange={(e) => setUserProyect(e)}
                    defaultValue={userProyect}
                  />
                  )
                }
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Nombre del proyecto
                </label>
                <div className="relative">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
    
              {/* Campo: Descripción de la tarea */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Descripción del proyecto
                </label>
                <TextArea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="dark:bg-dark-900 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-base text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
    
              {/* Campo: Fecha de vencimiento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Fecha de vencimiento
                </label>
                <div className="relative">
                  <input
                    id="event-start-date"
                    type="datetime-local"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                {
                  loading || !clientIntegrador
                  ?
                  <>Cargando clientes...</>
                  : 
                  <>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Cliente integrador
                    </label>
                    <SearchableSelect 
                      placeholder="Selecione el cliente integrador"
                      options={clienteOptions}
                      onChange={(e) => setClientIntegrador(e)}
                      defaultValue={clientIntegrador}
                    />
                  </>
                }
              </div>
              <div className="mt-6">
                {
                  loading || !clientFinal
                  ?
                  <>Cargando clientes...</>
                  : 
                  <>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Cliente Final
                    </label>
                    <SearchableSelect 
                      placeholder="Selecione el cliente final"
                      options={clienteOptions}
                      onChange={(e) => setClientFinal(e)}
                      defaultValue={clientFinal}

                    />
                  </>
                }
              </div>
              <div className="mt-6">
                {
                  loadingCity || !cityId
                  ?
                  <>Cargando ciudades...</>
                  : 
                  <>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                      Selecione una ciudad
                    </label>
                    <SearchableSelect 
                      placeholder="Selecione una ciudad"
                      options={cityOptions}
                      onChange={(e) => setCityId(e)}
                      defaultValue={cityId}
                    />
                  </>
                }
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Valor del proyecto ({formatCurrency(value)})
                </label>
                <div className="relative">
                  <input
                    type="number" 
                    value={value}
                    onChange={(e) => setValue(+e.target.value)}
                    className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                 Etapa del proyecto
                </label>
                <div className="relative">
                  <SearchableSelect 
                    placeholder="Selecione una etapa del proyecto"
                    options={proyectosStatusOptions}
                    onChange={(e: any) => setStatus(e)}
                    defaultValue={status}
                    key={status}
                  />
                </div>
              </div>
              </div>
            </div>
          <div className="flex justify-start mt-6">
            <button
              onClick={handleAddProject}
              disabled={!selectedTipo || !selectedMarca || !selectedReferencia}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Agregar marca
            </button>
          </div>
          {/* Selectores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tipo proyecto
              </label>
              <SearchableSelect
                options={tipoProyectoOptions}
                placeholder="Seleccionar tipo"
                onChange={setSelectedTipo}
                defaultValue={selectedTipo}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Marca proyecto
              </label>
              <SearchableSelect
                options={marcaOptions}
                placeholder="Seleccionar marca"
                onChange={setSelectedMarca}
                defaultValue={selectedMarca}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Referencia proyecto
              </label>
              <SearchableSelect
                options={referenciaMaca}
                placeholder="Seleccionar referencia"
                onChange={setSelectedReferencia}
                defaultValue={selectedReferencia}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mt-6">
              <div className="text-left">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Valor ({formatCurrency(valor)})
                </label>
                <input
                  id="titlvalore"
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(+e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <div className="w-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Observación
                </label>
                <input
                  id="obsevacion"
                  type="text"
                  value={observacion}
                  onChange={(e) => setObservacion(e.target.value)}
                  className="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Tipo
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Marca
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Referencia
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Valor
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Observación
                  </TableCell>
                  <TableCell className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Acciones
                  </TableCell>
              </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {dataProyect.proyecto?.referencias?.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {project.tipoProyecto.nombre}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {project.marca.nombre}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {project.referencia.codigo}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {formatCurrency(project.valor)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        {project.observacion}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                        <Trash2 
                          onClick={() => handleRemoveProject(project.id)}
                          className="cursor-pointer"
                        />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {/* Botones del modal */}
            <div className="flex items-center gap-3 mt-6 modal-footer sm:justify-end">
              <Button
                onClick={onCreateSubmit}
                type="button"
              >
                {"Actualizar Proyecto"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
