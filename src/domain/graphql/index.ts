import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ValidatePassword: any;
};

export type ActualizarConceptoDto = {
  editable?: InputMaybe<Scalars['Boolean']>;
  esSuma?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['String'];
  nombre?: InputMaybe<Scalars['String']>;
  valores?: InputMaybe<Scalars['String']>;
};

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type AddReferenciaToProyectoInput = {
  marcaId: Scalars['String'];
  observacion?: InputMaybe<Scalars['String']>;
  proyectoId?: InputMaybe<Scalars['String']>;
  referenciaId: Scalars['String'];
  tipoProyectoId: Scalars['String'];
  valor: Scalars['Float'];
};

export enum AddressStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE'
}

export type ApprovalTokenInput = {
  code: Scalars['String'];
  token: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

export type BooleanFilter = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _neq?: InputMaybe<Scalars['Boolean']>;
};

export type Cart = {
  __typename?: 'Cart';
  active: Scalars['Boolean'];
  client: StoreClient;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  items: Array<CartItem>;
  /** Total calculado dinámicamente a partir de los ítems */
  total?: Maybe<Scalars['Float']>;
  updatedAt: Scalars['DateTime'];
};

export type CartItem = {
  __typename?: 'CartItem';
  cart: Cart;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discountPercentage?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  isDiscount: Scalars['Boolean'];
  product: Product;
  quantity: Scalars['Int'];
  subtotal: Scalars['Float'];
  /** Total con descuento aplicado si corresponde */
  total?: Maybe<Scalars['Float']>;
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CellClass = {
  __typename?: 'CellClass';
  cell: WsCell;
  class: Class;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  notes?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

/** Estados posibles de un celular */
export enum CellStatusEmun {
  Activo = 'ACTIVO',
  Inactivo = 'INACTIVO',
  Suspendido = 'SUSPENDIDO'
}

/** Estados tipos de celular */
export enum CellTpeStatusEmun {
  Cliente = 'CLIENTE',
  Proveedor = 'PROVEEDOR'
}

export type City = {
  __typename?: 'City';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Class = {
  __typename?: 'Class';
  cellClasses?: Maybe<Array<CellClass>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: ClassStatus;
  subclasses?: Maybe<Array<SubClass>>;
  updatedAt: Scalars['DateTime'];
};

export enum ClassStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  celular: Scalars['String'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  descripcion?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  type?: Maybe<TypeClientEnum>;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
  vertical?: Maybe<Scalars['String']>;
};

export type ClientContact = {
  __typename?: 'ClientContact';
  celular: Scalars['String'];
  client?: Maybe<Client>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ClientContactModel = {
  __typename?: 'ClientContactModel';
  client: Client;
  contact: Array<ClientContact>;
};

export enum ClientKind {
  Company = 'COMPANY',
  Normal = 'NORMAL'
}

export enum ClientStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export enum ClientType {
  A = 'A',
  Aa = 'AA',
  Aaa = 'AAA'
}

export type ClienteResponseSingIn = {
  __typename?: 'ClienteResponseSingIn';
  access_token: Scalars['String'];
  client: StoreClient;
};

export type CodeConfirmationInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type ConceptoTable = {
  __typename?: 'ConceptoTable';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  editable?: Maybe<Scalars['Boolean']>;
  esSuma: Scalars['Boolean'];
  id: Scalars['ID'];
  nombre: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  valores: Scalars['String'];
};

export type Cotizacion = {
  __typename?: 'Cotizacion';
  ciudadCliente: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  detalle?: Maybe<Array<DetalleCotizacion>>;
  emailCliente: Scalars['String'];
  fecha: Scalars['DateTime'];
  fechaRecordatorio?: Maybe<Scalars['DateTime']>;
  fechaVersion?: Maybe<Scalars['DateTime']>;
  fechaVersionString?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nitCliente: Scalars['String'];
  nombreCliente: Scalars['String'];
  nombreVendedor: Scalars['String'];
  numeroCotizacion: Scalars['String'];
  plazo?: Maybe<Scalars['Float']>;
  proyecto?: Maybe<Proyectos>;
  recordatorioEnviado: Scalars['Boolean'];
  status?: Maybe<CotizacionStatusEnum>;
  updatedAt: Scalars['DateTime'];
  valor: Scalars['Float'];
  vendedor: Scalars['String'];
  whatsappEnviado: Scalars['Boolean'];
};

export type CotizacionResendByNumber = {
  apellido?: InputMaybe<Scalars['String']>;
  cell: Scalars['String'];
  nombre?: InputMaybe<Scalars['String']>;
  numeroCotizacion: Scalars['String'];
};

export type CotizacionSeachInput = {
  ano: Scalars['Float'];
  mes: Scalars['Float'];
};

export enum CotizacionStatusEnum {
  Aceptada = 'ACEPTADA',
  Enviada = 'ENVIADA',
  Ganada = 'GANADA',
  Perdida = 'PERDIDA',
  Revisada = 'REVISADA'
}

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CrearConceptoDto = {
  editable?: InputMaybe<Scalars['Boolean']>;
  esSuma: Scalars['Boolean'];
  nombre: Scalars['String'];
  valores: Scalars['String'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']>;
  role: Scalars['ID'];
};

export type CreateCartInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  clientId: Scalars['ID'];
  items: Array<CreateCartItemInput>;
};

export type CreateCartItemInput = {
  productId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type CreateCellInput = {
  apellido?: InputMaybe<Scalars['String']>;
  asesorId?: InputMaybe<Scalars['String']>;
  asistenteId?: InputMaybe<Scalars['String']>;
  celular: Scalars['String'];
  ciudad?: InputMaybe<Scalars['String']>;
  classIds?: InputMaybe<Array<Scalars['ID']>>;
  direccion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailsDto?: InputMaybe<Array<Scalars['String']>>;
  empresa?: InputMaybe<Scalars['String']>;
  groupIds?: InputMaybe<Array<Scalars['ID']>>;
  nit?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  region: Scalars['String'];
  status?: CellStatusEmun;
  tipoCliente?: InputMaybe<TypeClientEnum>;
  type?: InputMaybe<CellTpeStatusEmun>;
  verify?: InputMaybe<Scalars['Boolean']>;
};

export type CreateClassInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status?: InputMaybe<ClassStatus>;
};

export type CreateClientAddressInput = {
  address: Scalars['String'];
  city: Scalars['String'];
  clientId: Scalars['String'];
  complement?: InputMaybe<Scalars['String']>;
  isDefault?: Scalars['Boolean'];
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  reference?: InputMaybe<Scalars['String']>;
  state: Scalars['String'];
  zipCode: Scalars['String'];
};

export type CreateClientContactInput = {
  celular: Scalars['String'];
  clientId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  position: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular: Scalars['String'];
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
  type: TypeClientEnum;
  userId?: InputMaybe<Scalars['String']>;
  vertical?: InputMaybe<Scalars['String']>;
};

export type CreateCotizacionInput = {
  ciudadCliente: Scalars['String'];
  emailCliente: Scalars['String'];
  fecha: Scalars['DateTime'];
  nitCliente: Scalars['String'];
  nombreCliente: Scalars['String'];
  nombreVendedor: Scalars['String'];
  numeroCotizacion: Scalars['String'];
  valor: Scalars['Float'];
  vendedor: Scalars['String'];
};

export type CreateDocumentTypeInput = {
  document: Scalars['String'];
};

export type CreateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
};

export type CreateEmailInput = {
  address: Scalars['String'];
  cellId: Scalars['ID'];
};

export type CreateFichaTecnicaInput = {
  description?: InputMaybe<Scalars['String']>;
  fileId: Scalars['ID'];
  referencia: Scalars['String'];
  status: FichaTecnicaEnum;
};

export type CreateFletesInput = {
  backComision: Scalars['Float'];
  carrier: Scalars['String'];
  carrierCell: Scalars['String'];
  contactClient: Scalars['String'];
  description: Scalars['String'];
  isTienda?: InputMaybe<Scalars['Boolean']>;
  numberDocument: Scalars['String'];
  numberGuia: Scalars['String'];
  oip: Scalars['Float'];
  valueFlete: Scalars['Float'];
};

export type CreateGroupInput = {
  cellIds?: InputMaybe<Array<Scalars['ID']>>;
  descripcion?: InputMaybe<Scalars['String']>;
  nombre: Scalars['String'];
  workerId?: InputMaybe<Scalars['String']>;
};

export type CreateMarcaInput = {
  nombre: Scalars['String'];
};

export type CreateMultikeyRegisterInput = {
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterIdInput;
};

export type CreateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  profileId: Scalars['ID'];
  smsBody?: InputMaybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type CreateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  metadata: Scalars['String'];
  name: Scalars['String'];
  notificationConfigId: Scalars['ID'];
};

export type CreateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  metadata: Scalars['String'];
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig: Scalars['String'];
  type: TypeNotification;
  typeConfig: NotificationType;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type CreateOrderInput = {
  dummy?: InputMaybe<Scalars['ID']>;
};

export type CreatePageLinkInput = {
  arguments?: InputMaybe<Array<Scalars['String']>>;
  routeType?: InputMaybe<RouterType>;
  target?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

export type CreateParametersInput = {
  codigo: Scalars['String'];
  descripcion: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  type: TypeParameterEnum;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type CreatePaymentInput = {
  addressLine1: Scalars['String'];
  addressLine2?: InputMaybe<Scalars['String']>;
  amount: Scalars['Float'];
  bankCode?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  currency: Scalars['String'];
  customerDoc?: InputMaybe<Scalars['String']>;
  customerDoctype?: InputMaybe<Scalars['String']>;
  customerEmail: Scalars['String'];
  customerName: Scalars['String'];
  customerPhone?: InputMaybe<Scalars['String']>;
  customerType?: InputMaybe<Scalars['Int']>;
  orderId: Scalars['String'];
  paymentMethod: Scalars['String'];
  postalCode: Scalars['String'];
  state: Scalars['String'];
};

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CreatePresupuestoInput = {
  ano: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  mes: Scalars['Float'];
  valor: Scalars['Float'];
  workerId: Scalars['String'];
};

export type CreatePriceRuleInput = {
  clientType: ClientType;
  percentage: Scalars['Float'];
};

export type CreateProductInput = {
  active?: Scalars['Boolean'];
  basePrice: Scalars['Float'];
  description: Scalars['String'];
  fileIds?: InputMaybe<Array<Scalars['String']>>;
  mainPhoto: Scalars['String'];
  reference: Scalars['String'];
  rulePrice?: InputMaybe<Array<CreatePriceRuleInput>>;
  subclassIds?: InputMaybe<Array<Scalars['ID']>>;
  title: Scalars['String'];
};

export type CreateProfileInput = {
  city: Scalars['Int'];
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  region: Scalars['Int'];
};

export type CreateProyectCommentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']>;
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** Descripción de la tarea (opcional) */
  proyectDescription?: InputMaybe<Scalars['String']>;
  /** ID de la tarea */
  proyectId: Scalars['String'];
};

export type CreateProyectosInput = {
  /** ID del cliente final */
  cityId: Scalars['String'];
  /** ID del cliente final */
  clientFinalId: Scalars['String'];
  /** ID del cliente integrador */
  clientIntegradorId: Scalars['String'];
  /** Fecha de vencimiento del proyecto */
  dateExpiration: Scalars['DateTime'];
  description: Scalars['String'];
  /** Datos extras */
  metaData: Array<AddReferenciaToProyectoInput>;
  name: Scalars['String'];
  status: ProyectosStatusEnum;
  value: Scalars['Float'];
  /** ID del trabajador asignado a la tarea */
  workerId: Scalars['String'];
};

export type CreateReferenciaInput = {
  codigo: Scalars['String'];
  descripcion: Scalars['String'];
  marcaId: Scalars['String'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateSesionInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status?: InputMaybe<SesionEmun>;
  userId?: InputMaybe<Scalars['String']>;
};

export type CreateStockInput = {
  cantidadActual?: InputMaybe<Scalars['Float']>;
  clase?: InputMaybe<Scalars['String']>;
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  nombreClase?: InputMaybe<Scalars['String']>;
  nombreReferencia?: InputMaybe<Scalars['String']>;
  referencia?: InputMaybe<Scalars['String']>;
  stcMax?: InputMaybe<Scalars['Float']>;
  stcMin?: InputMaybe<Scalars['Float']>;
};

export type CreateStoreClientInput = {
  captchaToken: Scalars['String'];
  clientKind: ClientKind;
  clientType: ClientType;
  email: Scalars['String'];
  firstName: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName?: InputMaybe<Scalars['String']>;
  nit: Scalars['String'];
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  rutId: Scalars['String'];
};

export type CreateStoreReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  productId: Scalars['ID'];
  rating: Scalars['Float'];
};

export type CreateSubClassInput = {
  classId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  status?: InputMaybe<SubClassStatus>;
};

export type CreateTaskCommentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']>;
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']>;
  /** ID de la tarea */
  taskId: Scalars['String'];
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
};

export type CreateTaskInput = {
  /** ID del proyecto asignado a la tarea (optional) */
  cotizacionId?: InputMaybe<Scalars['String']>;
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** ID del proyecto asignado a la tarea (optional) */
  proyectoId?: InputMaybe<Scalars['String']>;
  /** Fecha de vencimiento de la tarea */
  taskDateExpiration: Scalars['DateTime'];
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']>;
  /** Nombre de la tarea */
  taskName: Scalars['String'];
  /** Prioridad de la tarea */
  taskPriority: TaskPrioridad;
  /** Estado de la tarea */
  taskStatus: TaskStatus;
  /** ID del trabajador asignado a la tarea */
  workerId: Scalars['String'];
};

export type CreateTipoProyectoInput = {
  descripcion?: InputMaybe<Scalars['String']>;
  nombre: Scalars['String'];
};

export type CreateUserInput = {
  address: Scalars['String'];
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email: Scalars['String'];
  hasRural?: InputMaybe<Scalars['Boolean']>;
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber: Scalars['String'];
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  type: UserTypes;
  typeWoker?: InputMaybe<TypeWorker>;
  valueFreelance?: InputMaybe<Scalars['Int']>;
  valueMinVisit?: InputMaybe<Scalars['Int']>;
  valueTransport?: InputMaybe<Scalars['Float']>;
};

export type CreateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description: Scalars['String'];
  status?: InputMaybe<VisitComentStatusEnum>;
  type: VisitComentTypeEnum;
  visitId: Scalars['String'];
};

export type CreateVisitInput = {
  clientId: Scalars['String'];
  dateVisit: Scalars['DateTime'];
  description: Scalars['String'];
  isProyect: Scalars['Boolean'];
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  proyectoId?: InputMaybe<Scalars['String']>;
  status: StatusVisitEnum;
  typeId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateVisitTypeInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  status: VisitTypeStatusEnum;
};

export type CreateWsBatchDto = {
  celularesIds: Array<Scalars['String']>;
  createdByUserAtId?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  fileHtmlId?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  nombre: Scalars['String'];
  type?: InputMaybe<TypeBundleEnum>;
  variables?: InputMaybe<Array<KeyValuePairInput>>;
};

export type DashboardDataModal = {
  __typename?: 'DashboardDataModal';
  idUser: Scalars['String'];
  label: Scalars['String'];
  total: Scalars['Float'];
};

export type DateFilter = {
  _between?: InputMaybe<Array<Scalars['DateTime']>>;
  _eq?: InputMaybe<Scalars['DateTime']>;
  _gt?: InputMaybe<Scalars['DateTime']>;
  _gte?: InputMaybe<Scalars['DateTime']>;
  _in?: InputMaybe<Array<Scalars['DateTime']>>;
  _lt?: InputMaybe<Scalars['DateTime']>;
  _lte?: InputMaybe<Scalars['DateTime']>;
  _neq?: InputMaybe<Scalars['DateTime']>;
  _notbetween?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type Department = {
  __typename?: 'Department';
  code: Scalars['Int'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DetalleCotizacion = {
  __typename?: 'DetalleCotizacion';
  cantidad: Scalars['Float'];
  cotizacion: Cotizacion;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion: Scalars['String'];
  id: Scalars['ID'];
  referencia: Scalars['String'];
  tiempo_entrega?: Maybe<Scalars['String']>;
  total: Scalars['Float'];
  unidadMedida: Scalars['String'];
  unitMedida?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  uuid: Scalars['Float'];
  valorCosto: Scalars['Float'];
  valorVenta: Scalars['Float'];
};

export type DocumentType = {
  __typename?: 'DocumentType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  document: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type DoubleVerificationInput = {
  code?: InputMaybe<Scalars['String']>;
  emailVerification?: InputMaybe<Scalars['Boolean']>;
  phoneVerification?: InputMaybe<Scalars['Boolean']>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstField: Scalars['String'];
  group?: Maybe<DummyGroup>;
  id: Scalars['ID'];
  items: Array<DummyItem>;
  notification?: Maybe<Notification>;
  phone: Scalars['String'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  type?: Maybe<DummyType>;
  updatedAt: Scalars['DateTime'];
};

export type DummyFamily = {
  __typename?: 'DummyFamily';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyGroup = {
  __typename?: 'DummyGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  family?: Maybe<DummyFamily>;
  id: Scalars['ID'];
  name: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type DummyItem = {
  __typename?: 'DummyItem';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  dummy: Dummy;
  firstField: Scalars['String'];
  fourthField: Scalars['Int'];
  id: Scalars['ID'];
  secondField: Scalars['DateTime'];
  thirdField: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type DummyType = {
  __typename?: 'DummyType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type EmailRecipient = {
  email: Scalars['String'];
  type: RecipientType;
};

export type FacturaPorClienteDto = {
  tem_cedula?: InputMaybe<Scalars['String']>;
  tem_fecha_desde?: InputMaybe<Scalars['String']>;
  tem_fecha_hasta?: InputMaybe<Scalars['String']>;
  tem_nomcli?: InputMaybe<Scalars['String']>;
  tem_numdoc?: InputMaybe<Scalars['String']>;
  tem_vended?: InputMaybe<Scalars['String']>;
};

export type FichaTecnica = {
  __typename?: 'FichaTecnica';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  referencia: Scalars['String'];
  status: FichaTecnicaEnum;
  updatedAt: Scalars['DateTime'];
};

export enum FichaTecnicaEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type FileInfo = {
  __typename?: 'FileInfo';
  chunkSize?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileExtension: Scalars['String'];
  fileMode: FileModes;
  fileMongoId?: Maybe<Scalars['String']>;
  fileName: Scalars['String'];
  fileUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

export type FindCartOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  total?: InputMaybe<OrderTypes>;
};

export type FindCartWhere = {
  _and?: InputMaybe<Array<FindCartWhere>>;
  _or?: InputMaybe<Array<FindCartWhere>>;
  clientId?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<StringFilter>;
};

export type FindCellOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  nombre?: InputMaybe<OrderTypes>;
};

export type FindCellWhere = {
  _and?: InputMaybe<Array<FindCellWhere>>;
  _or?: InputMaybe<Array<FindCellWhere>>;
  celular?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  direccion?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  empresa?: InputMaybe<StringFilter>;
  nit?: InputMaybe<StringFilter>;
  nombre?: InputMaybe<StringFilter>;
  region?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  verify?: InputMaybe<StringFilter>;
};

export type FindClassOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindClassWhere = {
  _and?: InputMaybe<Array<FindClassWhere>>;
  _or?: InputMaybe<Array<FindClassWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindClientContactOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientContactWhere = {
  _and?: InputMaybe<Array<FindClientContactWhere>>;
  _or?: InputMaybe<Array<FindClientContactWhere>>;
  client?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
};

export type FindClientOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientWhere = {
  _and?: InputMaybe<Array<FindClientWhere>>;
  _or?: InputMaybe<Array<FindClientWhere>>;
  city?: InputMaybe<StringFilter>;
  department?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindCotizacionOrderBy = {
  fecha?: InputMaybe<OrderTypes>;
};

export type FindCotizacionWhere = {
  _and?: InputMaybe<Array<FindCotizacionWhere>>;
  _or?: InputMaybe<Array<FindCotizacionWhere>>;
  fecha?: InputMaybe<DateFilter>;
  nitCliente?: InputMaybe<StringFilter>;
  nombreCliente?: InputMaybe<StringFilter>;
  numeroCotizacion?: InputMaybe<StringFilter>;
  proyecto?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  vendedor?: InputMaybe<StringFilter>;
};

export type FindDummyFamilyWhere = {
  _and?: InputMaybe<Array<FindDummyFamilyWhere>>;
  _or?: InputMaybe<Array<FindDummyFamilyWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyGroupWhere = {
  _and?: InputMaybe<Array<FindDummyGroupWhere>>;
  _or?: InputMaybe<Array<FindDummyGroupWhere>>;
  family?: InputMaybe<FindDummyFamilyWhere>;
  name?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindDummyOrderBy = {
  firstField?: InputMaybe<OrderTypes>;
  secondField?: InputMaybe<OrderTypes>;
  thirdField?: InputMaybe<OrderTypes>;
};

export type FindDummyTypeWhere = {
  _and?: InputMaybe<Array<FindDummyTypeWhere>>;
  _or?: InputMaybe<Array<FindDummyTypeWhere>>;
  name?: InputMaybe<StringFilter>;
};

export type FindDummyWhere = {
  _and?: InputMaybe<Array<FindDummyWhere>>;
  _or?: InputMaybe<Array<FindDummyWhere>>;
  firstField?: InputMaybe<StringFilter>;
  group?: InputMaybe<FindDummyGroupWhere>;
  secondField?: InputMaybe<DateFilter>;
  thirdField?: InputMaybe<NumberFilter>;
  type?: InputMaybe<FindDummyTypeWhere>;
};

export type FindFichaTecnicaOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindFichaTecnicaWhere = {
  _and?: InputMaybe<Array<FindFichaTecnicaWhere>>;
  _or?: InputMaybe<Array<FindFichaTecnicaWhere>>;
  description?: InputMaybe<StringFilter>;
  file?: InputMaybe<StringFilter>;
  referencia?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindFletesOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindFletesWhere = {
  _and?: InputMaybe<Array<FindFletesWhere>>;
  _or?: InputMaybe<Array<FindFletesWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindGroupOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindGroupWhere = {
  _and?: InputMaybe<Array<FindGroupWhere>>;
  _or?: InputMaybe<Array<FindGroupWhere>>;
  descripcion?: InputMaybe<StringFilter>;
  nombre?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindOrderOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  total?: InputMaybe<OrderTypes>;
};

export type FindOrderWhere = {
  _and?: InputMaybe<Array<FindOrderWhere>>;
  _or?: InputMaybe<Array<FindOrderWhere>>;
  client?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  id?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  total?: InputMaybe<NumberFilter>;
};

export type FindPresupuestoOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindPresupuestoWhere = {
  _and?: InputMaybe<Array<FindPresupuestoWhere>>;
  _or?: InputMaybe<Array<FindPresupuestoWhere>>;
  ano?: InputMaybe<NumberFilter>;
  description?: InputMaybe<StringFilter>;
  mes?: InputMaybe<NumberFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindProductFeaturedOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  discountAmount?: InputMaybe<OrderTypes>;
  discountPercentage?: InputMaybe<OrderTypes>;
  endDate?: InputMaybe<OrderTypes>;
  productId?: InputMaybe<OrderTypes>;
  startDate?: InputMaybe<OrderTypes>;
  type?: InputMaybe<OrderTypes>;
};

export type FindProductFeaturedWhere = {
  _and?: InputMaybe<Array<FindProductFeaturedWhere>>;
  _or?: InputMaybe<Array<FindProductFeaturedWhere>>;
  active?: InputMaybe<BooleanFilter>;
  discountAmount?: InputMaybe<NumberFilter>;
  discountPercentage?: InputMaybe<NumberFilter>;
  endDate?: InputMaybe<StringFilter>;
  product?: InputMaybe<StringFilter>;
  startDate?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type FindProductOrderBy = {
  basePrice?: InputMaybe<OrderTypes>;
  reference?: InputMaybe<OrderTypes>;
  title?: InputMaybe<OrderTypes>;
};

export type FindProductWhere = {
  _and?: InputMaybe<Array<FindProductWhere>>;
  _or?: InputMaybe<Array<FindProductWhere>>;
  basePrice?: InputMaybe<NumberFilter>;
  reference?: InputMaybe<StringFilter>;
  subclasses?: InputMaybe<StringFilter>;
  title?: InputMaybe<StringFilter>;
};

export type FindProyectCommentTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProyectCommentTypeWhere = {
  _and?: InputMaybe<Array<FindProyectCommentTypeWhere>>;
  _or?: InputMaybe<Array<FindProyectCommentTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  createdByUser?: InputMaybe<StringFilter>;
  description?: InputMaybe<StringFilter>;
  proyect?: InputMaybe<StringFilter>;
};

export type FindProyectoOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindProyectoWhere = {
  _and?: InputMaybe<Array<FindProyectoWhere>>;
  _or?: InputMaybe<Array<FindProyectoWhere>>;
  clientFinal?: InputMaybe<StringFilter>;
  clientIntegrador?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  dateExpiration?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindSesionOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindSesionWhere = {
  _and?: InputMaybe<Array<FindSesionWhere>>;
  _or?: InputMaybe<Array<FindSesionWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindStockTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindStockTypeWhere = {
  _and?: InputMaybe<Array<FindStockTypeWhere>>;
  _or?: InputMaybe<Array<FindStockTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
};

export type FindStoreClientOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  firstName?: InputMaybe<OrderTypes>;
  lastName?: InputMaybe<OrderTypes>;
};

export type FindStoreClientWhere = {
  _and?: InputMaybe<Array<FindStoreClientWhere>>;
  _or?: InputMaybe<Array<FindStoreClientWhere>>;
  clientKind?: InputMaybe<StringFilter>;
  clientType?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
  nit?: InputMaybe<StringFilter>;
  phone?: InputMaybe<StringFilter>;
};

export type FindStoreReviewOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindStoreReviewWhere = {
  _and?: InputMaybe<Array<FindStoreReviewWhere>>;
  _or?: InputMaybe<Array<FindStoreReviewWhere>>;
  client?: InputMaybe<StringFilter>;
  comment?: InputMaybe<StringFilter>;
  product?: InputMaybe<StringFilter>;
};

export type FindSubClassOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindSubClassWhere = {
  _and?: InputMaybe<Array<FindSubClassWhere>>;
  _or?: InputMaybe<Array<FindSubClassWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindTaskCommentTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  taskDateExpiration?: InputMaybe<OrderTypes>;
};

export type FindTaskCommentTypeWhere = {
  _and?: InputMaybe<Array<FindTaskCommentTypeWhere>>;
  _or?: InputMaybe<Array<FindTaskCommentTypeWhere>>;
  createdAt?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  taskDateExpiration?: InputMaybe<DateFilter>;
  taskStatus?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindTaskTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  taskDateExpiration?: InputMaybe<OrderTypes>;
};

export type FindTaskTypeWhere = {
  _and?: InputMaybe<Array<FindTaskTypeWhere>>;
  _or?: InputMaybe<Array<FindTaskTypeWhere>>;
  cotizacion?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateFilter>;
  description?: InputMaybe<StringFilter>;
  proyecto?: InputMaybe<StringFilter>;
  taskDateExpiration?: InputMaybe<DateFilter>;
  taskStatus?: InputMaybe<StringFilter>;
  worker?: InputMaybe<StringFilter>;
};

export type FindUsersOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  email?: InputMaybe<OrderTypes>;
  name?: InputMaybe<OrderTypes>;
};

export type FindUsersWhere = {
  _and?: InputMaybe<Array<FindUsersWhere>>;
  _or?: InputMaybe<Array<FindUsersWhere>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  type?: InputMaybe<Array<UserTypes>>;
};

export type FindVisitComentOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  date?: InputMaybe<OrderTypes>;
};

export type FindVisitComentWhere = {
  _and?: InputMaybe<Array<FindVisitComentWhere>>;
  _or?: InputMaybe<Array<FindVisitComentWhere>>;
  date?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
  visit?: InputMaybe<StringFilter>;
};

export type FindVisitOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
  dateVisit?: InputMaybe<OrderTypes>;
};

export type FindVisitTypeOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindVisitTypeWhere = {
  _and?: InputMaybe<Array<FindVisitTypeWhere>>;
  _or?: InputMaybe<Array<FindVisitTypeWhere>>;
  description?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
};

export type FindVisitWhere = {
  _and?: InputMaybe<Array<FindVisitWhere>>;
  _or?: InputMaybe<Array<FindVisitWhere>>;
  client?: InputMaybe<StringFilter>;
  dateVisit?: InputMaybe<DateFilter>;
  status?: InputMaybe<StringFilter>;
  user?: InputMaybe<StringFilter>;
};

export type FindWsBatchOrderBy = {
  createdAt?: InputMaybe<OrderTypes>;
};

export type FindWsBatchWhere = {
  _and?: InputMaybe<Array<FindWsBatchWhere>>;
  _or?: InputMaybe<Array<FindWsBatchWhere>>;
  createdByUserAt?: InputMaybe<StringFilter>;
  descripcion?: InputMaybe<StringFilter>;
  estado?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  nombre?: InputMaybe<StringFilter>;
};

export type Fletes = {
  __typename?: 'Fletes';
  backComision: Scalars['Float'];
  carrier: Scalars['String'];
  carrierCell: Scalars['String'];
  contactClient: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  isTienda: Scalars['Boolean'];
  numberDocument: Scalars['String'];
  numberGuia: Scalars['String'];
  oip: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  valueFlete: Scalars['Float'];
};

export type FletesWithDocument = {
  __typename?: 'FletesWithDocument';
  CLI_CIUDAD?: Maybe<Scalars['String']>;
  CL_DEPART?: Maybe<Scalars['String']>;
  TEM_CEDULA?: Maybe<Scalars['String']>;
  TEM_FECHA?: Maybe<Scalars['String']>;
  TEM_NOMCLI?: Maybe<Scalars['String']>;
  TEM_NUMDOC?: Maybe<Scalars['String']>;
  TEM_PORCENTAJE_UTILIDAD?: Maybe<Scalars['String']>;
  TEM_PREFIJ?: Maybe<Scalars['String']>;
  TEM_TIPMOV?: Maybe<Scalars['String']>;
  TEM_UTILIDAD?: Maybe<Scalars['String']>;
  TEM_VALCOS?: Maybe<Scalars['String']>;
  TEM_VENDED?: Maybe<Scalars['String']>;
  TEM_VENTA?: Maybe<Scalars['String']>;
  backComision?: Maybe<Scalars['Float']>;
  carrier?: Maybe<Scalars['String']>;
  carrierCell?: Maybe<Scalars['String']>;
  contactClient?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  numberDocument?: Maybe<Scalars['String']>;
  numberGuia?: Maybe<Scalars['String']>;
  oip?: Maybe<Scalars['Float']>;
  valueFlete?: Maybe<Scalars['Float']>;
};

export type FunctionalityModel = {
  __typename?: 'FunctionalityModel';
  children?: Maybe<Array<FunctionalityModel>>;
  description?: Maybe<Scalars['String']>;
  key: Scalars['String'];
  name: Scalars['String'];
  tags?: Maybe<Array<FunctionalityTag>>;
};

export enum FunctionalityTag {
  Controller = 'CONTROLLER',
  Custom = 'CUSTOM',
  Method = 'METHOD',
  Module = 'MODULE',
  Parent = 'PARENT',
  Resolver = 'RESOLVER',
  Standard = 'STANDARD'
}

export type GetSalesInput = {
  vendedor: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig?: Maybe<NotificationConfig>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type KeyValuePair = {
  __typename?: 'KeyValuePair';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type KeyValuePairInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type MarcaProyecto = {
  __typename?: 'MarcaProyecto';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  nombre: Scalars['String'];
  referencias: Array<ReferenciaProyecto>;
  updatedAt: Scalars['DateTime'];
};

export type MetadataPagination = {
  __typename?: 'MetadataPagination';
  currentPage?: Maybe<Scalars['Int']>;
  itemsPerPage?: Maybe<Scalars['Int']>;
  totalItems?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type MultikeyRegister = {
  __typename?: 'MultikeyRegister';
  date: Scalars['DateTime'];
  description: Scalars['String'];
  id: MultikeyRegisterId;
};

export type MultikeyRegisterId = {
  __typename?: 'MultikeyRegisterId';
  id: Scalars['Int'];
  year: Scalars['Int'];
};

export type MultikeyRegisterIdInput = {
  id: Scalars['Int'];
  year: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptOrDeclineVisit: Scalars['String'];
  addCellToGroup: WsGroupCell;
  addOrUpdateCartItem: Cart;
  addRelatedProduct: Product;
  addUserRole: User;
  assignSubordinate: User;
  bundleMailSend: SendLoteResult;
  changePassword: Scalars['Boolean'];
  clearCart: Scalars['Boolean'];
  codeConfirmation: User;
  crearConcepto: ConceptoTable;
  create: RoleFx;
  createAllPresupuestoToMonth: Scalars['Boolean'];
  createBundle: WsBatch;
  createCart: Cart;
  createCell: WsCell;
  createClass: Class;
  createClient: Client;
  createClientAddress: StoreClientAddress;
  createClientContact: ClientContact;
  createCotizacion: Cotizacion;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createFichaTecnica: FichaTecnica;
  createFletes: Fletes;
  createGroup: WsGroup;
  createMarcaProyecto: MarcaProyecto;
  createMultiKeyRegister: MultikeyRegister;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createOrder: Order;
  createPageLinkInput: PageLink;
  createParameter: Parameter;
  createPositionInput: Position;
  createPresupuesto: Presupuesto;
  createProduct: Product;
  createProductFeatured: ProductFeatured;
  createProfile: Profile;
  createProyectComment: ProyectComment;
  createProyecto: Proyectos;
  createProyectoReferencia: ProyectoReferencia;
  createReferenciaProyecto: ReferenciaProyecto;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createSesion: WsSesion;
  createStock: Stock;
  createStoreClient: StoreClient;
  createStoreReview: StoreReview;
  createSubClass: SubClass;
  createTask: Task;
  createTaskComment: TaskComment;
  createTipoProyecto: TipoProyecto;
  createUser: User;
  createVisit: Visit;
  createVisitComent: VisitComent;
  createVisitType: VisitType;
  /** Crea una transacción en Wompi y devuelve el link del checkout */
  createWompiPayment: ResponsePasarelaModel;
  createWsEmail: WsEmail;
  deleteFile: Scalars['Boolean'];
  eliminarConcepto: Scalars['String'];
  enableAndDisableDoubleVerification: Scalars['String'];
  i18nTest: Scalars['String'];
  importGroupWithExcell: Scalars['String'];
  recoverPassword: Scalars['String'];
  remove: NotificationGroup;
  removeBundle: WsBatch;
  removeCart: Cart;
  removeCartItem: Cart;
  removeCell: WsCell;
  removeClass: Class;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeCotizacion: Cotizacion;
  removeDocumentType: DocumentType;
  removeDummy: Dummy;
  removeFichaTecnica: FichaTecnica;
  removeFletes: Fletes;
  removeGroup: WsGroup;
  removeGroupWithCells: WsGroupCell;
  removeMarcaProyecto: MarcaProyecto;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removeOrder: Order;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removePresupuesto: Presupuesto;
  removeProduct: Product;
  removeProductFeatured: ProductFeatured;
  removeProfile: Profile;
  removeProyectComment: ProyectComment;
  removeProyecto: Proyectos;
  removeProyectoReferencia: ProyectoReferencia;
  removeReferenciaProyecto: ReferenciaProyecto;
  removeRelatedProduct: Product;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']>;
  removeSesion: WsSesion;
  removeStock: Stock;
  removeStoreClient: StoreClient;
  removeStoreReview: StoreReview;
  removeSubClass: SubClass;
  removeSubordinate: User;
  removeTask: Task;
  removeTaskComment: TaskComment;
  removeTipoProyecto: TipoProyecto;
  removeUser: User;
  removeUserRole: User;
  removeVisit: Visit;
  removeVisitComent: VisitComent;
  removeVisitType: VisitType;
  removeWsEmail: WsEmail;
  replaceAllRolesFx: Array<RoleFx>;
  resendCotizacionByNumber: Scalars['Boolean'];
  resetPassword: User;
  resetSuperAdmin: User;
  saveDetalleCotizacion: Scalars['Boolean'];
  sendCodeDoubleVerification: Scalars['String'];
  sendLoteMessages: SendLoteResult;
  sendLoteMessagesById: SendLoteResult;
  sendLoteMessagesByOption: SendLoteResult;
  signInAdmin: AuthResponse;
  signInClient?: Maybe<ClienteResponseSingIn>;
  signUpWithDocument: AuthResponse;
  signUpWithEmail: AuthResponse;
  signin: AuthResponse;
  update: NotificationGroup;
  updateBundle: WsBatch;
  updateCart: Cart;
  updateCell: WsCell;
  updateClass: Class;
  updateClient: Client;
  updateClientAddress: StoreClientAddress;
  updateClientContact: ClientContact;
  updateConcepto: ConceptoTable;
  updateCotizacion: Cotizacion;
  updateDetalleCotizacion: DetalleCotizacion;
  updateDocumentType: DocumentType;
  updateDummy: Dummy;
  updateFichaTecnica: FichaTecnica;
  updateFletes: Fletes;
  updateGroup: WsGroup;
  updateItemQuantity: Cart;
  updateMarcaProyecto: MarcaProyecto;
  updateMultiKeyRegister: MultikeyRegister;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updateOrder: Order;
  updatePageLinkInput: PageLink;
  updateParameter: Parameter;
  updatePassword: User;
  updatePositionInput: Position;
  updatePresupuesto: Presupuesto;
  updateProduct: Product;
  updateProductFeatured: ProductFeatured;
  updateProfile: Profile;
  updateProyectComment: ProyectComment;
  updateProyecto: Proyectos;
  updateProyectoReferencia: ProyectoReferencia;
  updateReferenciaProyecto: ReferenciaProyecto;
  updateRole: Role;
  updateSesion: WsSesion;
  updateStock: Stock;
  updateStoreClient: StoreClient;
  updateStoreReview: StoreReview;
  updateSubClass: SubClass;
  updateTask: Task;
  updateTaskComment: TaskComment;
  updateTipoProyecto: TipoProyecto;
  updateToStock: ResponseDto;
  updateUser: User;
  updateUserInformation: User;
  updateUserPassword: User;
  updateVisit: Visit;
  updateVisitComent: VisitComent;
  updateVisitType: VisitType;
  updateWsEmail: WsEmail;
};


export type MutationAcceptOrDeclineVisitArgs = {
  UpdateStatusInput: UpdateStatusInput;
};


export type MutationAddCellToGroupArgs = {
  cellId: Scalars['String'];
  groupId: Scalars['String'];
};


export type MutationAddOrUpdateCartItemArgs = {
  productId: Scalars['String'];
  quantity: Scalars['Float'];
};


export type MutationAddRelatedProductArgs = {
  productId: Scalars['String'];
  relatedProductId: Scalars['String'];
};


export type MutationAddUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationAssignSubordinateArgs = {
  managerId: Scalars['String'];
  subordinateId: Scalars['String'];
};


export type MutationBundleMailSendArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  lastPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCrearConceptoArgs = {
  data: CrearConceptoDto;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateBundleArgs = {
  createInput: CreateWsBatchDto;
};


export type MutationCreateCartArgs = {
  createInput: CreateCartInput;
};


export type MutationCreateCellArgs = {
  createInput: CreateCellInput;
};


export type MutationCreateClassArgs = {
  createInput: CreateClassInput;
};


export type MutationCreateClientArgs = {
  createInput: CreateClientInput;
};


export type MutationCreateClientAddressArgs = {
  input: CreateClientAddressInput;
};


export type MutationCreateClientContactArgs = {
  createInput: CreateClientContactInput;
};


export type MutationCreateCotizacionArgs = {
  createInput: CreateCotizacionInput;
};


export type MutationCreateDocumentTypeArgs = {
  createInput: CreateDocumentTypeInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateFichaTecnicaArgs = {
  createInput: CreateFichaTecnicaInput;
};


export type MutationCreateFletesArgs = {
  createInput: CreateFletesInput;
};


export type MutationCreateGroupArgs = {
  createInput: CreateGroupInput;
};


export type MutationCreateMarcaProyectoArgs = {
  createInput: CreateMarcaInput;
};


export type MutationCreateMultiKeyRegisterArgs = {
  createInput: CreateMultikeyRegisterInput;
};


export type MutationCreateNotificationArgs = {
  createInput: CreateNotificationInput;
};


export type MutationCreateNotificationConfigArgs = {
  createInput: CreateNotificationConfigInput;
};


export type MutationCreateNotificationGroupArgs = {
  createInput: CreateNotificationGroupInput;
};


export type MutationCreateOrderArgs = {
  createInput: CreateOrderInput;
};


export type MutationCreatePageLinkInputArgs = {
  createInput: CreatePageLinkInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePositionInputArgs = {
  createInput: CreatePositionInput;
};


export type MutationCreatePresupuestoArgs = {
  createInput: CreatePresupuestoInput;
};


export type MutationCreateProductArgs = {
  createInput: CreateProductInput;
};


export type MutationCreateProductFeaturedArgs = {
  createInput: ProductFeaturedBaseInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationCreateProyectCommentArgs = {
  createInput: CreateProyectCommentInput;
};


export type MutationCreateProyectoArgs = {
  createInput: CreateProyectosInput;
};


export type MutationCreateProyectoReferenciaArgs = {
  createInput: AddReferenciaToProyectoInput;
};


export type MutationCreateReferenciaProyectoArgs = {
  createInput: CreateReferenciaInput;
};


export type MutationCreateRoleArgs = {
  createInput: CreateRoleInput;
};


export type MutationCreateRoleFxArgs = {
  createRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateSesionArgs = {
  createInput: CreateSesionInput;
};


export type MutationCreateStockArgs = {
  createInput: CreateStockInput;
};


export type MutationCreateStoreClientArgs = {
  createInput: CreateStoreClientInput;
};


export type MutationCreateStoreReviewArgs = {
  createInput: CreateStoreReviewInput;
};


export type MutationCreateSubClassArgs = {
  createInput: CreateSubClassInput;
};


export type MutationCreateTaskArgs = {
  createInput: CreateTaskInput;
};


export type MutationCreateTaskCommentArgs = {
  createInput: CreateTaskCommentInput;
};


export type MutationCreateTipoProyectoArgs = {
  createInput: CreateTipoProyectoInput;
};


export type MutationCreateUserArgs = {
  createInput: CreateUserInput;
};


export type MutationCreateVisitArgs = {
  createInput: CreateVisitInput;
};


export type MutationCreateVisitComentArgs = {
  createInput: CreateVisitComentInput;
};


export type MutationCreateVisitTypeArgs = {
  createInput: CreateVisitTypeInput;
};


export type MutationCreateWompiPaymentArgs = {
  input: CreatePaymentInput;
};


export type MutationCreateWsEmailArgs = {
  createInput: CreateEmailInput;
};


export type MutationDeleteFileArgs = {
  id: Scalars['ID'];
};


export type MutationEliminarConceptoArgs = {
  eliminarConceptoDto: Scalars['String'];
};


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationImportGroupWithExcellArgs = {
  fileId: Scalars['String'];
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveBundleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCartArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCartItemArgs = {
  productId: Scalars['String'];
};


export type MutationRemoveCellArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClassArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveCotizacionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFichaTecnicaArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveFletesArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGroupWithCellsArgs = {
  cellId: Scalars['String'];
  groupId: Scalars['String'];
};


export type MutationRemoveMarcaProyectoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveNotificationConfigArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveOrderArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePresupuestoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProductArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProductFeaturedArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProyectCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProyectoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProyectoReferenciaArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveReferenciaProyectoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRelatedProductArgs = {
  productId: Scalars['String'];
  relatedProductId: Scalars['String'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationRemoveSesionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveStockArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveStoreClientArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveStoreReviewArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveSubClassArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveSubordinateArgs = {
  managerId: Scalars['String'];
  subordinateId: Scalars['String'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTaskCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveTipoProyectoArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationRemoveVisitArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveVisitComentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveVisitTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveWsEmailArgs = {
  id: Scalars['ID'];
};


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationResendCotizacionByNumberArgs = {
  input: CotizacionResendByNumber;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
};


export type MutationSaveDetalleCotizacionArgs = {
  id: Scalars['String'];
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSendLoteMessagesArgs = {
  id: Scalars['String'];
};


export type MutationSendLoteMessagesByIdArgs = {
  bundleId: Scalars['String'];
  cellId: Scalars['String'];
};


export type MutationSendLoteMessagesByOptionArgs = {
  id: Scalars['String'];
  option: ResendOption;
};


export type MutationSignInAdminArgs = {
  signInAdminInput: SigninAdminInput;
};


export type MutationSignInClientArgs = {
  captcha_token: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignUpWithDocumentArgs = {
  signupInput: SignupInput;
};


export type MutationSignUpWithEmailArgs = {
  signupInput: SignupEmailInput;
};


export type MutationSigninArgs = {
  signinInput: SigninInput;
};


export type MutationUpdateArgs = {
  updateInput: UpdateNotificationGroupInput;
};


export type MutationUpdateBundleArgs = {
  updateInput: UpdateBundleInput;
};


export type MutationUpdateCartArgs = {
  updateInput: UpdateCartInput;
};


export type MutationUpdateCellArgs = {
  updateInput: UpdateCellInput;
};


export type MutationUpdateClassArgs = {
  updateInput: UpdateClassInput;
};


export type MutationUpdateClientArgs = {
  updateInput: UpdateClientInput;
};


export type MutationUpdateClientAddressArgs = {
  input: UpdateClientAddressInput;
};


export type MutationUpdateClientContactArgs = {
  updateInput: UpdateClientContactInput;
};


export type MutationUpdateConceptoArgs = {
  actualizarConceptoDto: ActualizarConceptoDto;
};


export type MutationUpdateCotizacionArgs = {
  updateInput: UpdateCotizacionInput;
};


export type MutationUpdateDetalleCotizacionArgs = {
  updateInput: UpdateCotizacionDetalleInput;
};


export type MutationUpdateDocumentTypeArgs = {
  updateInput: UpdateDocumentTypeInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateFichaTecnicaArgs = {
  updateInput: UpdateFichaTecnicaInput;
};


export type MutationUpdateFletesArgs = {
  updateInput: UpdateFletesInput;
};


export type MutationUpdateGroupArgs = {
  updateInput: UpdateGroupInput;
};


export type MutationUpdateItemQuantityArgs = {
  productId: Scalars['String'];
  quantity: Scalars['Float'];
};


export type MutationUpdateMarcaProyectoArgs = {
  updateInput: UpdateMarcaInput;
};


export type MutationUpdateMultiKeyRegisterArgs = {
  updateInput: UpdateMultikeyRegisterInput;
};


export type MutationUpdateNotificationArgs = {
  updateInput: UpdateNotificationInput;
};


export type MutationUpdateNotificationConfigArgs = {
  updateInput: UpdateNotificationConfigInput;
};


export type MutationUpdateOrderArgs = {
  updateInput: UpdateOrderInput;
};


export type MutationUpdatePageLinkInputArgs = {
  updateInput: CreatePageLinkInput;
};


export type MutationUpdateParameterArgs = {
  updateInput: UpdateParametersInput;
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationUpdatePositionInputArgs = {
  updateInput: UpdatePositionInput;
};


export type MutationUpdatePresupuestoArgs = {
  updateInput: UpdatePresupuestoInput;
};


export type MutationUpdateProductArgs = {
  updateInput: UpdateProductInput;
};


export type MutationUpdateProductFeaturedArgs = {
  updateInput: UpdateProductFeaturedInput;
};


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationUpdateProyectCommentArgs = {
  updateInput: UpdateProyectCoomentInput;
};


export type MutationUpdateProyectoArgs = {
  updateInput: UpdatePryectosInput;
};


export type MutationUpdateProyectoReferenciaArgs = {
  updateInput: UpdateProyectoReferenciaInput;
};


export type MutationUpdateReferenciaProyectoArgs = {
  updateInput: UpdateReferenciaInput;
};


export type MutationUpdateRoleArgs = {
  updateInput: UpdateRoleInput;
};


export type MutationUpdateSesionArgs = {
  updateInput: UpdateSessionInput;
};


export type MutationUpdateStockArgs = {
  updateInput: UpdateStockInput;
};


export type MutationUpdateStoreClientArgs = {
  updateInput: UpdateStoreClientInput;
};


export type MutationUpdateStoreReviewArgs = {
  updateInput: UpdateStoreReviewInput;
};


export type MutationUpdateSubClassArgs = {
  updateInput: UpdateSubClassInput;
};


export type MutationUpdateTaskArgs = {
  updateInput: UpdateTaskInput;
};


export type MutationUpdateTaskCommentArgs = {
  updateInput: UpdateTaskCoomentInput;
};


export type MutationUpdateTipoProyectoArgs = {
  updateInput: UpdateTipoProyectoInput;
};


export type MutationUpdateUserArgs = {
  updateInput: UpdateUserInput;
};


export type MutationUpdateUserInformationArgs = {
  updateUserInformationInput: UpdateUserInformationInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserPasswordInput: UpdateUserPasswordInput;
};


export type MutationUpdateVisitArgs = {
  updateInput: UpdateVisitInput;
};


export type MutationUpdateVisitComentArgs = {
  updateInput: UpdateVisitComentInput;
};


export type MutationUpdateVisitTypeArgs = {
  updateInput: UpdateVisitTypeInput;
};


export type MutationUpdateWsEmailArgs = {
  updateInput: UpdateEmailInput;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  externalId?: Maybe<Scalars['ID']>;
  externalMessage?: Maybe<Scalars['String']>;
  hasPersistent: Scalars['Boolean'];
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  notificationConfig: NotificationConfig;
  notificationGroup?: Maybe<NotificationGroup>;
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  stateNotification: StateNotification;
  statePersistent?: Maybe<StatePersistent>;
  type: TypeNotification;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type NotificationConfig = {
  __typename?: 'NotificationConfig';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  emailDuplicateCode?: Maybe<Scalars['ID']>;
  emailPrincipalCode?: Maybe<Scalars['ID']>;
  hasEmail: Scalars['Boolean'];
  hasPersistent: Scalars['Boolean'];
  hasPush: Scalars['Boolean'];
  hasSms: Scalars['Boolean'];
  hasTwoStepsEmail: Scalars['Boolean'];
  hasTwoStepsPush: Scalars['Boolean'];
  hasTwoStepsSms: Scalars['Boolean'];
  hasTwoStepsWss: Scalars['Boolean'];
  hasWss: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  persistentExpiration?: Maybe<Scalars['DateTime']>;
  persistentHtml?: Maybe<Scalars['String']>;
  profile: Profile;
  smsBody?: Maybe<Scalars['String']>;
  subtype: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  wssCode?: Maybe<Scalars['ID']>;
};

export type NotificationGroup = {
  __typename?: 'NotificationGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: Group;
  id: Scalars['ID'];
  name: Scalars['String'];
  notificationConfig: NotificationConfig;
  stateNotificationGroup: StateNotificationGroup;
  typeNotificationGroup: TypeNotificationGroup;
  updatedAt: Scalars['DateTime'];
};

export enum NotificationType {
  Token = 'Token'
}

export type NumberFilter = {
  _between?: InputMaybe<Array<Scalars['Float']>>;
  _eq?: InputMaybe<Scalars['Float']>;
  _gt?: InputMaybe<Scalars['Float']>;
  _gte?: InputMaybe<Scalars['Float']>;
  _in?: InputMaybe<Array<Scalars['Float']>>;
  _lt?: InputMaybe<Scalars['Float']>;
  _lte?: InputMaybe<Scalars['Float']>;
  _neq?: InputMaybe<Scalars['Float']>;
  _notbetween?: InputMaybe<Array<Scalars['Float']>>;
};

export type Order = {
  __typename?: 'Order';
  client: StoreClient;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  items: Array<OrderItem>;
  iva: Scalars['Float'];
  payment?: Maybe<Payment>;
  retencion: Scalars['Float'];
  status: OrderStatus;
  subtotal: Scalars['Float'];
  total: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  discountPercentage?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  isDiscount: Scalars['Boolean'];
  order: Order;
  product: Product;
  quantity: Scalars['Int'];
  subtotal: Scalars['Float'];
  unitPrice: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  Paid = 'PAID',
  PendingPayment = 'PENDING_PAYMENT',
  Shipped = 'SHIPPED'
}

export enum OrderTypes {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type PageLink = {
  __typename?: 'PageLink';
  arguments?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  routeType?: Maybe<RouterType>;
  target?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};

export type Pagination = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type Parameter = {
  __typename?: 'Parameter';
  codigo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  type: TypeParameterEnum;
  updatedAt: Scalars['DateTime'];
  valueDate?: Maybe<Scalars['DateTime']>;
  valueFile?: Maybe<FileInfo>;
  valueInt?: Maybe<Scalars['Float']>;
  valueString?: Maybe<Scalars['String']>;
};

export type Payment = {
  __typename?: 'Payment';
  addressLine1: Scalars['String'];
  addressLine2?: Maybe<Scalars['String']>;
  amount: Scalars['Float'];
  bankCode?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['DateTime'];
  customerEmail: Scalars['String'];
  customerName: Scalars['String'];
  customerPhone?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  order: Order;
  paymentMethod: Scalars['String'];
  postalCode: Scalars['String'];
  provider: Scalars['String'];
  state: Scalars['String'];
  status: Scalars['String'];
  transactionId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PaymentStatus = {
  __typename?: 'PaymentStatus';
  amount: Scalars['Float'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  paymentMethod?: Maybe<Scalars['String']>;
  status: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export enum PersonTypes {
  Legal = 'Legal',
  Natural = 'Natural'
}

export type Position = {
  __typename?: 'Position';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Presupuesto = {
  __typename?: 'Presupuesto';
  ano: Scalars['Float'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mes: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  valor: Scalars['Float'];
  worker: User;
};

export type PresupuestoVsVenta = {
  __typename?: 'PresupuestoVsVenta';
  comparacionCumplimientoAcumulado: Scalars['String'];
  comparacionCumplimientoHoy: Scalars['String'];
  comparacionVentaAcumulada: Scalars['String'];
  comparacionVentaHoy: Scalars['String'];
  cumplimientoAcumuladoActual: Scalars['Float'];
  cumplimientoAcumuladoHastaHoy: Scalars['Float'];
  cumplimientoHoyActual: Scalars['Float'];
  diaActual: Scalars['Int'];
  presupuestoActual: Scalars['Float'];
  presupuestoAnterior: Scalars['Float'];
  userId: Scalars['String'];
  ventaAcumuladaActual: Scalars['Float'];
  ventaAcumuladaAnterior: Scalars['Float'];
  ventaAcumuladaHastaHoy: Scalars['Float'];
  ventaAcumuladaHastaMismoDiaAnterior: Scalars['Float'];
  ventaHoyActual: Scalars['Float'];
  ventaMismoDiaAnterior: Scalars['Float'];
};

export type PriceRule = {
  __typename?: 'PriceRule';
  clientType: ClientType;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  percentage: Scalars['Float'];
  product: Product;
  updatedAt: Scalars['DateTime'];
};

export type Product = {
  __typename?: 'Product';
  active: Scalars['Boolean'];
  basePrice: Scalars['Float'];
  calculatedPrice?: Maybe<Scalars['Float']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  /** Porcentaje de descuento (0-100) */
  discountPercentage?: Maybe<Scalars['Float']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  isDiscount: Scalars['Boolean'];
  photos?: Maybe<Array<ProductPhoto>>;
  priceRules?: Maybe<Array<PriceRule>>;
  reference: Scalars['String'];
  /** Productos relacionados */
  relatedProducts?: Maybe<Array<Product>>;
  subclasses?: Maybe<Array<SubClass>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type ProductFeatured = {
  __typename?: 'ProductFeatured';
  /** Indica si el destaque está activo */
  active: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** Monto fijo de descuento en la moneda base */
  discountAmount?: Maybe<Scalars['Float']>;
  /** Porcentaje de descuento (0-100) */
  discountPercentage?: Maybe<Scalars['Float']>;
  /** Fecha de fin del destaque */
  endDate?: Maybe<Scalars['DateTime']>;
  finalPrice: Scalars['Float'];
  id: Scalars['ID'];
  product: Product;
  /** Fecha de inicio del destaque */
  startDate?: Maybe<Scalars['DateTime']>;
  /** Tipo de destaque del producto */
  type: ProductFeaturedType;
  updatedAt: Scalars['DateTime'];
};

export type ProductFeaturedBaseInput = {
  /** Indica si está activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Monto fijo de descuento */
  discountAmount?: InputMaybe<Scalars['Float']>;
  /** Porcentaje de descuento (0-100) */
  discountPercentage?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  productId: Scalars['ID'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Tipo de destaque */
  type: ProductFeaturedType;
};

/** Tipos de destaque disponibles para los productos destacados */
export enum ProductFeaturedType {
  Nuevo = 'NUEVO',
  Oferta = 'OFERTA',
  Principal = 'PRINCIPAL',
  TopVentas = 'TOP_VENTAS'
}

export type ProductPhoto = {
  __typename?: 'ProductPhoto';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  product: Product;
  updatedAt: Scalars['DateTime'];
};

export type Profile = {
  __typename?: 'Profile';
  city: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  document: Scalars['String'];
  email: Scalars['String'];
  externalId: Scalars['ID'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  region: Scalars['Int'];
  stateAws?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type ProyectComment = {
  __typename?: 'ProyectComment';
  createdAt: Scalars['DateTime'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  proyect: Proyectos;
  proyectDescription?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type ProyectoEmbudoDto = {
  __typename?: 'ProyectoEmbudoDto';
  cantidad: Scalars['Float'];
  estado: ProyectosStatusEnum;
  userId: Scalars['ID'];
  valorTotal: Scalars['Float'];
};

export type ProyectoReferencia = {
  __typename?: 'ProyectoReferencia';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  marca: MarcaProyecto;
  observacion?: Maybe<Scalars['String']>;
  proyecto?: Maybe<Proyectos>;
  referencia: ReferenciaProyecto;
  tipoProyecto: TipoProyecto;
  updatedAt: Scalars['DateTime'];
  valor: Scalars['Float'];
};

export type Proyectos = {
  __typename?: 'Proyectos';
  city?: Maybe<City>;
  clientFinal: Client;
  clientIntegrador: Client;
  createdAt: Scalars['DateTime'];
  createdByUser: User;
  dateExpiration: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  referencias?: Maybe<Array<ProyectoReferencia>>;
  status: ProyectosStatusEnum;
  updatedAt: Scalars['DateTime'];
  value: Scalars['Float'];
  worker: User;
};

export enum ProyectosStatusEnum {
  Cancelado = 'CANCELADO',
  Exploracion = 'EXPLORACION',
  GanadoCerrado = 'GANADO_CERRADO',
  Negociacion = 'NEGOCIACION',
  PerdidoCerrado = 'PERDIDO_CERRADO',
  Presentacion = 'PRESENTACION',
  Propuesta = 'PROPUESTA'
}

export type Query = {
  __typename?: 'Query';
  Cell: WsCell;
  Cells: Array<WsCell>;
  CellsCount: MetadataPagination;
  Class: Class;
  Classes: Array<Class>;
  ClassesCount: MetadataPagination;
  Count: MetadataPagination;
  Fletes: Fletes;
  Fletess: Array<Fletes>;
  FletessCount: MetadataPagination;
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  ProyectoReferencias: Array<ProyectoReferencia>;
  ProyectoReferenciasCount: MetadataPagination;
  SubClass: SubClass;
  SubClasses: Array<SubClass>;
  SubClassesCount: MetadataPagination;
  WsEmail: WsEmail;
  WsEmails: Array<WsEmail>;
  WsEmailsCount: MetadataPagination;
  approvalJwt: AuthResponse;
  bundle: WsBatch;
  bundles: Array<WsBatch>;
  bundlesCount: MetadataPagination;
  cart: Cart;
  carts: Array<Cart>;
  cartsCount: MetadataPagination;
  cellsByClass: Array<CellClass>;
  cities: Array<City>;
  city: City;
  client: Client;
  clientAndContact: ClientContactModel;
  clientContact: ClientContact;
  clientContacts: Array<ClientContact>;
  clientContactsCount: MetadataPagination;
  clients: Array<Client>;
  clientsCount: MetadataPagination;
  codeRecoverPassword: Scalars['String'];
  cotizacion: Cotizacion;
  cotizaciones: Array<Cotizacion>;
  cotizacionesCount: MetadataPagination;
  countries: Array<Country>;
  country: Country;
  department: Department;
  departments: Array<Department>;
  documentType: DocumentType;
  documentTypes: Array<DocumentType>;
  documentTypesCount: MetadataPagination;
  dummies: Array<Dummy>;
  dummiesCount: MetadataPagination;
  dummy: Dummy;
  fichaTecnica: FichaTecnica;
  fichaTecnicas: Array<FichaTecnica>;
  fichaTecnicasCount: MetadataPagination;
  file: FileInfo;
  findAll: Array<UserKey>;
  findAllByClass: Array<Product>;
  findAllByClassCount?: Maybe<MetadataPagination>;
  findAllFacturaCliente: Array<FletesWithDocument>;
  findAllPayment: Array<Payment>;
  findAllVisitDashboard: VisitDashboardModel;
  findBundleInStop?: Maybe<WsBatch>;
  findOne: UserKey;
  findOneFacturaClienteByCode: FindOneFacturaClienteByCode;
  findOneReferencia?: Maybe<FichaTecnica>;
  findSeachCotizacion: Scalars['Boolean'];
  findStatisticStatusProyect: Array<ProyectoEmbudoDto>;
  findUtilidadReal: UtilidadRealModel;
  functionalities: FunctionalityModel;
  getDataDashboard: Array<DashboardDataModal>;
  getPaymentStatus: PaymentStatus;
  getVentasTop20Clientes: Array<VentasTrabajadorCliente>;
  group: WsGroup;
  groups: Array<WsGroup>;
  groupsCount: MetadataPagination;
  marcaProyecto: MarcaProyecto;
  marcaProyectos: Array<MarcaProyecto>;
  marcaProyectosCount: MetadataPagination;
  multiKeyRegister: MultikeyRegister;
  multiKeyRegisters: Array<MultikeyRegister>;
  multiKeyRegistersCount: MetadataPagination;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  obtenerStockReferencia?: Maybe<ReferenciaResponse>;
  oderAdmin: Order;
  order: Order;
  orders: Array<Order>;
  ordersCount: MetadataPagination;
  pageLink: PageLink;
  pageLinks: Array<PageLink>;
  pageLinksCount: MetadataPagination;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  position: Position;
  positions: Array<Position>;
  positionsCount: MetadataPagination;
  presupuesto: Presupuesto;
  presupuestoVentaPorUsuario?: Maybe<PresupuestoVsVenta>;
  presupuestos: Array<Presupuesto>;
  presupuestosCount: MetadataPagination;
  product: Product;
  productFeatured: ProductFeatured;
  productFeatureds: Array<ProductFeatured>;
  productFeaturedsCount: MetadataPagination;
  products: Array<Product>;
  productsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  proyectComment: ProyectComment;
  proyectComments: Array<ProyectComment>;
  proyectCommentsCount: MetadataPagination;
  proyecto: Proyectos;
  proyectoReferencia: ProyectoReferencia;
  proyectos: Array<Proyectos>;
  proyectosCount: MetadataPagination;
  referenciaProyecto: ReferenciaProyecto;
  referenciaProyectos: Array<ReferenciaProyecto>;
  referenciaProyectosCount: MetadataPagination;
  relatedProducts: Array<Product>;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  sendEmailRecovryPassword: Scalars['String'];
  sesion: WsSesion;
  sesiones: Array<WsSesion>;
  sesionesCount: MetadataPagination;
  stock: Stock;
  stockByReferencia?: Maybe<Stock>;
  stocks: Array<Stock>;
  stocksCount: MetadataPagination;
  storeClient: StoreClient;
  storeClients: Array<StoreClient>;
  storeClientsCount: MetadataPagination;
  storeReview: StoreReview;
  storeReviews: Array<StoreReview>;
  storeReviewsCount: MetadataPagination;
  task: Task;
  taskComment: TaskComment;
  tasks: Array<Task>;
  tasksComments: Array<TaskComment>;
  tasksCommentsCount: MetadataPagination;
  tasksCount: MetadataPagination;
  tipoProyecto: TipoProyecto;
  tipoProyectos: Array<TipoProyecto>;
  tipoProyectosCount: MetadataPagination;
  todosPresupuestosVentas: Array<PresupuestoVsVenta>;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
  ventasPorVendedor: Array<SalesPerWorker>;
  ventasPorVendedorDepartamento: Array<VentasPorVendedorDepartamento>;
  visit: Visit;
  visitComent: VisitComent;
  visitComents: Array<VisitComent>;
  visitComentsCount: MetadataPagination;
  visitType: VisitType;
  visitTypes: Array<VisitType>;
  visitTypesCount: MetadataPagination;
  visitasPorVendedor: Array<VisitsPerWorker>;
  visits: Array<Visit>;
  visitsCount: MetadataPagination;
};


export type QueryCellArgs = {
  id: Scalars['ID'];
};


export type QueryCellsArgs = {
  orderBy?: InputMaybe<Array<FindCellOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCellWhere>;
};


export type QueryCellsCountArgs = {
  orderBy?: InputMaybe<Array<FindCellOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCellWhere>;
};


export type QueryClassArgs = {
  id: Scalars['ID'];
};


export type QueryClassesArgs = {
  orderBy?: InputMaybe<Array<FindClassOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClassWhere>;
};


export type QueryClassesCountArgs = {
  orderBy?: InputMaybe<Array<FindClassOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClassWhere>;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFletesArgs = {
  id: Scalars['ID'];
};


export type QueryFletessArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryFletessCountArgs = {
  orderBy?: InputMaybe<Array<FindFletesOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFletesWhere>;
};


export type QueryNotificationGroupArgs = {
  id: Scalars['ID'];
};


export type QueryNotificationGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationGroupsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectoReferenciasArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectoReferenciasCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySubClassArgs = {
  id: Scalars['ID'];
};


export type QuerySubClassesArgs = {
  orderBy?: InputMaybe<Array<FindSubClassOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindSubClassWhere>;
};


export type QuerySubClassesCountArgs = {
  orderBy?: InputMaybe<Array<FindSubClassOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindSubClassWhere>;
};


export type QueryWsEmailArgs = {
  id: Scalars['ID'];
};


export type QueryWsEmailsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryWsEmailsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryApprovalJwtArgs = {
  approvalTokenInput: ApprovalTokenInput;
};


export type QueryBundleArgs = {
  id: Scalars['ID'];
};


export type QueryBundlesArgs = {
  orderBy?: InputMaybe<Array<FindWsBatchOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindWsBatchWhere>;
};


export type QueryBundlesCountArgs = {
  orderBy?: InputMaybe<Array<FindWsBatchOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindWsBatchWhere>;
};


export type QueryCartArgs = {
  id: Scalars['ID'];
};


export type QueryCartsArgs = {
  orderBy?: InputMaybe<Array<FindCartOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCartWhere>;
};


export type QueryCartsCountArgs = {
  orderBy?: InputMaybe<Array<FindCartOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCartWhere>;
};


export type QueryCellsByClassArgs = {
  classId: Scalars['String'];
  subClassId?: InputMaybe<Scalars['String']>;
};


export type QueryCitiesArgs = {
  departmentId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCityArgs = {
  departmentId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryClientAndContactArgs = {
  id: Scalars['ID'];
};


export type QueryClientContactArgs = {
  id: Scalars['ID'];
};


export type QueryClientContactsArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientContactsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientContactOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
};


export type QueryClientsArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryClientsCountArgs = {
  orderBy?: InputMaybe<Array<FindClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientWhere>;
};


export type QueryCodeRecoverPasswordArgs = {
  codeRecoverPasswordInput: CodeRecoverPasswordInput;
};


export type QueryCotizacionArgs = {
  id: Scalars['ID'];
};


export type QueryCotizacionesArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCotizacionesCountArgs = {
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindCotizacionWhere>;
};


export type QueryCountriesArgs = {
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryCountryArgs = {
  id: Scalars['ID'];
};


export type QueryDepartmentArgs = {
  countryId: Scalars['ID'];
  id: Scalars['ID'];
};


export type QueryDepartmentsArgs = {
  countryId?: InputMaybe<Scalars['ID']>;
  orderBy?: InputMaybe<OrderTypes>;
};


export type QueryDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type QueryDocumentTypesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDocumentTypesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryDummiesArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummiesCountArgs = {
  orderBy?: InputMaybe<Array<FindDummyOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindDummyWhere>;
};


export type QueryDummyArgs = {
  id: Scalars['ID'];
};


export type QueryFichaTecnicaArgs = {
  id: Scalars['ID'];
};


export type QueryFichaTecnicasArgs = {
  orderBy?: InputMaybe<Array<FindFichaTecnicaOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFichaTecnicaWhere>;
};


export type QueryFichaTecnicasCountArgs = {
  orderBy?: InputMaybe<Array<FindFichaTecnicaOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindFichaTecnicaWhere>;
};


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindAllByClassArgs = {
  orderBy?: InputMaybe<Array<FindProductOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  subClassId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<FindProductWhere>;
};


export type QueryFindAllByClassCountArgs = {
  orderBy?: InputMaybe<Array<FindProductOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  subClassId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<FindProductWhere>;
};


export type QueryFindAllFacturaClienteArgs = {
  input: FacturaPorClienteDto;
};


export type QueryFindAllPaymentArgs = {
  orderId: Scalars['String'];
};


export type QueryFindOneArgs = {
  id: Scalars['ID'];
};


export type QueryFindOneFacturaClienteByCodeArgs = {
  code: Scalars['String'];
};


export type QueryFindOneReferenciaArgs = {
  referencia: Scalars['String'];
};


export type QueryFindSeachCotizacionArgs = {
  cotizacionSeachInput: CotizacionSeachInput;
};


export type QueryFindStatisticStatusProyectArgs = {
  id: Scalars['ID'];
};


export type QueryFindUtilidadRealArgs = {
  input: FindUtilidadRealInput;
};


export type QueryGetDataDashboardArgs = {
  id: Scalars['String'];
};


export type QueryGetPaymentStatusArgs = {
  transactionId: Scalars['String'];
};


export type QueryGetVentasTop20ClientesArgs = {
  vendedor: Scalars['String'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGroupsArgs = {
  orderBy?: InputMaybe<Array<FindGroupOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindGroupWhere>;
};


export type QueryGroupsCountArgs = {
  orderBy?: InputMaybe<Array<FindGroupOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindGroupWhere>;
};


export type QueryMarcaProyectoArgs = {
  id: Scalars['ID'];
};


export type QueryMarcaProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMarcaProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegisterArgs = {
  id: MultikeyRegisterIdInput;
};


export type QueryMultiKeyRegistersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryMultiKeyRegistersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationArgs = {
  id: Scalars['ID'];
};


export type QueryNotificationConfigArgs = {
  id: Scalars['ID'];
};


export type QueryNotificationConfigsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationConfigsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryNotificationsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryObtenerStockReferenciaArgs = {
  referencia: Scalars['String'];
};


export type QueryOderAdminArgs = {
  orderId: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrdersArgs = {
  orderBy?: InputMaybe<Array<FindOrderOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderWhere>;
};


export type QueryOrdersCountArgs = {
  orderBy?: InputMaybe<Array<FindOrderOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindOrderWhere>;
};


export type QueryPageLinkArgs = {
  id: Scalars['ID'];
};


export type QueryPageLinksArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPageLinksCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParameterArgs = {
  id: Scalars['ID'];
};


export type QueryParametersArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryParametersCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionArgs = {
  id: Scalars['ID'];
};


export type QueryPositionsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPositionsCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryPresupuestoArgs = {
  id: Scalars['ID'];
};


export type QueryPresupuestoVentaPorUsuarioArgs = {
  userId: Scalars['String'];
};


export type QueryPresupuestosArgs = {
  orderBy?: InputMaybe<Array<FindPresupuestoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindPresupuestoWhere>;
};


export type QueryPresupuestosCountArgs = {
  orderBy?: InputMaybe<Array<FindPresupuestoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindPresupuestoWhere>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProductFeaturedArgs = {
  id: Scalars['ID'];
};


export type QueryProductFeaturedsArgs = {
  orderBy?: InputMaybe<Array<FindProductFeaturedOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductFeaturedWhere>;
};


export type QueryProductFeaturedsCountArgs = {
  orderBy?: InputMaybe<Array<FindProductFeaturedOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProductFeaturedWhere>;
};


export type QueryProductsArgs = {
  orderBy?: InputMaybe<Array<FindProductOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  subClassId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<FindProductWhere>;
};


export type QueryProductsCountArgs = {
  orderBy?: InputMaybe<Array<FindProductOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  subClassId?: InputMaybe<Scalars['String']>;
  where?: InputMaybe<FindProductWhere>;
};


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProyectCommentArgs = {
  id: Scalars['ID'];
};


export type QueryProyectCommentsArgs = {
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectCommentTypeWhere>;
};


export type QueryProyectCommentsCountArgs = {
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectCommentTypeWhere>;
};


export type QueryProyectoArgs = {
  id: Scalars['ID'];
};


export type QueryProyectoReferenciaArgs = {
  id: Scalars['ID'];
};


export type QueryProyectosArgs = {
  orderBy?: InputMaybe<Array<FindProyectoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
};


export type QueryProyectosCountArgs = {
  orderBy?: InputMaybe<Array<FindProyectoOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
};


export type QueryReferenciaProyectoArgs = {
  id: Scalars['ID'];
};


export type QueryReferenciaProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryReferenciaProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRelatedProductsArgs = {
  excludeProductId?: InputMaybe<Scalars['ID']>;
  limit?: Scalars['Float'];
  subclassIds: Array<Scalars['ID']>;
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryRoleFxArgs = {
  id: Scalars['ID'];
};


export type QueryRolesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryRolesFxCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QuerySendEmailRecovryPasswordArgs = {
  email: Scalars['String'];
};


export type QuerySesionArgs = {
  id: Scalars['ID'];
};


export type QuerySesionesArgs = {
  orderBy?: InputMaybe<Array<FindSesionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindSesionWhere>;
};


export type QuerySesionesCountArgs = {
  orderBy?: InputMaybe<Array<FindSesionOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindSesionWhere>;
};


export type QueryStockArgs = {
  id: Scalars['ID'];
};


export type QueryStockByReferenciaArgs = {
  referencia: Scalars['String'];
};


export type QueryStocksArgs = {
  orderBy?: InputMaybe<Array<FindStockTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStockTypeWhere>;
};


export type QueryStocksCountArgs = {
  orderBy?: InputMaybe<Array<FindStockTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStockTypeWhere>;
};


export type QueryStoreClientArgs = {
  id: Scalars['ID'];
};


export type QueryStoreClientsArgs = {
  orderBy?: InputMaybe<Array<FindStoreClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStoreClientWhere>;
};


export type QueryStoreClientsCountArgs = {
  orderBy?: InputMaybe<Array<FindStoreClientOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStoreClientWhere>;
};


export type QueryStoreReviewArgs = {
  id: Scalars['ID'];
};


export type QueryStoreReviewsArgs = {
  orderBy?: InputMaybe<Array<FindStoreReviewOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStoreReviewWhere>;
};


export type QueryStoreReviewsCountArgs = {
  orderBy?: InputMaybe<Array<FindStoreReviewOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindStoreReviewWhere>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTaskCommentArgs = {
  id: Scalars['ID'];
};


export type QueryTasksArgs = {
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskTypeWhere>;
};


export type QueryTasksCommentsArgs = {
  orderBy?: InputMaybe<Array<FindTaskCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskCommentTypeWhere>;
};


export type QueryTasksCommentsCountArgs = {
  orderBy?: InputMaybe<Array<FindTaskCommentTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskCommentTypeWhere>;
};


export type QueryTasksCountArgs = {
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindTaskTypeWhere>;
};


export type QueryTipoProyectoArgs = {
  id: Scalars['ID'];
};


export type QueryTipoProyectosArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryTipoProyectosCountArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUsersArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryUsersCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryValidateUserTokenArgs = {
  validateTokenInput: ValidateTokenInput;
};


export type QueryVentasPorVendedorArgs = {
  input: GetSalesInput;
};


export type QueryVentasPorVendedorDepartamentoArgs = {
  input: GetSalesInput;
};


export type QueryVisitArgs = {
  id: Scalars['ID'];
};


export type QueryVisitComentArgs = {
  id: Scalars['ID'];
};


export type QueryVisitComentsArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitComentsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitComentWhere>;
};


export type QueryVisitTypeArgs = {
  id: Scalars['ID'];
};


export type QueryVisitTypesArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitTypesCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitTypeWhere>;
};


export type QueryVisitasPorVendedorArgs = {
  workerNumber: Scalars['String'];
  year: Scalars['Float'];
};


export type QueryVisitsArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};


export type QueryVisitsCountArgs = {
  orderBy?: InputMaybe<Array<FindVisitOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindVisitWhere>;
};

export enum RecipientType {
  Bcc = 'Bcc',
  Cc = 'Cc',
  Destinatary = 'Destinatary'
}

export type RecoverPasswordInput = {
  email: Scalars['String'];
};

export type ReferenciaProyecto = {
  __typename?: 'ReferenciaProyecto';
  codigo: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  marca: Array<MarcaProyecto>;
  updatedAt: Scalars['DateTime'];
};

export type ReferenciaResponse = {
  __typename?: 'ReferenciaResponse';
  Costo?: Maybe<Scalars['Float']>;
  Descripcion: Scalars['String'];
  Stock?: Maybe<Scalars['Int']>;
  referencia: Scalars['String'];
};

export enum ResendOption {
  Fallidos = 'FALLIDOS',
  FallidosPendientes = 'FALLIDOS_PENDIENTES',
  Pendientes = 'PENDIENTES',
  Todos = 'TODOS'
}

/** Respuesta global estándar */
export type ResponseDto = {
  __typename?: 'ResponseDto';
  /** Mensaje informativo de la operación */
  message: Scalars['String'];
  /** Indica si la operación fue exitosa */
  success: Scalars['Boolean'];
};

export type ResponsePasarelaModel = {
  __typename?: 'ResponsePasarelaModel';
  transactionId: Scalars['String'];
  url?: Maybe<Scalars['String']>;
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['DateTime'];
  defaultForType?: Maybe<UserTypes>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  roleFx: Array<RoleFx>;
  updatedAt: Scalars['DateTime'];
  users?: Maybe<Array<User>>;
};

export type RoleFx = {
  __typename?: 'RoleFx';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  permission: Scalars['String'];
  role?: Maybe<Role>;
  updatedAt: Scalars['DateTime'];
};

export enum RouterType {
  ExternalRoute = 'ExternalRoute',
  InternalRouteWithArguments = 'InternalRouteWithArguments',
  InternaltRoute = 'InternaltRoute'
}

export type SalesPerWorker = {
  __typename?: 'SalesPerWorker';
  back: Scalars['Float'];
  costo: Scalars['Float'];
  flete: Scalars['Float'];
  nombre_mes: Scalars['String'];
  numero_mes: Scalars['Int'];
  oip: Scalars['Float'];
  utilidad: Scalars['Float'];
  utilidad_porcentaje: Scalars['Float'];
  vendedor: Scalars['String'];
  venta: Scalars['Float'];
};

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

export type SendLoteResult = {
  __typename?: 'SendLoteResult';
  error?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum SesionEmun {
  Fallida = 'FALLIDA',
  Lista = 'LISTA',
  Pendiente = 'PENDIENTE'
}

export type SigninAdminInput = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  verificationTypes?: InputMaybe<VerificationTypes>;
};

export type SigninInput = {
  email?: InputMaybe<Scalars['String']>;
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  personType?: InputMaybe<PersonTypes>;
  verificationDigit?: InputMaybe<Scalars['String']>;
};

export type SignupEmailInput = {
  confirmationPassword: Scalars['String'];
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
};

export type SignupInput = {
  address: Scalars['String'];
  cityId: Scalars['ID'];
  confirmationEmail: Scalars['String'];
  confirmationPassword: Scalars['String'];
  countryId: Scalars['ID'];
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId: Scalars['ID'];
  email: Scalars['String'];
  hasRural: Scalars['Boolean'];
  identificationNumber: Scalars['String'];
  identificationType: UserDocumentTypes;
  lastName: Scalars['String'];
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  password: Scalars['ValidatePassword'];
  phoneCountryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  secondSurname?: InputMaybe<Scalars['String']>;
};

export type SmsRecipient = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};

export enum StateNotification {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error'
}

export enum StateNotificationGroup {
  Complete = 'Complete',
  Draft = 'Draft',
  Error = 'Error',
  PartialComplete = 'PartialComplete',
  Process = 'Process'
}

export enum StatePersistent {
  NoPersistent = 'NoPersistent',
  Open = 'Open',
  Receive = 'Receive',
  Send = 'Send'
}

export enum StatusVisitEnum {
  Canceled = 'canceled',
  Confirmed = 'confirmed',
  Programmed = 'programmed',
  Realized = 'realized',
  Reprogrammed = 'reprogrammed'
}

export type Stock = {
  __typename?: 'Stock';
  cantidadActual: Scalars['Float'];
  clase: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fichaTecnica?: Maybe<FileInfo>;
  id: Scalars['ID'];
  isDeleted?: Maybe<Scalars['Boolean']>;
  nombreClase: Scalars['String'];
  nombreReferencia: Scalars['String'];
  referencia: Scalars['String'];
  stcMax: Scalars['Float'];
  stcMin: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type StoreClient = {
  __typename?: 'StoreClient';
  addresses?: Maybe<Array<StoreClientAddress>>;
  clientKind: ClientKind;
  clientType: ClientType;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  identificationType?: Maybe<UserDocumentTypes>;
  isRentencion: Scalars['Boolean'];
  isVerifiedEmail: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  lastPasswordTime?: Maybe<Scalars['DateTime']>;
  nit: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  rut: FileInfo;
  status: ClientStatus;
  updatedAt: Scalars['DateTime'];
};

export type StoreClientAddress = {
  __typename?: 'StoreClientAddress';
  address: Scalars['String'];
  city: Scalars['String'];
  client: StoreClient;
  complement?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  isDefault: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  reference?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  status: AddressStatus;
  updatedAt: Scalars['DateTime'];
  zipCode: Scalars['String'];
};

export type StoreReview = {
  __typename?: 'StoreReview';
  client: StoreClient;
  comment?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  product: Product;
  rating: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']>;
  _endswith?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _isNotNull?: InputMaybe<Scalars['Boolean']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _like?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _notcontains?: InputMaybe<Scalars['String']>;
  _notendswith?: InputMaybe<Scalars['String']>;
  _notlike?: InputMaybe<Scalars['String']>;
  _notstartswith?: InputMaybe<Scalars['String']>;
  _startswith?: InputMaybe<Scalars['String']>;
};

export type SubClass = {
  __typename?: 'SubClass';
  class?: Maybe<Class>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  products?: Maybe<Array<Product>>;
  status: SubClassStatus;
  updatedAt: Scalars['DateTime'];
};

export enum SubClassStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Inactive = 'INACTIVE'
}

export type Task = {
  __typename?: 'Task';
  cotizacion?: Maybe<Cotizacion>;
  createdAt: Scalars['DateTime'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  proyecto?: Maybe<Proyectos>;
  taskComment: Array<TaskComment>;
  taskDateExpiration: Scalars['String'];
  taskDescription?: Maybe<Scalars['String']>;
  taskName: Scalars['String'];
  taskPriority: TaskPrioridad;
  taskStatus: TaskStatus;
  updatedAt: Scalars['DateTime'];
  worker: User;
};

export type TaskComment = {
  __typename?: 'TaskComment';
  createdAt: Scalars['DateTime'];
  createdByUser: User;
  deletedAt?: Maybe<Scalars['DateTime']>;
  file?: Maybe<FileInfo>;
  id: Scalars['ID'];
  task: Task;
  taskDescription?: Maybe<Scalars['String']>;
  taskStatus: TaskStatus;
  updatedAt: Scalars['DateTime'];
};

export enum TaskPrioridad {
  Alta = 'ALTA',
  Baja = 'BAJA',
  Media = 'MEDIA'
}

/** Estado de la tarea */
export enum TaskStatus {
  Cancelada = 'CANCELADA',
  Creada = 'CREADA',
  EnProgreso = 'EN_PROGRESO',
  Pendiente = 'PENDIENTE',
  Realizada = 'REALIZADA',
  Vencida = 'VENCIDA'
}

export type TipoProyecto = {
  __typename?: 'TipoProyecto';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  nombre: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum TypeBundleEnum {
  Emails = 'EMAILS',
  Whastapp = 'WHASTAPP'
}

export enum TypeClientEnum {
  ClienteFinal = 'CLIENTE_FINAL',
  Distribuidor = 'DISTRIBUIDOR',
  Instalador = 'INSTALADOR',
  Integrador = 'INTEGRADOR'
}

export enum TypeNotification {
  Email = 'Email',
  Push = 'Push',
  Sms = 'Sms',
  Wss = 'Wss'
}

export enum TypeNotificationGroup {
  Automatic = 'Automatic',
  Manual = 'Manual'
}

export enum TypeParameterEnum {
  Date = 'date',
  File = 'file',
  Number = 'number',
  String = 'string'
}

export enum TypeWorker {
  Externo = 'externo',
  Freelance = 'freelance',
  Interno = 'interno'
}

export type UpdateBundleInput = {
  celularesIds?: InputMaybe<Array<Scalars['String']>>;
  createdByUserAtId?: InputMaybe<Scalars['String']>;
  deleteFile?: InputMaybe<Scalars['Boolean']>;
  descripcion?: InputMaybe<Scalars['String']>;
  estado?: InputMaybe<WsBatchStatus>;
  fileHtmlId?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  message?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeBundleEnum>;
  variables?: InputMaybe<Array<KeyValuePairInput>>;
};

export type UpdateCartInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  clientId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  items?: InputMaybe<Array<CreateCartItemInput>>;
};

export type UpdateCellInput = {
  apellido?: InputMaybe<Scalars['String']>;
  asesorId?: InputMaybe<Scalars['String']>;
  asistenteId?: InputMaybe<Scalars['String']>;
  celular?: InputMaybe<Scalars['String']>;
  ciudad?: InputMaybe<Scalars['String']>;
  classIds?: InputMaybe<Array<Scalars['ID']>>;
  direccion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  emailsDto?: InputMaybe<Array<Scalars['String']>>;
  empresa?: InputMaybe<Scalars['String']>;
  groupIds?: InputMaybe<Array<Scalars['ID']>>;
  id: Scalars['ID'];
  nit?: InputMaybe<Scalars['String']>;
  nombre?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<CellStatusEmun>;
  tipoCliente?: InputMaybe<TypeClientEnum>;
  type?: InputMaybe<CellTpeStatusEmun>;
  verify?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateClassInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ClassStatus>;
};

export type UpdateClientAddressInput = {
  address?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  complement?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isDefault?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<AddressStatus>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type UpdateClientContactInput = {
  celular?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeClientEnum>;
  userId?: InputMaybe<Scalars['String']>;
  vertical?: InputMaybe<Scalars['String']>;
};

export type UpdateCotizacionDetalleInput = {
  id: Scalars['ID'];
  valorCosto?: InputMaybe<Scalars['Float']>;
  valorVenta?: InputMaybe<Scalars['Float']>;
};

export type UpdateCotizacionInput = {
  ciudadCliente?: InputMaybe<Scalars['String']>;
  deleteProyect?: InputMaybe<Scalars['Boolean']>;
  descripcion?: InputMaybe<Scalars['String']>;
  emailCliente?: InputMaybe<Scalars['String']>;
  fecha?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  nitCliente?: InputMaybe<Scalars['String']>;
  nombreCliente?: InputMaybe<Scalars['String']>;
  nombreVendedor?: InputMaybe<Scalars['String']>;
  numeroCotizacion?: InputMaybe<Scalars['String']>;
  proyectoId?: InputMaybe<Scalars['ID']>;
  status?: InputMaybe<CotizacionStatusEnum>;
  valor?: InputMaybe<Scalars['Float']>;
  vendedor?: InputMaybe<Scalars['String']>;
};

export type UpdateDocumentTypeInput = {
  document?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type UpdateDummyInput = {
  email?: InputMaybe<Scalars['String']>;
  firstField?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  phone?: InputMaybe<Scalars['String']>;
  secondField?: InputMaybe<Scalars['DateTime']>;
  thirdField?: InputMaybe<Scalars['Float']>;
};

export type UpdateEmailInput = {
  address?: InputMaybe<Scalars['String']>;
  cellId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
};

export type UpdateFichaTecnicaInput = {
  description?: InputMaybe<Scalars['String']>;
  fileId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  referencia?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<FichaTecnicaEnum>;
};

export type UpdateFletesInput = {
  backComision?: InputMaybe<Scalars['Float']>;
  carrier?: InputMaybe<Scalars['String']>;
  carrierCell?: InputMaybe<Scalars['String']>;
  contactClient?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isTienda?: InputMaybe<Scalars['Boolean']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  numberGuia?: InputMaybe<Scalars['String']>;
  oip?: InputMaybe<Scalars['Float']>;
  valueFlete?: InputMaybe<Scalars['Float']>;
};

export type UpdateGroupInput = {
  cellIds?: InputMaybe<Array<Scalars['ID']>>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  nombre?: InputMaybe<Scalars['String']>;
  workerId?: InputMaybe<Scalars['String']>;
};

export type UpdateMarcaInput = {
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  nombre?: InputMaybe<Scalars['String']>;
};

export type UpdateMultikeyRegisterInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: MultikeyRegisterIdInput;
};

export type UpdateNotificationConfigInput = {
  emailDuplicateCode?: InputMaybe<Scalars['String']>;
  emailPrincipalCode?: InputMaybe<Scalars['String']>;
  hasEmail?: InputMaybe<Scalars['Boolean']>;
  hasPush?: InputMaybe<Scalars['Boolean']>;
  hasSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsEmail?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsPush?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsSms?: InputMaybe<Scalars['Boolean']>;
  hasTwoStepsWss?: InputMaybe<Scalars['Boolean']>;
  hasWss?: InputMaybe<Scalars['Boolean']>;
  html?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['ID']>;
  smsBody?: InputMaybe<Scalars['String']>;
  subtype?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<NotificationType>;
  wssCode?: InputMaybe<Scalars['String']>;
};

export type UpdateNotificationGroupInput = {
  groupId?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
};

export type UpdateNotificationInput = {
  emailRecipients?: InputMaybe<Array<EmailRecipient>>;
  id: Scalars['ID'];
  metadata?: InputMaybe<Scalars['String']>;
  notificationGroupId?: InputMaybe<Scalars['ID']>;
  notificationGroupName?: InputMaybe<Scalars['ID']>;
  smsRecipient?: InputMaybe<SmsRecipient>;
  subtypeConfig?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeNotification>;
  typeConfig?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['ID']>;
  wssRecipient?: InputMaybe<WssRecipient>;
};

export type UpdateOrderInput = {
  dummy?: InputMaybe<Scalars['ID']>;
  id: Scalars['ID'];
  status?: InputMaybe<OrderStatus>;
};

export type UpdateParametersInput = {
  codigo?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeParameterEnum>;
  valueDate?: InputMaybe<Scalars['DateTime']>;
  valueFileId?: InputMaybe<Scalars['ID']>;
  valueInt?: InputMaybe<Scalars['Float']>;
  valueString?: InputMaybe<Scalars['String']>;
};

export type UpdatePasswordInput = {
  password: Scalars['ValidatePassword'];
  passwordConfirm: Scalars['ValidatePassword'];
  token: Scalars['String'];
};

export type UpdatePositionInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdatePresupuestoInput = {
  ano?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  mes?: InputMaybe<Scalars['Float']>;
  valor?: InputMaybe<Scalars['Float']>;
  workerId?: InputMaybe<Scalars['String']>;
};

export type UpdateProductFeaturedInput = {
  /** Indica si está activo */
  active?: InputMaybe<Scalars['Boolean']>;
  /** Monto fijo de descuento */
  discountAmount?: InputMaybe<Scalars['Float']>;
  /** Porcentaje de descuento (0-100) */
  discountPercentage?: InputMaybe<Scalars['Float']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  /** ID del producto al que se aplica el destaque */
  id: Scalars['ID'];
  productId?: InputMaybe<Scalars['ID']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  /** Tipo de destaque */
  type?: InputMaybe<ProductFeaturedType>;
};

export type UpdateProductInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  basePrice?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  fileIds?: InputMaybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  mainPhoto?: InputMaybe<Scalars['String']>;
  reference?: InputMaybe<Scalars['String']>;
  rulePrice?: InputMaybe<Array<CreatePriceRuleInput>>;
  subclassIds?: InputMaybe<Array<Scalars['ID']>>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  city?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  document?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  region?: InputMaybe<Scalars['Int']>;
};

export type UpdateProyectCoomentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** Descripción de la tarea (opcional) */
  proyectDescription?: InputMaybe<Scalars['String']>;
  /** ID de la tarea */
  proyectId?: InputMaybe<Scalars['String']>;
};

export type UpdateProyectoReferenciaInput = {
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  marcaId?: InputMaybe<Scalars['String']>;
  observacion?: InputMaybe<Scalars['String']>;
  proyectoId?: InputMaybe<Scalars['String']>;
  referenciaId?: InputMaybe<Scalars['String']>;
  tipoProyectoId?: InputMaybe<Scalars['String']>;
  valor?: InputMaybe<Scalars['Float']>;
};

export type UpdatePryectosInput = {
  /** ID del cliente final */
  cityId?: InputMaybe<Scalars['String']>;
  /** ID del cliente final */
  clientFinalId?: InputMaybe<Scalars['String']>;
  /** ID del cliente integrador */
  clientIntegradorId?: InputMaybe<Scalars['String']>;
  /** Fecha de vencimiento del proyecto */
  dateExpiration?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Datos extras */
  metaData?: InputMaybe<Array<AddReferenciaToProyectoInput>>;
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ProyectosStatusEnum>;
  value?: InputMaybe<Scalars['Float']>;
  /** ID del trabajador asignado a la tarea */
  workerId?: InputMaybe<Scalars['String']>;
};

export type UpdateReferenciaInput = {
  codigo?: InputMaybe<Scalars['String']>;
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  marcaId?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateSessionInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SesionEmun>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateStatusInput = {
  id: Scalars['String'];
  status: StatusVisitEnum;
  token: Scalars['String'];
};

export type UpdateStockInput = {
  cantidadActual?: InputMaybe<Scalars['Float']>;
  clase?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isDeleted?: InputMaybe<Scalars['Boolean']>;
  nombreClase?: InputMaybe<Scalars['String']>;
  nombreReferencia?: InputMaybe<Scalars['String']>;
  referencia?: InputMaybe<Scalars['String']>;
  stcMax?: InputMaybe<Scalars['Float']>;
  stcMin?: InputMaybe<Scalars['Float']>;
};

export type UpdateStoreClientInput = {
  captchaToken?: InputMaybe<Scalars['String']>;
  clientKind?: InputMaybe<ClientKind>;
  clientType?: InputMaybe<ClientType>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  identificationType?: InputMaybe<UserDocumentTypes>;
  isRentencion?: InputMaybe<Scalars['Boolean']>;
  isVerifiedEmail?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  nit?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  rutId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ClientStatus>;
};

export type UpdateStoreReviewInput = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  productId?: InputMaybe<Scalars['ID']>;
  rating?: InputMaybe<Scalars['Float']>;
};

export type UpdateSubClassInput = {
  classId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<SubClassStatus>;
};

export type UpdateTaskCoomentInput = {
  /** ID del archivo */
  fileId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']>;
  /** ID de la tarea */
  taskId?: InputMaybe<Scalars['String']>;
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
};

export type UpdateTaskInput = {
  /** ID del proyecto asignado a la tarea (optional) */
  cotizacionId?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  /** Saber si viene o no del admin(opcional) */
  isAdmin?: InputMaybe<Scalars['Boolean']>;
  /** ID del proyecto asignado a la tarea (optional) */
  proyectoId?: InputMaybe<Scalars['String']>;
  /** Fecha de vencimiento de la tarea */
  taskDateExpiration?: InputMaybe<Scalars['DateTime']>;
  /** Descripción de la tarea (opcional) */
  taskDescription?: InputMaybe<Scalars['String']>;
  /** Nombre de la tarea */
  taskName?: InputMaybe<Scalars['String']>;
  /** Prioridad de la tarea */
  taskPriority?: InputMaybe<TaskPrioridad>;
  /** Estado de la tarea */
  taskStatus?: InputMaybe<TaskStatus>;
  /** ID del trabajador asignado a la tarea */
  workerId?: InputMaybe<Scalars['String']>;
};

export type UpdateTipoProyectoInput = {
  descripcion?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  nombre?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInformationInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  address?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['ID']>;
  countryId?: InputMaybe<Scalars['ID']>;
  dateIssue?: InputMaybe<Scalars['DateTime']>;
  departmentId?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
  hasRural?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: InputMaybe<Scalars['String']>;
  identificationType?: InputMaybe<UserDocumentTypes>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: InputMaybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: InputMaybe<UserDocumentTypes>;
  middleName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['ValidatePassword']>;
  phoneCountryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  secondSurname?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<UserTypes>;
  typeWoker?: InputMaybe<TypeWorker>;
  valueFreelance?: InputMaybe<Scalars['Int']>;
  valueMinVisit?: InputMaybe<Scalars['Int']>;
  valueTransport?: InputMaybe<Scalars['Float']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword'];
  newPassword: Scalars['ValidatePassword'];
  newPasswordConfirm: Scalars['ValidatePassword'];
};

export type UpdateVisitComentInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  status?: InputMaybe<VisitComentStatusEnum>;
  type?: InputMaybe<VisitComentTypeEnum>;
  visitId?: InputMaybe<Scalars['String']>;
};

export type UpdateVisitInput = {
  clientId?: InputMaybe<Scalars['String']>;
  dateVisit?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isProyect?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  longitude?: InputMaybe<Scalars['String']>;
  proyectoId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusVisitEnum>;
  typeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateVisitTypeInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<VisitTypeStatusEnum>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  city?: Maybe<City>;
  confirmationCode?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  dateIssue?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
  email: Scalars['String'];
  emailVerification: Scalars['Boolean'];
  fullName: Scalars['String'];
  hasRural?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  identificationNumber?: Maybe<Scalars['String']>;
  identificationType?: Maybe<UserDocumentTypes>;
  lastName?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationNumber?: Maybe<Scalars['String']>;
  legalRepresentativeIdentificationType?: Maybe<UserDocumentTypes>;
  manager?: Maybe<User>;
  middleName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneCountryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneVerification: Scalars['Boolean'];
  position?: Maybe<Scalars['String']>;
  secondSurname?: Maybe<Scalars['String']>;
  status: UserStatusTypes;
  subordinates?: Maybe<Array<User>>;
  type: UserTypes;
  typeWoker?: Maybe<TypeWorker>;
  updatedAt: Scalars['DateTime'];
  userRoles: Array<Role>;
  userRolesFx: Array<RoleFx>;
  valueFreelance?: Maybe<Scalars['Float']>;
  valueMinVisit?: Maybe<Scalars['Float']>;
  valueTransport?: Maybe<Scalars['Float']>;
};

export enum UserDocumentTypes {
  CitizenshipCard = 'CitizenshipCard',
  DiplomaticCard = 'DiplomaticCard',
  ForeignerIdentityCard = 'ForeignerIdentityCard',
  IdentityCard = 'IdentityCard',
  Nit = 'Nit',
  Passport = 'Passport',
  SafeConduct = 'SafeConduct',
  SpecialPermissionToStay = 'SpecialPermissionToStay',
  TemporaryProtectionPermit = 'TemporaryProtectionPermit'
}

export type UserKey = {
  __typename?: 'UserKey';
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  expirationCode: Scalars['String'];
  id: Scalars['ID'];
  origin: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export enum UserStatusTypes {
  Active = 'Active',
  Inactive = 'Inactive',
  PartlyActive = 'PartlyActive'
}

export enum UserTypes {
  Admin = 'Admin',
  SuperAdmin = 'SuperAdmin',
  User = 'User'
}

export type ValidateTokenInput = {
  token: Scalars['String'];
};

export type VentasPorVendedorDepartamento = {
  __typename?: 'VentasPorVendedorDepartamento';
  back: Scalars['Float'];
  costo: Scalars['Float'];
  departamento: Scalars['String'];
  flete: Scalars['Float'];
  oip: Scalars['Float'];
  utilidad: Scalars['Float'];
  utilidad_porcentaje: Scalars['Float'];
  vendedor: Scalars['String'];
  venta: Scalars['Float'];
};

export type VentasTrabajadorCliente = {
  __typename?: 'VentasTrabajadorCliente';
  nit?: Maybe<Scalars['String']>;
  nombreCliente?: Maybe<Scalars['String']>;
  total?: Maybe<Scalars['Float']>;
  vendedor?: Maybe<Scalars['String']>;
  venta?: Maybe<Scalars['Float']>;
};

export enum VerificationTypes {
  Email = 'Email',
  Phone = 'Phone'
}

export type Visit = {
  __typename?: 'Visit';
  client: Client;
  createdAt: Scalars['DateTime'];
  dateVisit: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  isProyect: Scalars['Boolean'];
  latitude?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  longitude?: Maybe<Scalars['String']>;
  proyecto?: Maybe<Proyectos>;
  status: StatusVisitEnum;
  type: VisitType;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type VisitComent = {
  __typename?: 'VisitComent';
  createdAt: Scalars['DateTime'];
  date?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  status?: Maybe<VisitComentStatusEnum>;
  type: VisitComentTypeEnum;
  updatedAt: Scalars['DateTime'];
  user: User;
  visit: Visit;
};

export enum VisitComentStatusEnum {
  Canceled = 'CANCELED',
  Pendinig = 'PENDINIG',
  Realized = 'REALIZED'
}

export enum VisitComentTypeEnum {
  Commitments = 'COMMITMENTS',
  Results = 'RESULTS'
}

export type VisitDashboardModel = {
  __typename?: 'VisitDashboardModel';
  earrings: Array<Visit>;
  realized: Array<Visit>;
};

export type VisitType = {
  __typename?: 'VisitType';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  status: VisitTypeStatusEnum;
  updatedAt: Scalars['DateTime'];
};

export enum VisitTypeStatusEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type VisitsPerWorker = {
  __typename?: 'VisitsPerWorker';
  numero_mes: Scalars['Int'];
  visitas: Scalars['Int'];
};

export type WsBatch = {
  __typename?: 'WsBatch';
  createdAt: Scalars['DateTime'];
  createdByUserAt?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  detalles?: Maybe<Array<WsBatchDetail>>;
  error?: Maybe<Scalars['String']>;
  estado: WsBatchStatus;
  file?: Maybe<FileInfo>;
  fileHtml?: Maybe<FileInfo>;
  group?: Maybe<WsGroup>;
  id: Scalars['ID'];
  message: Scalars['String'];
  nombre: Scalars['String'];
  type: TypeBundleEnum;
  updatedAt: Scalars['DateTime'];
  variables?: Maybe<Array<KeyValuePair>>;
};

export type WsBatchDetail = {
  __typename?: 'WsBatchDetail';
  celular: WsCell;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  error?: Maybe<Scalars['String']>;
  estado: WsBatchDetailStatus;
  id: Scalars['ID'];
  lote: WsBatch;
  updatedAt: Scalars['DateTime'];
};

export enum WsBatchDetailStatus {
  Entregado = 'ENTREGADO',
  Enviado = 'ENVIADO',
  Fallido = 'FALLIDO',
  NoEntregado = 'NO_ENTREGADO',
  Pendiente = 'PENDIENTE'
}

export enum WsBatchStatus {
  Completado = 'COMPLETADO',
  EnProceso = 'EN_PROCESO',
  Fallido = 'FALLIDO',
  Pausado = 'PAUSADO',
  Pendiente = 'PENDIENTE'
}

export type WsCell = {
  __typename?: 'WsCell';
  apellido?: Maybe<Scalars['String']>;
  asesor?: Maybe<User>;
  asistente?: Maybe<User>;
  cellClasses?: Maybe<Array<CellClass>>;
  celular: Scalars['String'];
  city?: Maybe<City>;
  ciudad?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  direccion?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  emails?: Maybe<Array<WsEmail>>;
  empresa?: Maybe<Scalars['String']>;
  fullName: Scalars['String'];
  id: Scalars['ID'];
  nit?: Maybe<Scalars['String']>;
  nombre?: Maybe<Scalars['String']>;
  region: Scalars['String'];
  status: CellStatusEmun;
  tipoCliente?: Maybe<TypeClientEnum>;
  type?: Maybe<CellTpeStatusEmun>;
  updatedAt: Scalars['DateTime'];
  verify?: Maybe<Scalars['Boolean']>;
  wsGroupCells?: Maybe<Array<WsGroupCell>>;
};

export type WsEmail = {
  __typename?: 'WsEmail';
  address: Scalars['String'];
  cell: WsCell;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type WsGroup = {
  __typename?: 'WsGroup';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  descripcion?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  nombre: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  worker?: Maybe<User>;
  wsGroupCells?: Maybe<Array<WsGroupCell>>;
};

export type WsGroupCell = {
  __typename?: 'WsGroupCell';
  cell: WsCell;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  group: WsGroup;
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type WsSesion = {
  __typename?: 'WsSesion';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  status: SesionEmun;
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
};

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export type FindOneFacturaClienteByCode = {
  __typename?: 'findOneFacturaClienteByCode';
  flete?: Maybe<Fletes>;
  isFound: Scalars['Boolean'];
};

export type FindUtilidadRealInput = {
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};

export type FindUtilidadRealModel = {
  __typename?: 'findUtilidadRealModel';
  utilidad: Scalars['Float'];
  utilidad_porcentaje: Scalars['Float'];
};

export type UtilidadRealModel = {
  __typename?: 'utilidadRealModel';
  grupo: FindUtilidadRealModel;
  trabajadores: Array<UtilidadRealTModel>;
};

export type UtilidadRealTModel = {
  __typename?: 'utilidadRealTModel';
  comision: Scalars['Float'];
  costo: Scalars['Float'];
  flete: Scalars['Float'];
  nombre: Scalars['String'];
  number_document: Scalars['String'];
  oip: Scalars['Float'];
  porcentaje: Scalars['Float'];
  presupuesto: Scalars['String'];
  totalVendido: Scalars['String'];
  utilidad: Scalars['Float'];
  utilidadPorcentaje: Scalars['Float'];
  utilidadReal: Scalars['Float'];
  venta: Scalars['Float'];
};

export type ValidateUserTokenQueryVariables = Exact<{
  validateTokenInput: ValidateTokenInput;
}>;


export type ValidateUserTokenQuery = { __typename?: 'Query', validateUserToken: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } };

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } } };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> };

export type ClientsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientOrderBy> | FindClientOrderBy>;
  where?: InputMaybe<FindClientWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, descripcion?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', name?: string | null, id: string, email: string } | null }>, clientsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ClientQueryVariables = Exact<{
  clientId: Scalars['ID'];
}>;


export type ClientQuery = { __typename?: 'Query', client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, descripcion?: string | null, department?: { __typename?: 'Department', id: string, name: string } | null, city?: { __typename?: 'City', id: string, name: string } | null, user?: { __typename?: 'User', id: string, fullName: string } | null } };

export type CreateClientMutationVariables = Exact<{
  createInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string } };

export type RemoveClientMutationVariables = Exact<{
  removeClientId: Scalars['ID'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', id: string } };

export type UpdateClientMutationVariables = Exact<{
  updateInput: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient: { __typename?: 'Client', id: string } };

export type VisitComentsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitComentOrderBy> | FindVisitComentOrderBy>;
  where?: InputMaybe<FindVisitComentWhere>;
}>;


export type VisitComentsQuery = { __typename?: 'Query', visitComents: Array<{ __typename?: 'VisitComent', status?: VisitComentStatusEnum | null, type: VisitComentTypeEnum, id: string, description: string, createdAt: any, date?: any | null, user: { __typename?: 'User', name?: string | null }, visit: { __typename?: 'Visit', id: string, client: { __typename?: 'Client', name: string } } }> };

export type ClientContactsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientContactOrderBy> | FindClientContactOrderBy>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindClientContactWhere>;
}>;


export type ClientContactsQuery = { __typename?: 'Query', clientContacts: Array<{ __typename?: 'ClientContact', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, celular: string, email: string, position: string, telefono?: string | null, client?: { __typename?: 'Client', id: string, name: string, numberDocument: string, telefono?: string | null, type?: TypeClientEnum | null, email: string } | null }>, clientContactsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type ClientsOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsOptionsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, name: string }> };

export type PositionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PositionsQuery = { __typename?: 'Query', positions: Array<{ __typename?: 'Position', id: string, name: string }> };

export type RemoveClientContactMutationVariables = Exact<{
  removeClientContactId: Scalars['ID'];
}>;


export type RemoveClientContactMutation = { __typename?: 'Mutation', removeClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type UpdateClientContactMutationVariables = Exact<{
  updateInput: UpdateClientContactInput;
}>;


export type UpdateClientContactMutation = { __typename?: 'Mutation', updateClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type CreateClientContactMutationVariables = Exact<{
  createInput: CreateClientContactInput;
}>;


export type CreateClientContactMutation = { __typename?: 'Mutation', createClientContact: { __typename?: 'ClientContact', id: string, name: string } };

export type CotizacionesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindCotizacionOrderBy> | FindCotizacionOrderBy>;
  where?: InputMaybe<FindCotizacionWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type CotizacionesQuery = { __typename?: 'Query', cotizaciones: Array<{ __typename?: 'Cotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numeroCotizacion: string, fecha: any, nombreCliente: string, nombreVendedor: string, vendedor: string, ciudadCliente: string, emailCliente: string, nitCliente: string, valor: number }>, cotizacionesCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type FindSeachCotizacionQueryVariables = Exact<{
  cotizacionSeachInput: CotizacionSeachInput;
}>;


export type FindSeachCotizacionQuery = { __typename?: 'Query', findSeachCotizacion: boolean };

export type CotizacionQueryVariables = Exact<{
  cotizacionId: Scalars['ID'];
}>;


export type CotizacionQuery = { __typename?: 'Query', cotizacion: { __typename?: 'Cotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numeroCotizacion: string, fecha: any, nombreCliente: string, nombreVendedor: string, vendedor: string, ciudadCliente: string, emailCliente: string, nitCliente: string, valor: number, descripcion?: string | null, status?: CotizacionStatusEnum | null, proyecto?: { __typename?: 'Proyectos', name: string, status: ProyectosStatusEnum, description?: string | null, value: number, id: string } | null, detalle?: Array<{ __typename?: 'DetalleCotizacion', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, referencia: string, descripcion: string, unidadMedida: string, cantidad: number, valorCosto: number, valorVenta: number, total: number, uuid: number }> | null } };

export type SaveDetalleCotizacionMutationVariables = Exact<{
  saveDetalleCotizacionId: Scalars['String'];
}>;


export type SaveDetalleCotizacionMutation = { __typename?: 'Mutation', saveDetalleCotizacion: boolean };

export type UpdateCotizacionMutationVariables = Exact<{
  updateInput: UpdateCotizacionInput;
}>;


export type UpdateCotizacionMutation = { __typename?: 'Mutation', updateCotizacion: { __typename?: 'Cotizacion', id: string } };

export type UpdateDetalleCotizacionMutationVariables = Exact<{
  updateInput: UpdateCotizacionDetalleInput;
}>;


export type UpdateDetalleCotizacionMutation = { __typename?: 'Mutation', updateDetalleCotizacion: { __typename?: 'DetalleCotizacion', id: string } };

export type FindAllFacturaClienteQueryVariables = Exact<{
  input: FacturaPorClienteDto;
}>;


export type FindAllFacturaClienteQuery = { __typename?: 'Query', findAllFacturaCliente: Array<{ __typename?: 'FletesWithDocument', numberDocument?: string | null, description?: string | null, valueFlete?: number | null, oip?: number | null, backComision?: number | null, numberGuia?: string | null, carrier?: string | null, carrierCell?: string | null, contactClient?: string | null, TEM_CEDULA?: string | null, TEM_NOMCLI?: string | null, TEM_FECHA?: string | null, TEM_TIPMOV?: string | null, TEM_PREFIJ?: string | null, TEM_NUMDOC?: string | null, TEM_VENDED?: string | null, TEM_VENTA?: string | null, TEM_VALCOS?: string | null, TEM_UTILIDAD?: string | null, TEM_PORCENTAJE_UTILIDAD?: string | null, CL_DEPART?: string | null, CLI_CIUDAD?: string | null }> };

export type FindOneFacturaClienteByCodeQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type FindOneFacturaClienteByCodeQuery = { __typename?: 'Query', findOneFacturaClienteByCode: { __typename?: 'findOneFacturaClienteByCode', isFound: boolean, flete?: { __typename?: 'Fletes', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, numberDocument: string, description: string, valueFlete: number, oip: number, backComision: number, numberGuia: string, carrier: string, carrierCell: string, contactClient: string } | null } };

export type CreateFletesMutationVariables = Exact<{
  createInput: CreateFletesInput;
}>;


export type CreateFletesMutation = { __typename?: 'Mutation', createFletes: { __typename?: 'Fletes', id: string } };

export type UpdateFletesMutationVariables = Exact<{
  updateInput: UpdateFletesInput;
}>;


export type UpdateFletesMutation = { __typename?: 'Mutation', updateFletes: { __typename?: 'Fletes', id: string } };

export type FindUtilidadRealQueryVariables = Exact<{
  input: FindUtilidadRealInput;
}>;


export type FindUtilidadRealQuery = { __typename?: 'Query', findUtilidadReal: { __typename?: 'utilidadRealModel', trabajadores: Array<{ __typename?: 'utilidadRealTModel', number_document: string, nombre: string, venta: number, costo: number, flete: number, comision: number, oip: number, utilidadReal: number, utilidadPorcentaje: number, utilidad: number, porcentaje: number, totalVendido: string, presupuesto: string }>, grupo: { __typename?: 'findUtilidadRealModel', utilidad: number, utilidad_porcentaje: number } } };

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string }> };

export type CitiesQueryVariables = Exact<{
  departmentId?: InputMaybe<Scalars['ID']>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string, department?: { __typename?: 'Department', code: number, createdAt: any, deletedAt?: any | null, id: string, name: string, updatedAt: any } | null }> };

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'User', email: string } };

export type SendEmailRecovryPasswordQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendEmailRecovryPasswordQuery = { __typename?: 'Query', sendEmailRecovryPassword: string };

export type ParametersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type ParametersQuery = { __typename?: 'Query', parameters: Array<{ __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, url: string, fileMongoId?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes } | null }>, parametersCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type RemoveParameterMutationVariables = Exact<{
  removeParameterId: Scalars['ID'];
}>;


export type RemoveParameterMutation = { __typename?: 'Mutation', removeParameter: { __typename?: 'Parameter', id: string, name: string, type: TypeParameterEnum, descripcion: string } };

export type UpdateParameterMutationVariables = Exact<{
  updateInput: UpdateParametersInput;
}>;


export type UpdateParameterMutation = { __typename?: 'Mutation', updateParameter: { __typename?: 'Parameter', id: string, name: string, descripcion: string } };

export type CreateParameterMutationVariables = Exact<{
  createInput: CreateParametersInput;
}>;


export type CreateParameterMutation = { __typename?: 'Mutation', createParameter: { __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, url: string } | null } };

export type CrearConceptoMutationVariables = Exact<{
  data: CrearConceptoDto;
}>;


export type CrearConceptoMutation = { __typename?: 'Mutation', crearConcepto: { __typename?: 'ConceptoTable', id: string, nombre: string, esSuma: boolean, editable?: boolean | null, valores: string } };

export type UpdateConceptoMutationVariables = Exact<{
  actualizarConceptoDto: ActualizarConceptoDto;
}>;


export type UpdateConceptoMutation = { __typename?: 'Mutation', updateConcepto: { __typename?: 'ConceptoTable', id: string, nombre: string, esSuma: boolean, editable?: boolean | null, valores: string } };

export type EliminarConceptoMutationVariables = Exact<{
  eliminarConceptoDto: Scalars['String'];
}>;


export type EliminarConceptoMutation = { __typename?: 'Mutation', eliminarConcepto: string };

export type CreatePresupuestoMutationVariables = Exact<{
  createInput: CreatePresupuestoInput;
}>;


export type CreatePresupuestoMutation = { __typename?: 'Mutation', createPresupuesto: { __typename?: 'Presupuesto', id: string } };

export type RemovePresupuestoMutationVariables = Exact<{
  removePresupuestoId: Scalars['ID'];
}>;


export type RemovePresupuestoMutation = { __typename?: 'Mutation', removePresupuesto: { __typename?: 'Presupuesto', id: string } };

export type PresupuestosQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindPresupuestoOrderBy> | FindPresupuestoOrderBy>;
  where?: InputMaybe<FindPresupuestoWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type PresupuestosQuery = { __typename?: 'Query', presupuestos: Array<{ __typename?: 'Presupuesto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description?: string | null, valor: number, ano: number, mes: number, worker: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string } }>, presupuestosCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateAllPresupuestoToMonthMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAllPresupuestoToMonthMutation = { __typename?: 'Mutation', createAllPresupuestoToMonth: boolean };

export type CreateProyectoMutationVariables = Exact<{
  createInput: CreateProyectosInput;
}>;


export type CreateProyectoMutation = { __typename?: 'Mutation', createProyecto: { __typename?: 'Proyectos', id: string } };

export type ProyectosQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindProyectoWhere>;
  orderBy?: InputMaybe<Array<FindProyectoOrderBy> | FindProyectoOrderBy>;
}>;


export type ProyectosQuery = { __typename?: 'Query', proyectos: Array<{ __typename?: 'Proyectos', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, value: number, status: ProyectosStatusEnum, dateExpiration: any, description?: string | null, clientIntegrador: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null }, clientFinal: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string }, worker: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, manager?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null, subordinates?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> }, createdByUser: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }>, proyectosCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type UpdateProyectoMutationVariables = Exact<{
  updateInput: UpdatePryectosInput;
}>;


export type UpdateProyectoMutation = { __typename?: 'Mutation', updateProyecto: { __typename?: 'Proyectos', id: string } };

export type ProyectoQueryVariables = Exact<{
  proyectoId: Scalars['ID'];
}>;


export type ProyectoQuery = { __typename?: 'Query', proyecto: { __typename?: 'Proyectos', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, value: number, status: ProyectosStatusEnum, dateExpiration: any, description?: string | null, clientIntegrador: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, user?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null }, clientFinal: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, descripcion?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string }, worker: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, manager?: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string } | null, subordinates?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> }, createdByUser: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, valueTransport?: number | null, typeWoker?: TypeWorker | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, referencias?: Array<{ __typename?: 'ProyectoReferencia', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, observacion?: string | null, valor: number, tipoProyecto: { __typename?: 'TipoProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, isActive: boolean }, marca: { __typename?: 'MarcaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, isActive: boolean }, referencia: { __typename?: 'ReferenciaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, codigo: string, descripcion?: string | null, isActive: boolean } }> | null } };

export type CreateProyectCommentMutationVariables = Exact<{
  createInput: CreateProyectCommentInput;
}>;


export type CreateProyectCommentMutation = { __typename?: 'Mutation', createProyectComment: { __typename?: 'ProyectComment', id: string } };

export type UpdateProyectCommentMutationVariables = Exact<{
  updateInput: UpdateProyectCoomentInput;
}>;


export type UpdateProyectCommentMutation = { __typename?: 'Mutation', updateProyectComment: { __typename?: 'ProyectComment', id: string } };

export type ProyectCommentsQueryVariables = Exact<{
  where?: InputMaybe<FindProyectCommentTypeWhere>;
  orderBy?: InputMaybe<Array<FindProyectCommentTypeOrderBy> | FindProyectCommentTypeOrderBy>;
}>;


export type ProyectCommentsQuery = { __typename?: 'Query', proyectComments: Array<{ __typename?: 'ProyectComment', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, proyectDescription?: string | null, createdByUser: { __typename?: 'User', identificationNumber?: string | null, identificationType?: UserDocumentTypes | null, email: string, fullName: string }, file?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, fileUrl?: string | null, url: string, chunkSize?: number | null } | null }> };

export type FindStatisticStatusProyectQueryVariables = Exact<{
  findStatisticStatusProyectId: Scalars['ID'];
}>;


export type FindStatisticStatusProyectQuery = { __typename?: 'Query', findStatisticStatusProyect: Array<{ __typename?: 'ProyectoEmbudoDto', valorTotal: number, cantidad: number, estado: ProyectosStatusEnum, userId: string }> };

export type CreateTipoProyectoMutationVariables = Exact<{
  createInput: CreateTipoProyectoInput;
}>;


export type CreateTipoProyectoMutation = { __typename?: 'Mutation', createTipoProyecto: { __typename?: 'TipoProyecto', id: string } };

export type UpdateTipoProyectoMutationVariables = Exact<{
  updateInput: UpdateTipoProyectoInput;
}>;


export type UpdateTipoProyectoMutation = { __typename?: 'Mutation', updateTipoProyecto: { __typename?: 'TipoProyecto', id: string } };

export type TipoProyectosQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type TipoProyectosQuery = { __typename?: 'Query', tipoProyectos: Array<{ __typename?: 'TipoProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, descripcion?: string | null, isActive: boolean }>, tipoProyectosCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type MarcaProyectosQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type MarcaProyectosQuery = { __typename?: 'Query', marcaProyectos: Array<{ __typename?: 'MarcaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, nombre: string, isActive: boolean, referencias: Array<{ __typename?: 'ReferenciaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, codigo: string, descripcion?: string | null, isActive: boolean }> }>, marcaProyectosCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateMarcaProyectoMutationVariables = Exact<{
  createInput: CreateMarcaInput;
}>;


export type CreateMarcaProyectoMutation = { __typename?: 'Mutation', createMarcaProyecto: { __typename?: 'MarcaProyecto', id: string } };

export type UpdateMarcaProyectoMutationVariables = Exact<{
  updateInput: UpdateMarcaInput;
}>;


export type UpdateMarcaProyectoMutation = { __typename?: 'Mutation', updateMarcaProyecto: { __typename?: 'MarcaProyecto', id: string } };

export type ReferenciaProyectosQueryVariables = Exact<{ [key: string]: never; }>;


export type ReferenciaProyectosQuery = { __typename?: 'Query', referenciaProyectos: Array<{ __typename?: 'ReferenciaProyecto', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, codigo: string, descripcion?: string | null, isActive: boolean }> };

export type CreateReferenciaProyectoMutationVariables = Exact<{
  createInput: CreateReferenciaInput;
}>;


export type CreateReferenciaProyectoMutation = { __typename?: 'Mutation', createReferenciaProyecto: { __typename?: 'ReferenciaProyecto', id: string } };

export type UpdateReferenciaProyectoMutationVariables = Exact<{
  updateInput: UpdateReferenciaInput;
}>;


export type UpdateReferenciaProyectoMutation = { __typename?: 'Mutation', updateReferenciaProyecto: { __typename?: 'ReferenciaProyecto', id: string } };

export type RemoveProyectoReferenciaMutationVariables = Exact<{
  removeProyectoReferenciaId: Scalars['ID'];
}>;


export type RemoveProyectoReferenciaMutation = { __typename?: 'Mutation', removeProyectoReferencia: { __typename?: 'ProyectoReferencia', id: string } };

export type CreateProyectoReferenciaMutationVariables = Exact<{
  createInput: AddReferenciaToProyectoInput;
}>;


export type CreateProyectoReferenciaMutation = { __typename?: 'Mutation', createProyectoReferencia: { __typename?: 'ProyectoReferencia', id: string } };

export type StocksQueryVariables = Exact<{ [key: string]: never; }>;


export type StocksQuery = { __typename?: 'Query', stocks: Array<{ __typename?: 'Stock', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, referencia: string, nombreReferencia: string, clase: string, nombreClase: string, cantidadActual: number, stcMin: number, isDeleted?: boolean | null, stcMax: number, fichaTecnica?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId?: string | null, chunkSize?: number | null, fileUrl?: string | null, url: string } | null }> };

export type CreateStockMutationVariables = Exact<{
  createInput: CreateStockInput;
}>;


export type CreateStockMutation = { __typename?: 'Mutation', createStock: { __typename?: 'Stock', id: string } };

export type UpdateStockMutationVariables = Exact<{
  updateInput: UpdateStockInput;
}>;


export type UpdateStockMutation = { __typename?: 'Mutation', updateStock: { __typename?: 'Stock', id: string } };

export type UpdateToStockMutationVariables = Exact<{ [key: string]: never; }>;


export type UpdateToStockMutation = { __typename?: 'Mutation', updateToStock: { __typename?: 'ResponseDto', success: boolean, message: string } };

export type RemoveStockMutationVariables = Exact<{
  removeStockId: Scalars['ID'];
}>;


export type RemoveStockMutation = { __typename?: 'Mutation', removeStock: { __typename?: 'Stock', id: string } };

export type TasksQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindTaskTypeOrderBy> | FindTaskTypeOrderBy>;
  where?: InputMaybe<FindTaskTypeWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type TasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, taskName: string, taskDescription?: string | null, taskDateExpiration: string, taskPriority: TaskPrioridad, taskStatus: TaskStatus, worker: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string }, createdByUser: { __typename?: 'User', email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, fullName: string } }>, tasksCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateTaskMutationVariables = Exact<{
  createInput: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type UpdateTaskMutationVariables = Exact<{
  updateInput: UpdateTaskInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Task', id: string } };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindUsersOrderBy> | FindUsersOrderBy>;
  where?: InputMaybe<FindUsersWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, valueTransport?: number | null, typeWoker?: TypeWorker | null, fullName: string, subordinates?: Array<{ __typename?: 'User', id: string, fullName: string, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null }> | null, city?: { __typename?: 'City', id: string, name: string } | null, department?: { __typename?: 'Department', id: string, name: string } | null, country?: { __typename?: 'Country', id: string, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, name: string }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string }> }>, usersCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateUserMutationVariables = Exact<{
  createInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type RemoveUserMutationVariables = Exact<{
  removeUserId: Scalars['ID'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: string, fullName: string, name?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  updateInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName: string, lastName?: string | null } };

export type AssignSubordinateMutationVariables = Exact<{
  managerId: Scalars['String'];
  subordinateId: Scalars['String'];
}>;


export type AssignSubordinateMutation = { __typename?: 'Mutation', assignSubordinate: { __typename?: 'User', id: string } };

export type RemoveSubordinateMutationVariables = Exact<{
  managerId: Scalars['String'];
  subordinateId: Scalars['String'];
}>;


export type RemoveSubordinateMutation = { __typename?: 'Mutation', removeSubordinate: { __typename?: 'User', id: string } };

export type VisitsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitOrderBy> | FindVisitOrderBy>;
  where?: InputMaybe<FindVisitWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, dateVisit: any, status: StatusVisitEnum, isProyect: boolean, latitude?: string | null, longitude?: string | null, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }, type: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } }>, visitsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type VisitTypesQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitTypeOrderBy> | FindVisitTypeOrderBy>;
  where?: InputMaybe<FindVisitTypeWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitTypesQuery = { __typename?: 'Query', visitTypes: Array<{ __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }>, visitTypesCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

export type CreateVisitTypeMutationVariables = Exact<{
  createInput: CreateVisitTypeInput;
}>;


export type CreateVisitTypeMutation = { __typename?: 'Mutation', createVisitType: { __typename?: 'VisitType', id: string } };

export type VisitQueryVariables = Exact<{
  visitId: Scalars['ID'];
}>;


export type VisitQuery = { __typename?: 'Query', visit: { __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, dateVisit: any, status: StatusVisitEnum, isProyect: boolean, longitude?: string | null, latitude?: string | null, client: { __typename?: 'Client', id: string, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, createdAt: any }, type: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum } } };

export type UpdateVisitTypeMutationVariables = Exact<{
  updateInput: UpdateVisitTypeInput;
}>;


export type UpdateVisitTypeMutation = { __typename?: 'Mutation', updateVisitType: { __typename?: 'VisitType', id: string } };

export type RemoveVisitTypeMutationVariables = Exact<{
  removeVisitTypeId: Scalars['ID'];
}>;


export type RemoveVisitTypeMutation = { __typename?: 'Mutation', removeVisitType: { __typename?: 'VisitType', id: string } };

export type UpdateVisitMutationVariables = Exact<{
  updateInput: UpdateVisitInput;
}>;


export type UpdateVisitMutation = { __typename?: 'Mutation', updateVisit: { __typename?: 'Visit', id: string } };

export type AcceptOrDeclineVisitMutationVariables = Exact<{
  updateStatusInput: UpdateStatusInput;
}>;


export type AcceptOrDeclineVisitMutation = { __typename?: 'Mutation', acceptOrDeclineVisit: string };

export type CreateVisitComentMutationVariables = Exact<{
  createInput: CreateVisitComentInput;
}>;


export type CreateVisitComentMutation = { __typename?: 'Mutation', createVisitComent: { __typename?: 'VisitComent', id: string } };

export type VisitasPorVendedorQueryVariables = Exact<{
  year: Scalars['Float'];
  workerNumber: Scalars['String'];
}>;


export type VisitasPorVendedorQuery = { __typename?: 'Query', visitasPorVendedor: Array<{ __typename?: 'VisitsPerWorker', numero_mes: number, visitas: number }> };

export type VentasPorVendedorQueryVariables = Exact<{
  input: GetSalesInput;
}>;


export type VentasPorVendedorQuery = { __typename?: 'Query', ventasPorVendedor: Array<{ __typename?: 'SalesPerWorker', vendedor: string, nombre_mes: string, numero_mes: number, venta: number, costo: number, oip: number, flete: number, back: number, utilidad: number, utilidad_porcentaje: number }> };

export type VentasPorVendedorDepartamentoQueryVariables = Exact<{
  input: GetSalesInput;
}>;


export type VentasPorVendedorDepartamentoQuery = { __typename?: 'Query', ventasPorVendedorDepartamento: Array<{ __typename?: 'VentasPorVendedorDepartamento', vendedor: string, departamento: string, venta: number, costo: number, oip: number, flete: number, back: number, utilidad: number, utilidad_porcentaje: number }> };

export const UserFragmentFragmentDoc = gql`
    fragment userFragment on User {
  id
  createdAt
  updatedAt
  deletedAt
  name
  middleName
  lastName
  secondSurname
  email
  identificationType
  identificationNumber
  dateIssue
  legalRepresentativeIdentificationType
  legalRepresentativeIdentificationNumber
  phoneCountryCode
  phoneNumber
  address
  hasRural
  confirmationCode
  position
  status
  phoneVerification
  emailVerification
  type
  city {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  department {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  country {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
  userRoles {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    defaultForType
    users {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    roleFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
    }
  }
  userRolesFx {
    id
    createdAt
    updatedAt
    deletedAt
    permission
    role {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
    }
  }
  fullName
}
    `;
export const ValidateUserTokenDocument = gql`
    query ValidateUserToken($validateTokenInput: ValidateTokenInput!) {
  validateUserToken(validateTokenInput: $validateTokenInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    userRoles {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      defaultForType
      users {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      roleFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
      }
    }
    userRolesFx {
      id
      createdAt
      updatedAt
      deletedAt
      permission
      role {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
      }
    }
    fullName
  }
}
    `;

/**
 * __useValidateUserTokenQuery__
 *
 * To run a query within a React component, call `useValidateUserTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateUserTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateUserTokenQuery({
 *   variables: {
 *      validateTokenInput: // value for 'validateTokenInput'
 *   },
 * });
 */
export function useValidateUserTokenQuery(baseOptions: Apollo.QueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
      }
export function useValidateUserTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>(ValidateUserTokenDocument, options);
        }
export type ValidateUserTokenQueryHookResult = ReturnType<typeof useValidateUserTokenQuery>;
export type ValidateUserTokenLazyQueryHookResult = ReturnType<typeof useValidateUserTokenLazyQuery>;
export type ValidateUserTokenQueryResult = Apollo.QueryResult<ValidateUserTokenQuery, ValidateUserTokenQueryVariables>;
export const SigninDocument = gql`
    mutation Signin($signinInput: SigninInput!) {
  signin(signinInput: $signinInput) {
    token
    user {
      ...userFragment
    }
  }
}
    ${UserFragmentFragmentDoc}`;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const ClientsDocument = gql`
    query Clients($orderBy: [FindClientOrderBy!], $where: FindClientWhere, $pagination: Pagination) {
  clients(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
    email
    telefono
    address
    type
    vertical
    descripcion
    celular
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    department {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    country {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    user {
      name
      id
      email
    }
  }
  clientsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const ClientDocument = gql`
    query Client($clientId: ID!) {
  client(id: $clientId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
    email
    telefono
    address
    type
    vertical
    celular
    descripcion
    department {
      id
      name
    }
    city {
      id
      name
    }
    user {
      id
      fullName
    }
  }
}
    `;

/**
 * __useClientQuery__
 *
 * To run a query within a React component, call `useClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientQuery({
 *   variables: {
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useClientQuery(baseOptions: Apollo.QueryHookOptions<ClientQuery, ClientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
      }
export function useClientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientQuery, ClientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientQuery, ClientQueryVariables>(ClientDocument, options);
        }
export type ClientQueryHookResult = ReturnType<typeof useClientQuery>;
export type ClientLazyQueryHookResult = ReturnType<typeof useClientLazyQuery>;
export type ClientQueryResult = Apollo.QueryResult<ClientQuery, ClientQueryVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($createInput: CreateClientInput!) {
  createClient(createInput: $createInput) {
    id
  }
}
    `;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const RemoveClientDocument = gql`
    mutation RemoveClient($removeClientId: ID!) {
  removeClient(id: $removeClientId) {
    id
  }
}
    `;
export type RemoveClientMutationFn = Apollo.MutationFunction<RemoveClientMutation, RemoveClientMutationVariables>;

/**
 * __useRemoveClientMutation__
 *
 * To run a mutation, you first call `useRemoveClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientMutation, { data, loading, error }] = useRemoveClientMutation({
 *   variables: {
 *      removeClientId: // value for 'removeClientId'
 *   },
 * });
 */
export function useRemoveClientMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClientMutation, RemoveClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClientMutation, RemoveClientMutationVariables>(RemoveClientDocument, options);
      }
export type RemoveClientMutationHookResult = ReturnType<typeof useRemoveClientMutation>;
export type RemoveClientMutationResult = Apollo.MutationResult<RemoveClientMutation>;
export type RemoveClientMutationOptions = Apollo.BaseMutationOptions<RemoveClientMutation, RemoveClientMutationVariables>;
export const UpdateClientDocument = gql`
    mutation UpdateClient($updateInput: UpdateClientInput!) {
  updateClient(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateClientMutationFn = Apollo.MutationFunction<UpdateClientMutation, UpdateClientMutationVariables>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientMutation, UpdateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientMutation, UpdateClientMutationVariables>(UpdateClientDocument, options);
      }
export type UpdateClientMutationHookResult = ReturnType<typeof useUpdateClientMutation>;
export type UpdateClientMutationResult = Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<UpdateClientMutation, UpdateClientMutationVariables>;
export const VisitComentsDocument = gql`
    query VisitComents($orderBy: [FindVisitComentOrderBy!], $where: FindVisitComentWhere) {
  visitComents(orderBy: $orderBy, where: $where) {
    status
    type
    user {
      name
    }
    id
    description
    createdAt
    date
    visit {
      id
      client {
        name
      }
    }
  }
}
    `;

/**
 * __useVisitComentsQuery__
 *
 * To run a query within a React component, call `useVisitComentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitComentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitComentsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVisitComentsQuery(baseOptions?: Apollo.QueryHookOptions<VisitComentsQuery, VisitComentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitComentsQuery, VisitComentsQueryVariables>(VisitComentsDocument, options);
      }
export function useVisitComentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitComentsQuery, VisitComentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitComentsQuery, VisitComentsQueryVariables>(VisitComentsDocument, options);
        }
export type VisitComentsQueryHookResult = ReturnType<typeof useVisitComentsQuery>;
export type VisitComentsLazyQueryHookResult = ReturnType<typeof useVisitComentsLazyQuery>;
export type VisitComentsQueryResult = Apollo.QueryResult<VisitComentsQuery, VisitComentsQueryVariables>;
export const ClientContactsDocument = gql`
    query ClientContacts($orderBy: [FindClientContactOrderBy!], $pagination: Pagination, $where: FindClientContactWhere) {
  clientContacts(orderBy: $orderBy, pagination: $pagination, where: $where) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    celular
    email
    position
    telefono
    client {
      id
      name
      numberDocument
      telefono
      type
      email
    }
  }
  clientContactsCount(orderBy: $orderBy, pagination: $pagination, where: $where) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useClientContactsQuery__
 *
 * To run a query within a React component, call `useClientContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientContactsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      pagination: // value for 'pagination'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useClientContactsQuery(baseOptions?: Apollo.QueryHookOptions<ClientContactsQuery, ClientContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientContactsQuery, ClientContactsQueryVariables>(ClientContactsDocument, options);
      }
export function useClientContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientContactsQuery, ClientContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientContactsQuery, ClientContactsQueryVariables>(ClientContactsDocument, options);
        }
export type ClientContactsQueryHookResult = ReturnType<typeof useClientContactsQuery>;
export type ClientContactsLazyQueryHookResult = ReturnType<typeof useClientContactsLazyQuery>;
export type ClientContactsQueryResult = Apollo.QueryResult<ClientContactsQuery, ClientContactsQueryVariables>;
export const ClientsOptionsDocument = gql`
    query ClientsOptions {
  clients {
    id
    name
  }
}
    `;

/**
 * __useClientsOptionsQuery__
 *
 * To run a query within a React component, call `useClientsOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsOptionsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsOptionsQuery, ClientsOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsOptionsQuery, ClientsOptionsQueryVariables>(ClientsOptionsDocument, options);
      }
export function useClientsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsOptionsQuery, ClientsOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsOptionsQuery, ClientsOptionsQueryVariables>(ClientsOptionsDocument, options);
        }
export type ClientsOptionsQueryHookResult = ReturnType<typeof useClientsOptionsQuery>;
export type ClientsOptionsLazyQueryHookResult = ReturnType<typeof useClientsOptionsLazyQuery>;
export type ClientsOptionsQueryResult = Apollo.QueryResult<ClientsOptionsQuery, ClientsOptionsQueryVariables>;
export const PositionsDocument = gql`
    query Positions {
  positions {
    id
    name
  }
}
    `;

/**
 * __usePositionsQuery__
 *
 * To run a query within a React component, call `usePositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePositionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePositionsQuery(baseOptions?: Apollo.QueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
      }
export function usePositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PositionsQuery, PositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PositionsQuery, PositionsQueryVariables>(PositionsDocument, options);
        }
export type PositionsQueryHookResult = ReturnType<typeof usePositionsQuery>;
export type PositionsLazyQueryHookResult = ReturnType<typeof usePositionsLazyQuery>;
export type PositionsQueryResult = Apollo.QueryResult<PositionsQuery, PositionsQueryVariables>;
export const RemoveClientContactDocument = gql`
    mutation RemoveClientContact($removeClientContactId: ID!) {
  removeClientContact(id: $removeClientContactId) {
    id
    name
  }
}
    `;
export type RemoveClientContactMutationFn = Apollo.MutationFunction<RemoveClientContactMutation, RemoveClientContactMutationVariables>;

/**
 * __useRemoveClientContactMutation__
 *
 * To run a mutation, you first call `useRemoveClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeClientContactMutation, { data, loading, error }] = useRemoveClientContactMutation({
 *   variables: {
 *      removeClientContactId: // value for 'removeClientContactId'
 *   },
 * });
 */
export function useRemoveClientContactMutation(baseOptions?: Apollo.MutationHookOptions<RemoveClientContactMutation, RemoveClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveClientContactMutation, RemoveClientContactMutationVariables>(RemoveClientContactDocument, options);
      }
export type RemoveClientContactMutationHookResult = ReturnType<typeof useRemoveClientContactMutation>;
export type RemoveClientContactMutationResult = Apollo.MutationResult<RemoveClientContactMutation>;
export type RemoveClientContactMutationOptions = Apollo.BaseMutationOptions<RemoveClientContactMutation, RemoveClientContactMutationVariables>;
export const UpdateClientContactDocument = gql`
    mutation UpdateClientContact($updateInput: UpdateClientContactInput!) {
  updateClientContact(updateInput: $updateInput) {
    id
    name
  }
}
    `;
export type UpdateClientContactMutationFn = Apollo.MutationFunction<UpdateClientContactMutation, UpdateClientContactMutationVariables>;

/**
 * __useUpdateClientContactMutation__
 *
 * To run a mutation, you first call `useUpdateClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientContactMutation, { data, loading, error }] = useUpdateClientContactMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateClientContactMutation(baseOptions?: Apollo.MutationHookOptions<UpdateClientContactMutation, UpdateClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateClientContactMutation, UpdateClientContactMutationVariables>(UpdateClientContactDocument, options);
      }
export type UpdateClientContactMutationHookResult = ReturnType<typeof useUpdateClientContactMutation>;
export type UpdateClientContactMutationResult = Apollo.MutationResult<UpdateClientContactMutation>;
export type UpdateClientContactMutationOptions = Apollo.BaseMutationOptions<UpdateClientContactMutation, UpdateClientContactMutationVariables>;
export const CreateClientContactDocument = gql`
    mutation CreateClientContact($createInput: CreateClientContactInput!) {
  createClientContact(createInput: $createInput) {
    id
    name
  }
}
    `;
export type CreateClientContactMutationFn = Apollo.MutationFunction<CreateClientContactMutation, CreateClientContactMutationVariables>;

/**
 * __useCreateClientContactMutation__
 *
 * To run a mutation, you first call `useCreateClientContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientContactMutation, { data, loading, error }] = useCreateClientContactMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateClientContactMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientContactMutation, CreateClientContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientContactMutation, CreateClientContactMutationVariables>(CreateClientContactDocument, options);
      }
export type CreateClientContactMutationHookResult = ReturnType<typeof useCreateClientContactMutation>;
export type CreateClientContactMutationResult = Apollo.MutationResult<CreateClientContactMutation>;
export type CreateClientContactMutationOptions = Apollo.BaseMutationOptions<CreateClientContactMutation, CreateClientContactMutationVariables>;
export const CotizacionesDocument = gql`
    query Cotizaciones($orderBy: [FindCotizacionOrderBy!], $where: FindCotizacionWhere, $pagination: Pagination) {
  cotizaciones(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    numeroCotizacion
    fecha
    nombreCliente
    nombreVendedor
    vendedor
    ciudadCliente
    emailCliente
    nitCliente
    valor
  }
  cotizacionesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useCotizacionesQuery__
 *
 * To run a query within a React component, call `useCotizacionesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCotizacionesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCotizacionesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useCotizacionesQuery(baseOptions?: Apollo.QueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
      }
export function useCotizacionesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CotizacionesQuery, CotizacionesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CotizacionesQuery, CotizacionesQueryVariables>(CotizacionesDocument, options);
        }
export type CotizacionesQueryHookResult = ReturnType<typeof useCotizacionesQuery>;
export type CotizacionesLazyQueryHookResult = ReturnType<typeof useCotizacionesLazyQuery>;
export type CotizacionesQueryResult = Apollo.QueryResult<CotizacionesQuery, CotizacionesQueryVariables>;
export const FindSeachCotizacionDocument = gql`
    query findSeachCotizacion($cotizacionSeachInput: CotizacionSeachInput!) {
  findSeachCotizacion(cotizacionSeachInput: $cotizacionSeachInput)
}
    `;

/**
 * __useFindSeachCotizacionQuery__
 *
 * To run a query within a React component, call `useFindSeachCotizacionQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindSeachCotizacionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindSeachCotizacionQuery({
 *   variables: {
 *      cotizacionSeachInput: // value for 'cotizacionSeachInput'
 *   },
 * });
 */
export function useFindSeachCotizacionQuery(baseOptions: Apollo.QueryHookOptions<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>(FindSeachCotizacionDocument, options);
      }
export function useFindSeachCotizacionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>(FindSeachCotizacionDocument, options);
        }
export type FindSeachCotizacionQueryHookResult = ReturnType<typeof useFindSeachCotizacionQuery>;
export type FindSeachCotizacionLazyQueryHookResult = ReturnType<typeof useFindSeachCotizacionLazyQuery>;
export type FindSeachCotizacionQueryResult = Apollo.QueryResult<FindSeachCotizacionQuery, FindSeachCotizacionQueryVariables>;
export const CotizacionDocument = gql`
    query Cotizacion($cotizacionId: ID!) {
  cotizacion(id: $cotizacionId) {
    id
    createdAt
    updatedAt
    deletedAt
    numeroCotizacion
    fecha
    nombreCliente
    nombreVendedor
    vendedor
    ciudadCliente
    emailCliente
    nitCliente
    valor
    descripcion
    status
    proyecto {
      name
      status
      description
      value
      id
    }
    detalle {
      id
      createdAt
      updatedAt
      deletedAt
      referencia
      descripcion
      unidadMedida
      cantidad
      valorCosto
      valorVenta
      total
      uuid
    }
  }
}
    `;

/**
 * __useCotizacionQuery__
 *
 * To run a query within a React component, call `useCotizacionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCotizacionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCotizacionQuery({
 *   variables: {
 *      cotizacionId: // value for 'cotizacionId'
 *   },
 * });
 */
export function useCotizacionQuery(baseOptions: Apollo.QueryHookOptions<CotizacionQuery, CotizacionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CotizacionQuery, CotizacionQueryVariables>(CotizacionDocument, options);
      }
export function useCotizacionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CotizacionQuery, CotizacionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CotizacionQuery, CotizacionQueryVariables>(CotizacionDocument, options);
        }
export type CotizacionQueryHookResult = ReturnType<typeof useCotizacionQuery>;
export type CotizacionLazyQueryHookResult = ReturnType<typeof useCotizacionLazyQuery>;
export type CotizacionQueryResult = Apollo.QueryResult<CotizacionQuery, CotizacionQueryVariables>;
export const SaveDetalleCotizacionDocument = gql`
    mutation SaveDetalleCotizacion($saveDetalleCotizacionId: String!) {
  saveDetalleCotizacion(id: $saveDetalleCotizacionId)
}
    `;
export type SaveDetalleCotizacionMutationFn = Apollo.MutationFunction<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>;

/**
 * __useSaveDetalleCotizacionMutation__
 *
 * To run a mutation, you first call `useSaveDetalleCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveDetalleCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveDetalleCotizacionMutation, { data, loading, error }] = useSaveDetalleCotizacionMutation({
 *   variables: {
 *      saveDetalleCotizacionId: // value for 'saveDetalleCotizacionId'
 *   },
 * });
 */
export function useSaveDetalleCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>(SaveDetalleCotizacionDocument, options);
      }
export type SaveDetalleCotizacionMutationHookResult = ReturnType<typeof useSaveDetalleCotizacionMutation>;
export type SaveDetalleCotizacionMutationResult = Apollo.MutationResult<SaveDetalleCotizacionMutation>;
export type SaveDetalleCotizacionMutationOptions = Apollo.BaseMutationOptions<SaveDetalleCotizacionMutation, SaveDetalleCotizacionMutationVariables>;
export const UpdateCotizacionDocument = gql`
    mutation UpdateCotizacion($updateInput: UpdateCotizacionInput!) {
  updateCotizacion(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateCotizacionMutationFn = Apollo.MutationFunction<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;

/**
 * __useUpdateCotizacionMutation__
 *
 * To run a mutation, you first call `useUpdateCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCotizacionMutation, { data, loading, error }] = useUpdateCotizacionMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>(UpdateCotizacionDocument, options);
      }
export type UpdateCotizacionMutationHookResult = ReturnType<typeof useUpdateCotizacionMutation>;
export type UpdateCotizacionMutationResult = Apollo.MutationResult<UpdateCotizacionMutation>;
export type UpdateCotizacionMutationOptions = Apollo.BaseMutationOptions<UpdateCotizacionMutation, UpdateCotizacionMutationVariables>;
export const UpdateDetalleCotizacionDocument = gql`
    mutation UpdateDetalleCotizacion($updateInput: UpdateCotizacionDetalleInput!) {
  updateDetalleCotizacion(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateDetalleCotizacionMutationFn = Apollo.MutationFunction<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>;

/**
 * __useUpdateDetalleCotizacionMutation__
 *
 * To run a mutation, you first call `useUpdateDetalleCotizacionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDetalleCotizacionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDetalleCotizacionMutation, { data, loading, error }] = useUpdateDetalleCotizacionMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateDetalleCotizacionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>(UpdateDetalleCotizacionDocument, options);
      }
export type UpdateDetalleCotizacionMutationHookResult = ReturnType<typeof useUpdateDetalleCotizacionMutation>;
export type UpdateDetalleCotizacionMutationResult = Apollo.MutationResult<UpdateDetalleCotizacionMutation>;
export type UpdateDetalleCotizacionMutationOptions = Apollo.BaseMutationOptions<UpdateDetalleCotizacionMutation, UpdateDetalleCotizacionMutationVariables>;
export const FindAllFacturaClienteDocument = gql`
    query FindAllFacturaCliente($input: FacturaPorClienteDto!) {
  findAllFacturaCliente(input: $input) {
    numberDocument
    description
    valueFlete
    oip
    backComision
    numberGuia
    carrier
    carrierCell
    contactClient
    TEM_CEDULA
    TEM_NOMCLI
    TEM_FECHA
    TEM_TIPMOV
    TEM_PREFIJ
    TEM_NUMDOC
    TEM_VENDED
    TEM_VENTA
    TEM_VALCOS
    TEM_UTILIDAD
    TEM_PORCENTAJE_UTILIDAD
    CL_DEPART
    CLI_CIUDAD
  }
}
    `;

/**
 * __useFindAllFacturaClienteQuery__
 *
 * To run a query within a React component, call `useFindAllFacturaClienteQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllFacturaClienteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllFacturaClienteQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindAllFacturaClienteQuery(baseOptions: Apollo.QueryHookOptions<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>(FindAllFacturaClienteDocument, options);
      }
export function useFindAllFacturaClienteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>(FindAllFacturaClienteDocument, options);
        }
export type FindAllFacturaClienteQueryHookResult = ReturnType<typeof useFindAllFacturaClienteQuery>;
export type FindAllFacturaClienteLazyQueryHookResult = ReturnType<typeof useFindAllFacturaClienteLazyQuery>;
export type FindAllFacturaClienteQueryResult = Apollo.QueryResult<FindAllFacturaClienteQuery, FindAllFacturaClienteQueryVariables>;
export const FindOneFacturaClienteByCodeDocument = gql`
    query FindOneFacturaClienteByCode($code: String!) {
  findOneFacturaClienteByCode(code: $code) {
    isFound
    flete {
      id
      createdAt
      updatedAt
      deletedAt
      numberDocument
      description
      valueFlete
      oip
      backComision
      numberGuia
      carrier
      carrierCell
      contactClient
    }
  }
}
    `;

/**
 * __useFindOneFacturaClienteByCodeQuery__
 *
 * To run a query within a React component, call `useFindOneFacturaClienteByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneFacturaClienteByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneFacturaClienteByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useFindOneFacturaClienteByCodeQuery(baseOptions: Apollo.QueryHookOptions<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>(FindOneFacturaClienteByCodeDocument, options);
      }
export function useFindOneFacturaClienteByCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>(FindOneFacturaClienteByCodeDocument, options);
        }
export type FindOneFacturaClienteByCodeQueryHookResult = ReturnType<typeof useFindOneFacturaClienteByCodeQuery>;
export type FindOneFacturaClienteByCodeLazyQueryHookResult = ReturnType<typeof useFindOneFacturaClienteByCodeLazyQuery>;
export type FindOneFacturaClienteByCodeQueryResult = Apollo.QueryResult<FindOneFacturaClienteByCodeQuery, FindOneFacturaClienteByCodeQueryVariables>;
export const CreateFletesDocument = gql`
    mutation CreateFletes($createInput: CreateFletesInput!) {
  createFletes(createInput: $createInput) {
    id
  }
}
    `;
export type CreateFletesMutationFn = Apollo.MutationFunction<CreateFletesMutation, CreateFletesMutationVariables>;

/**
 * __useCreateFletesMutation__
 *
 * To run a mutation, you first call `useCreateFletesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFletesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFletesMutation, { data, loading, error }] = useCreateFletesMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateFletesMutation(baseOptions?: Apollo.MutationHookOptions<CreateFletesMutation, CreateFletesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFletesMutation, CreateFletesMutationVariables>(CreateFletesDocument, options);
      }
export type CreateFletesMutationHookResult = ReturnType<typeof useCreateFletesMutation>;
export type CreateFletesMutationResult = Apollo.MutationResult<CreateFletesMutation>;
export type CreateFletesMutationOptions = Apollo.BaseMutationOptions<CreateFletesMutation, CreateFletesMutationVariables>;
export const UpdateFletesDocument = gql`
    mutation UpdateFletes($updateInput: UpdateFletesInput!) {
  updateFletes(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateFletesMutationFn = Apollo.MutationFunction<UpdateFletesMutation, UpdateFletesMutationVariables>;

/**
 * __useUpdateFletesMutation__
 *
 * To run a mutation, you first call `useUpdateFletesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFletesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFletesMutation, { data, loading, error }] = useUpdateFletesMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateFletesMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFletesMutation, UpdateFletesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFletesMutation, UpdateFletesMutationVariables>(UpdateFletesDocument, options);
      }
export type UpdateFletesMutationHookResult = ReturnType<typeof useUpdateFletesMutation>;
export type UpdateFletesMutationResult = Apollo.MutationResult<UpdateFletesMutation>;
export type UpdateFletesMutationOptions = Apollo.BaseMutationOptions<UpdateFletesMutation, UpdateFletesMutationVariables>;
export const FindUtilidadRealDocument = gql`
    query FindUtilidadReal($input: findUtilidadRealInput!) {
  findUtilidadReal(input: $input) {
    trabajadores {
      number_document
      nombre
      venta
      costo
      flete
      comision
      oip
      utilidadReal
      utilidadPorcentaje
      utilidad
      porcentaje
      totalVendido
      presupuesto
    }
    grupo {
      utilidad
      utilidad_porcentaje
    }
  }
}
    `;

/**
 * __useFindUtilidadRealQuery__
 *
 * To run a query within a React component, call `useFindUtilidadRealQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUtilidadRealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUtilidadRealQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useFindUtilidadRealQuery(baseOptions: Apollo.QueryHookOptions<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>(FindUtilidadRealDocument, options);
      }
export function useFindUtilidadRealLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>(FindUtilidadRealDocument, options);
        }
export type FindUtilidadRealQueryHookResult = ReturnType<typeof useFindUtilidadRealQuery>;
export type FindUtilidadRealLazyQueryHookResult = ReturnType<typeof useFindUtilidadRealLazyQuery>;
export type FindUtilidadRealQueryResult = Apollo.QueryResult<FindUtilidadRealQuery, FindUtilidadRealQueryVariables>;
export const DepartmentsDocument = gql`
    query Departments {
  departments {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
  }
}
    `;

/**
 * __useDepartmentsQuery__
 *
 * To run a query within a React component, call `useDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
      }
export function useDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DepartmentsQuery, DepartmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DepartmentsQuery, DepartmentsQueryVariables>(DepartmentsDocument, options);
        }
export type DepartmentsQueryHookResult = ReturnType<typeof useDepartmentsQuery>;
export type DepartmentsLazyQueryHookResult = ReturnType<typeof useDepartmentsLazyQuery>;
export type DepartmentsQueryResult = Apollo.QueryResult<DepartmentsQuery, DepartmentsQueryVariables>;
export const CitiesDocument = gql`
    query Cities($departmentId: ID) {
  cities(departmentId: $departmentId) {
    id
    createdAt
    updatedAt
    deletedAt
    code
    name
    department {
      code
      createdAt
      deletedAt
      id
      name
      updatedAt
    }
  }
}
    `;

/**
 * __useCitiesQuery__
 *
 * To run a query within a React component, call `useCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCitiesQuery({
 *   variables: {
 *      departmentId: // value for 'departmentId'
 *   },
 * });
 */
export function useCitiesQuery(baseOptions?: Apollo.QueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
      }
export function useCitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CitiesQuery, CitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CitiesQuery, CitiesQueryVariables>(CitiesDocument, options);
        }
export type CitiesQueryHookResult = ReturnType<typeof useCitiesQuery>;
export type CitiesLazyQueryHookResult = ReturnType<typeof useCitiesLazyQuery>;
export type CitiesQueryResult = Apollo.QueryResult<CitiesQuery, CitiesQueryVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($password: String!) {
  resetPassword(password: $password) {
    email
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SendEmailRecovryPasswordDocument = gql`
    query sendEmailRecovryPassword($email: String!) {
  sendEmailRecovryPassword(email: $email)
}
    `;

/**
 * __useSendEmailRecovryPasswordQuery__
 *
 * To run a query within a React component, call `useSendEmailRecovryPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useSendEmailRecovryPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendEmailRecovryPasswordQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendEmailRecovryPasswordQuery(baseOptions: Apollo.QueryHookOptions<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>(SendEmailRecovryPasswordDocument, options);
      }
export function useSendEmailRecovryPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>(SendEmailRecovryPasswordDocument, options);
        }
export type SendEmailRecovryPasswordQueryHookResult = ReturnType<typeof useSendEmailRecovryPasswordQuery>;
export type SendEmailRecovryPasswordLazyQueryHookResult = ReturnType<typeof useSendEmailRecovryPasswordLazyQuery>;
export type SendEmailRecovryPasswordQueryResult = Apollo.QueryResult<SendEmailRecovryPasswordQuery, SendEmailRecovryPasswordQueryVariables>;
export const ParametersDocument = gql`
    query Parameters($pagination: Pagination) {
  parameters(pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    codigo
    descripcion
    type
    valueInt
    valueString
    valueDate
    valueFile {
      id
      url
      fileMongoId
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
    }
  }
  parametersCount(pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useParametersQuery__
 *
 * To run a query within a React component, call `useParametersQuery` and pass it any options that fit your needs.
 * When your component renders, `useParametersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useParametersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useParametersQuery(baseOptions?: Apollo.QueryHookOptions<ParametersQuery, ParametersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParametersQuery, ParametersQueryVariables>(ParametersDocument, options);
      }
export function useParametersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParametersQuery, ParametersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParametersQuery, ParametersQueryVariables>(ParametersDocument, options);
        }
export type ParametersQueryHookResult = ReturnType<typeof useParametersQuery>;
export type ParametersLazyQueryHookResult = ReturnType<typeof useParametersLazyQuery>;
export type ParametersQueryResult = Apollo.QueryResult<ParametersQuery, ParametersQueryVariables>;
export const RemoveParameterDocument = gql`
    mutation RemoveParameter($removeParameterId: ID!) {
  removeParameter(id: $removeParameterId) {
    id
    name
    type
    descripcion
  }
}
    `;
export type RemoveParameterMutationFn = Apollo.MutationFunction<RemoveParameterMutation, RemoveParameterMutationVariables>;

/**
 * __useRemoveParameterMutation__
 *
 * To run a mutation, you first call `useRemoveParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeParameterMutation, { data, loading, error }] = useRemoveParameterMutation({
 *   variables: {
 *      removeParameterId: // value for 'removeParameterId'
 *   },
 * });
 */
export function useRemoveParameterMutation(baseOptions?: Apollo.MutationHookOptions<RemoveParameterMutation, RemoveParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveParameterMutation, RemoveParameterMutationVariables>(RemoveParameterDocument, options);
      }
export type RemoveParameterMutationHookResult = ReturnType<typeof useRemoveParameterMutation>;
export type RemoveParameterMutationResult = Apollo.MutationResult<RemoveParameterMutation>;
export type RemoveParameterMutationOptions = Apollo.BaseMutationOptions<RemoveParameterMutation, RemoveParameterMutationVariables>;
export const UpdateParameterDocument = gql`
    mutation UpdateParameter($updateInput: UpdateParametersInput!) {
  updateParameter(updateInput: $updateInput) {
    id
    name
    descripcion
  }
}
    `;
export type UpdateParameterMutationFn = Apollo.MutationFunction<UpdateParameterMutation, UpdateParameterMutationVariables>;

/**
 * __useUpdateParameterMutation__
 *
 * To run a mutation, you first call `useUpdateParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateParameterMutation, { data, loading, error }] = useUpdateParameterMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateParameterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateParameterMutation, UpdateParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateParameterMutation, UpdateParameterMutationVariables>(UpdateParameterDocument, options);
      }
export type UpdateParameterMutationHookResult = ReturnType<typeof useUpdateParameterMutation>;
export type UpdateParameterMutationResult = Apollo.MutationResult<UpdateParameterMutation>;
export type UpdateParameterMutationOptions = Apollo.BaseMutationOptions<UpdateParameterMutation, UpdateParameterMutationVariables>;
export const CreateParameterDocument = gql`
    mutation CreateParameter($createInput: CreateParametersInput!) {
  createParameter(createInput: $createInput) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    codigo
    descripcion
    type
    valueInt
    valueString
    valueDate
    valueFile {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      url
    }
  }
}
    `;
export type CreateParameterMutationFn = Apollo.MutationFunction<CreateParameterMutation, CreateParameterMutationVariables>;

/**
 * __useCreateParameterMutation__
 *
 * To run a mutation, you first call `useCreateParameterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateParameterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createParameterMutation, { data, loading, error }] = useCreateParameterMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateParameterMutation(baseOptions?: Apollo.MutationHookOptions<CreateParameterMutation, CreateParameterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateParameterMutation, CreateParameterMutationVariables>(CreateParameterDocument, options);
      }
export type CreateParameterMutationHookResult = ReturnType<typeof useCreateParameterMutation>;
export type CreateParameterMutationResult = Apollo.MutationResult<CreateParameterMutation>;
export type CreateParameterMutationOptions = Apollo.BaseMutationOptions<CreateParameterMutation, CreateParameterMutationVariables>;
export const CrearConceptoDocument = gql`
    mutation CrearConcepto($data: CrearConceptoDto!) {
  crearConcepto(data: $data) {
    id
    nombre
    esSuma
    editable
    valores
  }
}
    `;
export type CrearConceptoMutationFn = Apollo.MutationFunction<CrearConceptoMutation, CrearConceptoMutationVariables>;

/**
 * __useCrearConceptoMutation__
 *
 * To run a mutation, you first call `useCrearConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCrearConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [crearConceptoMutation, { data, loading, error }] = useCrearConceptoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCrearConceptoMutation(baseOptions?: Apollo.MutationHookOptions<CrearConceptoMutation, CrearConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CrearConceptoMutation, CrearConceptoMutationVariables>(CrearConceptoDocument, options);
      }
export type CrearConceptoMutationHookResult = ReturnType<typeof useCrearConceptoMutation>;
export type CrearConceptoMutationResult = Apollo.MutationResult<CrearConceptoMutation>;
export type CrearConceptoMutationOptions = Apollo.BaseMutationOptions<CrearConceptoMutation, CrearConceptoMutationVariables>;
export const UpdateConceptoDocument = gql`
    mutation UpdateConcepto($actualizarConceptoDto: ActualizarConceptoDto!) {
  updateConcepto(actualizarConceptoDto: $actualizarConceptoDto) {
    id
    nombre
    esSuma
    editable
    valores
  }
}
    `;
export type UpdateConceptoMutationFn = Apollo.MutationFunction<UpdateConceptoMutation, UpdateConceptoMutationVariables>;

/**
 * __useUpdateConceptoMutation__
 *
 * To run a mutation, you first call `useUpdateConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateConceptoMutation, { data, loading, error }] = useUpdateConceptoMutation({
 *   variables: {
 *      actualizarConceptoDto: // value for 'actualizarConceptoDto'
 *   },
 * });
 */
export function useUpdateConceptoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateConceptoMutation, UpdateConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateConceptoMutation, UpdateConceptoMutationVariables>(UpdateConceptoDocument, options);
      }
export type UpdateConceptoMutationHookResult = ReturnType<typeof useUpdateConceptoMutation>;
export type UpdateConceptoMutationResult = Apollo.MutationResult<UpdateConceptoMutation>;
export type UpdateConceptoMutationOptions = Apollo.BaseMutationOptions<UpdateConceptoMutation, UpdateConceptoMutationVariables>;
export const EliminarConceptoDocument = gql`
    mutation EliminarConcepto($eliminarConceptoDto: String!) {
  eliminarConcepto(eliminarConceptoDto: $eliminarConceptoDto)
}
    `;
export type EliminarConceptoMutationFn = Apollo.MutationFunction<EliminarConceptoMutation, EliminarConceptoMutationVariables>;

/**
 * __useEliminarConceptoMutation__
 *
 * To run a mutation, you first call `useEliminarConceptoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEliminarConceptoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eliminarConceptoMutation, { data, loading, error }] = useEliminarConceptoMutation({
 *   variables: {
 *      eliminarConceptoDto: // value for 'eliminarConceptoDto'
 *   },
 * });
 */
export function useEliminarConceptoMutation(baseOptions?: Apollo.MutationHookOptions<EliminarConceptoMutation, EliminarConceptoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EliminarConceptoMutation, EliminarConceptoMutationVariables>(EliminarConceptoDocument, options);
      }
export type EliminarConceptoMutationHookResult = ReturnType<typeof useEliminarConceptoMutation>;
export type EliminarConceptoMutationResult = Apollo.MutationResult<EliminarConceptoMutation>;
export type EliminarConceptoMutationOptions = Apollo.BaseMutationOptions<EliminarConceptoMutation, EliminarConceptoMutationVariables>;
export const CreatePresupuestoDocument = gql`
    mutation CreatePresupuesto($createInput: CreatePresupuestoInput!) {
  createPresupuesto(createInput: $createInput) {
    id
  }
}
    `;
export type CreatePresupuestoMutationFn = Apollo.MutationFunction<CreatePresupuestoMutation, CreatePresupuestoMutationVariables>;

/**
 * __useCreatePresupuestoMutation__
 *
 * To run a mutation, you first call `useCreatePresupuestoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePresupuestoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPresupuestoMutation, { data, loading, error }] = useCreatePresupuestoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreatePresupuestoMutation(baseOptions?: Apollo.MutationHookOptions<CreatePresupuestoMutation, CreatePresupuestoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePresupuestoMutation, CreatePresupuestoMutationVariables>(CreatePresupuestoDocument, options);
      }
export type CreatePresupuestoMutationHookResult = ReturnType<typeof useCreatePresupuestoMutation>;
export type CreatePresupuestoMutationResult = Apollo.MutationResult<CreatePresupuestoMutation>;
export type CreatePresupuestoMutationOptions = Apollo.BaseMutationOptions<CreatePresupuestoMutation, CreatePresupuestoMutationVariables>;
export const RemovePresupuestoDocument = gql`
    mutation RemovePresupuesto($removePresupuestoId: ID!) {
  removePresupuesto(id: $removePresupuestoId) {
    id
  }
}
    `;
export type RemovePresupuestoMutationFn = Apollo.MutationFunction<RemovePresupuestoMutation, RemovePresupuestoMutationVariables>;

/**
 * __useRemovePresupuestoMutation__
 *
 * To run a mutation, you first call `useRemovePresupuestoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePresupuestoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePresupuestoMutation, { data, loading, error }] = useRemovePresupuestoMutation({
 *   variables: {
 *      removePresupuestoId: // value for 'removePresupuestoId'
 *   },
 * });
 */
export function useRemovePresupuestoMutation(baseOptions?: Apollo.MutationHookOptions<RemovePresupuestoMutation, RemovePresupuestoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePresupuestoMutation, RemovePresupuestoMutationVariables>(RemovePresupuestoDocument, options);
      }
export type RemovePresupuestoMutationHookResult = ReturnType<typeof useRemovePresupuestoMutation>;
export type RemovePresupuestoMutationResult = Apollo.MutationResult<RemovePresupuestoMutation>;
export type RemovePresupuestoMutationOptions = Apollo.BaseMutationOptions<RemovePresupuestoMutation, RemovePresupuestoMutationVariables>;
export const PresupuestosDocument = gql`
    query Presupuestos($orderBy: [FindPresupuestoOrderBy!], $where: FindPresupuestoWhere, $pagination: Pagination) {
  presupuestos(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    valor
    ano
    mes
    worker {
      email
      identificationType
      identificationNumber
      fullName
    }
  }
  presupuestosCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __usePresupuestosQuery__
 *
 * To run a query within a React component, call `usePresupuestosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresupuestosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresupuestosQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function usePresupuestosQuery(baseOptions?: Apollo.QueryHookOptions<PresupuestosQuery, PresupuestosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PresupuestosQuery, PresupuestosQueryVariables>(PresupuestosDocument, options);
      }
export function usePresupuestosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PresupuestosQuery, PresupuestosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PresupuestosQuery, PresupuestosQueryVariables>(PresupuestosDocument, options);
        }
export type PresupuestosQueryHookResult = ReturnType<typeof usePresupuestosQuery>;
export type PresupuestosLazyQueryHookResult = ReturnType<typeof usePresupuestosLazyQuery>;
export type PresupuestosQueryResult = Apollo.QueryResult<PresupuestosQuery, PresupuestosQueryVariables>;
export const CreateAllPresupuestoToMonthDocument = gql`
    mutation CreateAllPresupuestoToMonth {
  createAllPresupuestoToMonth
}
    `;
export type CreateAllPresupuestoToMonthMutationFn = Apollo.MutationFunction<CreateAllPresupuestoToMonthMutation, CreateAllPresupuestoToMonthMutationVariables>;

/**
 * __useCreateAllPresupuestoToMonthMutation__
 *
 * To run a mutation, you first call `useCreateAllPresupuestoToMonthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAllPresupuestoToMonthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAllPresupuestoToMonthMutation, { data, loading, error }] = useCreateAllPresupuestoToMonthMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateAllPresupuestoToMonthMutation(baseOptions?: Apollo.MutationHookOptions<CreateAllPresupuestoToMonthMutation, CreateAllPresupuestoToMonthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAllPresupuestoToMonthMutation, CreateAllPresupuestoToMonthMutationVariables>(CreateAllPresupuestoToMonthDocument, options);
      }
export type CreateAllPresupuestoToMonthMutationHookResult = ReturnType<typeof useCreateAllPresupuestoToMonthMutation>;
export type CreateAllPresupuestoToMonthMutationResult = Apollo.MutationResult<CreateAllPresupuestoToMonthMutation>;
export type CreateAllPresupuestoToMonthMutationOptions = Apollo.BaseMutationOptions<CreateAllPresupuestoToMonthMutation, CreateAllPresupuestoToMonthMutationVariables>;
export const CreateProyectoDocument = gql`
    mutation CreateProyecto($createInput: CreateProyectosInput!) {
  createProyecto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectoMutationFn = Apollo.MutationFunction<CreateProyectoMutation, CreateProyectoMutationVariables>;

/**
 * __useCreateProyectoMutation__
 *
 * To run a mutation, you first call `useCreateProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectoMutation, { data, loading, error }] = useCreateProyectoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectoMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectoMutation, CreateProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectoMutation, CreateProyectoMutationVariables>(CreateProyectoDocument, options);
      }
export type CreateProyectoMutationHookResult = ReturnType<typeof useCreateProyectoMutation>;
export type CreateProyectoMutationResult = Apollo.MutationResult<CreateProyectoMutation>;
export type CreateProyectoMutationOptions = Apollo.BaseMutationOptions<CreateProyectoMutation, CreateProyectoMutationVariables>;
export const ProyectosDocument = gql`
    query Proyectos($pagination: Pagination, $where: FindProyectoWhere, $orderBy: [FindProyectoOrderBy!]) {
  proyectos(pagination: $pagination, where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    value
    status
    dateExpiration
    description
    clientIntegrador {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      user {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
    }
    clientFinal {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
    }
    worker {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      manager {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      subordinates {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          valueTransport
          typeWoker
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
    createdByUser {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
  }
  proyectosCount(pagination: $pagination, where: $where, orderBy: $orderBy) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useProyectosQuery__
 *
 * To run a query within a React component, call `useProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectosQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProyectosQuery(baseOptions?: Apollo.QueryHookOptions<ProyectosQuery, ProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectosQuery, ProyectosQueryVariables>(ProyectosDocument, options);
      }
export function useProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectosQuery, ProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectosQuery, ProyectosQueryVariables>(ProyectosDocument, options);
        }
export type ProyectosQueryHookResult = ReturnType<typeof useProyectosQuery>;
export type ProyectosLazyQueryHookResult = ReturnType<typeof useProyectosLazyQuery>;
export type ProyectosQueryResult = Apollo.QueryResult<ProyectosQuery, ProyectosQueryVariables>;
export const UpdateProyectoDocument = gql`
    mutation UpdateProyecto($updateInput: UpdatePryectosInput!) {
  updateProyecto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProyectoMutationFn = Apollo.MutationFunction<UpdateProyectoMutation, UpdateProyectoMutationVariables>;

/**
 * __useUpdateProyectoMutation__
 *
 * To run a mutation, you first call `useUpdateProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProyectoMutation, { data, loading, error }] = useUpdateProyectoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProyectoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProyectoMutation, UpdateProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProyectoMutation, UpdateProyectoMutationVariables>(UpdateProyectoDocument, options);
      }
export type UpdateProyectoMutationHookResult = ReturnType<typeof useUpdateProyectoMutation>;
export type UpdateProyectoMutationResult = Apollo.MutationResult<UpdateProyectoMutation>;
export type UpdateProyectoMutationOptions = Apollo.BaseMutationOptions<UpdateProyectoMutation, UpdateProyectoMutationVariables>;
export const ProyectoDocument = gql`
    query Proyecto($proyectoId: ID!) {
  proyecto(id: $proyectoId) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    value
    status
    dateExpiration
    description
    clientIntegrador {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      user {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
    }
    clientFinal {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      descripcion
      type
      vertical
      celular
    }
    worker {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      manager {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      subordinates {
        id
        createdAt
        updatedAt
        deletedAt
        name
        middleName
        lastName
        secondSurname
        email
        identificationType
        identificationNumber
        dateIssue
        legalRepresentativeIdentificationType
        legalRepresentativeIdentificationNumber
        phoneCountryCode
        phoneNumber
        address
        hasRural
        confirmationCode
        position
        valueTransport
        typeWoker
        status
        phoneVerification
        emailVerification
        type
        fullName
      }
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          valueTransport
          typeWoker
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
    createdByUser {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      valueTransport
      typeWoker
      status
      phoneVerification
      emailVerification
      type
      fullName
    }
    city {
      id
      createdAt
      updatedAt
      deletedAt
      code
      name
    }
    referencias {
      id
      createdAt
      updatedAt
      deletedAt
      observacion
      valor
      tipoProyecto {
        id
        createdAt
        updatedAt
        deletedAt
        nombre
        descripcion
        isActive
      }
      marca {
        id
        createdAt
        updatedAt
        deletedAt
        nombre
        isActive
      }
      referencia {
        id
        createdAt
        updatedAt
        deletedAt
        codigo
        descripcion
        isActive
      }
    }
  }
}
    `;

/**
 * __useProyectoQuery__
 *
 * To run a query within a React component, call `useProyectoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectoQuery({
 *   variables: {
 *      proyectoId: // value for 'proyectoId'
 *   },
 * });
 */
export function useProyectoQuery(baseOptions: Apollo.QueryHookOptions<ProyectoQuery, ProyectoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectoQuery, ProyectoQueryVariables>(ProyectoDocument, options);
      }
export function useProyectoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectoQuery, ProyectoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectoQuery, ProyectoQueryVariables>(ProyectoDocument, options);
        }
export type ProyectoQueryHookResult = ReturnType<typeof useProyectoQuery>;
export type ProyectoLazyQueryHookResult = ReturnType<typeof useProyectoLazyQuery>;
export type ProyectoQueryResult = Apollo.QueryResult<ProyectoQuery, ProyectoQueryVariables>;
export const CreateProyectCommentDocument = gql`
    mutation CreateProyectComment($createInput: CreateProyectCommentInput!) {
  createProyectComment(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectCommentMutationFn = Apollo.MutationFunction<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>;

/**
 * __useCreateProyectCommentMutation__
 *
 * To run a mutation, you first call `useCreateProyectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectCommentMutation, { data, loading, error }] = useCreateProyectCommentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>(CreateProyectCommentDocument, options);
      }
export type CreateProyectCommentMutationHookResult = ReturnType<typeof useCreateProyectCommentMutation>;
export type CreateProyectCommentMutationResult = Apollo.MutationResult<CreateProyectCommentMutation>;
export type CreateProyectCommentMutationOptions = Apollo.BaseMutationOptions<CreateProyectCommentMutation, CreateProyectCommentMutationVariables>;
export const UpdateProyectCommentDocument = gql`
    mutation UpdateProyectComment($updateInput: UpdateProyectCoomentInput!) {
  updateProyectComment(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateProyectCommentMutationFn = Apollo.MutationFunction<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>;

/**
 * __useUpdateProyectCommentMutation__
 *
 * To run a mutation, you first call `useUpdateProyectCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProyectCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProyectCommentMutation, { data, loading, error }] = useUpdateProyectCommentMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateProyectCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>(UpdateProyectCommentDocument, options);
      }
export type UpdateProyectCommentMutationHookResult = ReturnType<typeof useUpdateProyectCommentMutation>;
export type UpdateProyectCommentMutationResult = Apollo.MutationResult<UpdateProyectCommentMutation>;
export type UpdateProyectCommentMutationOptions = Apollo.BaseMutationOptions<UpdateProyectCommentMutation, UpdateProyectCommentMutationVariables>;
export const ProyectCommentsDocument = gql`
    query ProyectComments($where: FindProyectCommentTypeWhere, $orderBy: [FindProyectCommentTypeOrderBy!]) {
  proyectComments(where: $where, orderBy: $orderBy) {
    id
    createdAt
    updatedAt
    deletedAt
    proyectDescription
    createdByUser {
      identificationNumber
      identificationType
      email
      fullName
    }
    file {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      fileUrl
      url
      chunkSize
    }
  }
}
    `;

/**
 * __useProyectCommentsQuery__
 *
 * To run a query within a React component, call `useProyectCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProyectCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProyectCommentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useProyectCommentsQuery(baseOptions?: Apollo.QueryHookOptions<ProyectCommentsQuery, ProyectCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProyectCommentsQuery, ProyectCommentsQueryVariables>(ProyectCommentsDocument, options);
      }
export function useProyectCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProyectCommentsQuery, ProyectCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProyectCommentsQuery, ProyectCommentsQueryVariables>(ProyectCommentsDocument, options);
        }
export type ProyectCommentsQueryHookResult = ReturnType<typeof useProyectCommentsQuery>;
export type ProyectCommentsLazyQueryHookResult = ReturnType<typeof useProyectCommentsLazyQuery>;
export type ProyectCommentsQueryResult = Apollo.QueryResult<ProyectCommentsQuery, ProyectCommentsQueryVariables>;
export const FindStatisticStatusProyectDocument = gql`
    query FindStatisticStatusProyect($findStatisticStatusProyectId: ID!) {
  findStatisticStatusProyect(id: $findStatisticStatusProyectId) {
    valorTotal
    cantidad
    estado
    userId
  }
}
    `;

/**
 * __useFindStatisticStatusProyectQuery__
 *
 * To run a query within a React component, call `useFindStatisticStatusProyectQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindStatisticStatusProyectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindStatisticStatusProyectQuery({
 *   variables: {
 *      findStatisticStatusProyectId: // value for 'findStatisticStatusProyectId'
 *   },
 * });
 */
export function useFindStatisticStatusProyectQuery(baseOptions: Apollo.QueryHookOptions<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>(FindStatisticStatusProyectDocument, options);
      }
export function useFindStatisticStatusProyectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>(FindStatisticStatusProyectDocument, options);
        }
export type FindStatisticStatusProyectQueryHookResult = ReturnType<typeof useFindStatisticStatusProyectQuery>;
export type FindStatisticStatusProyectLazyQueryHookResult = ReturnType<typeof useFindStatisticStatusProyectLazyQuery>;
export type FindStatisticStatusProyectQueryResult = Apollo.QueryResult<FindStatisticStatusProyectQuery, FindStatisticStatusProyectQueryVariables>;
export const CreateTipoProyectoDocument = gql`
    mutation CreateTipoProyecto($createInput: CreateTipoProyectoInput!) {
  createTipoProyecto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateTipoProyectoMutationFn = Apollo.MutationFunction<CreateTipoProyectoMutation, CreateTipoProyectoMutationVariables>;

/**
 * __useCreateTipoProyectoMutation__
 *
 * To run a mutation, you first call `useCreateTipoProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTipoProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTipoProyectoMutation, { data, loading, error }] = useCreateTipoProyectoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateTipoProyectoMutation(baseOptions?: Apollo.MutationHookOptions<CreateTipoProyectoMutation, CreateTipoProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTipoProyectoMutation, CreateTipoProyectoMutationVariables>(CreateTipoProyectoDocument, options);
      }
export type CreateTipoProyectoMutationHookResult = ReturnType<typeof useCreateTipoProyectoMutation>;
export type CreateTipoProyectoMutationResult = Apollo.MutationResult<CreateTipoProyectoMutation>;
export type CreateTipoProyectoMutationOptions = Apollo.BaseMutationOptions<CreateTipoProyectoMutation, CreateTipoProyectoMutationVariables>;
export const UpdateTipoProyectoDocument = gql`
    mutation UpdateTipoProyecto($updateInput: UpdateTipoProyectoInput!) {
  updateTipoProyecto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateTipoProyectoMutationFn = Apollo.MutationFunction<UpdateTipoProyectoMutation, UpdateTipoProyectoMutationVariables>;

/**
 * __useUpdateTipoProyectoMutation__
 *
 * To run a mutation, you first call `useUpdateTipoProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTipoProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTipoProyectoMutation, { data, loading, error }] = useUpdateTipoProyectoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateTipoProyectoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTipoProyectoMutation, UpdateTipoProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTipoProyectoMutation, UpdateTipoProyectoMutationVariables>(UpdateTipoProyectoDocument, options);
      }
export type UpdateTipoProyectoMutationHookResult = ReturnType<typeof useUpdateTipoProyectoMutation>;
export type UpdateTipoProyectoMutationResult = Apollo.MutationResult<UpdateTipoProyectoMutation>;
export type UpdateTipoProyectoMutationOptions = Apollo.BaseMutationOptions<UpdateTipoProyectoMutation, UpdateTipoProyectoMutationVariables>;
export const TipoProyectosDocument = gql`
    query TipoProyectos($pagination: Pagination) {
  tipoProyectos(pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    nombre
    descripcion
    isActive
  }
  tipoProyectosCount(pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useTipoProyectosQuery__
 *
 * To run a query within a React component, call `useTipoProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useTipoProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTipoProyectosQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTipoProyectosQuery(baseOptions?: Apollo.QueryHookOptions<TipoProyectosQuery, TipoProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TipoProyectosQuery, TipoProyectosQueryVariables>(TipoProyectosDocument, options);
      }
export function useTipoProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TipoProyectosQuery, TipoProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TipoProyectosQuery, TipoProyectosQueryVariables>(TipoProyectosDocument, options);
        }
export type TipoProyectosQueryHookResult = ReturnType<typeof useTipoProyectosQuery>;
export type TipoProyectosLazyQueryHookResult = ReturnType<typeof useTipoProyectosLazyQuery>;
export type TipoProyectosQueryResult = Apollo.QueryResult<TipoProyectosQuery, TipoProyectosQueryVariables>;
export const MarcaProyectosDocument = gql`
    query MarcaProyectos($pagination: Pagination) {
  marcaProyectos(pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    nombre
    isActive
    referencias {
      id
      createdAt
      updatedAt
      deletedAt
      codigo
      descripcion
      isActive
    }
  }
  marcaProyectosCount(pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useMarcaProyectosQuery__
 *
 * To run a query within a React component, call `useMarcaProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarcaProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarcaProyectosQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useMarcaProyectosQuery(baseOptions?: Apollo.QueryHookOptions<MarcaProyectosQuery, MarcaProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarcaProyectosQuery, MarcaProyectosQueryVariables>(MarcaProyectosDocument, options);
      }
export function useMarcaProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarcaProyectosQuery, MarcaProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarcaProyectosQuery, MarcaProyectosQueryVariables>(MarcaProyectosDocument, options);
        }
export type MarcaProyectosQueryHookResult = ReturnType<typeof useMarcaProyectosQuery>;
export type MarcaProyectosLazyQueryHookResult = ReturnType<typeof useMarcaProyectosLazyQuery>;
export type MarcaProyectosQueryResult = Apollo.QueryResult<MarcaProyectosQuery, MarcaProyectosQueryVariables>;
export const CreateMarcaProyectoDocument = gql`
    mutation CreateMarcaProyecto($createInput: CreateMarcaInput!) {
  createMarcaProyecto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateMarcaProyectoMutationFn = Apollo.MutationFunction<CreateMarcaProyectoMutation, CreateMarcaProyectoMutationVariables>;

/**
 * __useCreateMarcaProyectoMutation__
 *
 * To run a mutation, you first call `useCreateMarcaProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMarcaProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMarcaProyectoMutation, { data, loading, error }] = useCreateMarcaProyectoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateMarcaProyectoMutation(baseOptions?: Apollo.MutationHookOptions<CreateMarcaProyectoMutation, CreateMarcaProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMarcaProyectoMutation, CreateMarcaProyectoMutationVariables>(CreateMarcaProyectoDocument, options);
      }
export type CreateMarcaProyectoMutationHookResult = ReturnType<typeof useCreateMarcaProyectoMutation>;
export type CreateMarcaProyectoMutationResult = Apollo.MutationResult<CreateMarcaProyectoMutation>;
export type CreateMarcaProyectoMutationOptions = Apollo.BaseMutationOptions<CreateMarcaProyectoMutation, CreateMarcaProyectoMutationVariables>;
export const UpdateMarcaProyectoDocument = gql`
    mutation UpdateMarcaProyecto($updateInput: UpdateMarcaInput!) {
  updateMarcaProyecto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateMarcaProyectoMutationFn = Apollo.MutationFunction<UpdateMarcaProyectoMutation, UpdateMarcaProyectoMutationVariables>;

/**
 * __useUpdateMarcaProyectoMutation__
 *
 * To run a mutation, you first call `useUpdateMarcaProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMarcaProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMarcaProyectoMutation, { data, loading, error }] = useUpdateMarcaProyectoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateMarcaProyectoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMarcaProyectoMutation, UpdateMarcaProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMarcaProyectoMutation, UpdateMarcaProyectoMutationVariables>(UpdateMarcaProyectoDocument, options);
      }
export type UpdateMarcaProyectoMutationHookResult = ReturnType<typeof useUpdateMarcaProyectoMutation>;
export type UpdateMarcaProyectoMutationResult = Apollo.MutationResult<UpdateMarcaProyectoMutation>;
export type UpdateMarcaProyectoMutationOptions = Apollo.BaseMutationOptions<UpdateMarcaProyectoMutation, UpdateMarcaProyectoMutationVariables>;
export const ReferenciaProyectosDocument = gql`
    query ReferenciaProyectos {
  referenciaProyectos {
    id
    createdAt
    updatedAt
    deletedAt
    codigo
    descripcion
    isActive
  }
}
    `;

/**
 * __useReferenciaProyectosQuery__
 *
 * To run a query within a React component, call `useReferenciaProyectosQuery` and pass it any options that fit your needs.
 * When your component renders, `useReferenciaProyectosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReferenciaProyectosQuery({
 *   variables: {
 *   },
 * });
 */
export function useReferenciaProyectosQuery(baseOptions?: Apollo.QueryHookOptions<ReferenciaProyectosQuery, ReferenciaProyectosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReferenciaProyectosQuery, ReferenciaProyectosQueryVariables>(ReferenciaProyectosDocument, options);
      }
export function useReferenciaProyectosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReferenciaProyectosQuery, ReferenciaProyectosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReferenciaProyectosQuery, ReferenciaProyectosQueryVariables>(ReferenciaProyectosDocument, options);
        }
export type ReferenciaProyectosQueryHookResult = ReturnType<typeof useReferenciaProyectosQuery>;
export type ReferenciaProyectosLazyQueryHookResult = ReturnType<typeof useReferenciaProyectosLazyQuery>;
export type ReferenciaProyectosQueryResult = Apollo.QueryResult<ReferenciaProyectosQuery, ReferenciaProyectosQueryVariables>;
export const CreateReferenciaProyectoDocument = gql`
    mutation CreateReferenciaProyecto($createInput: CreateReferenciaInput!) {
  createReferenciaProyecto(createInput: $createInput) {
    id
  }
}
    `;
export type CreateReferenciaProyectoMutationFn = Apollo.MutationFunction<CreateReferenciaProyectoMutation, CreateReferenciaProyectoMutationVariables>;

/**
 * __useCreateReferenciaProyectoMutation__
 *
 * To run a mutation, you first call `useCreateReferenciaProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReferenciaProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReferenciaProyectoMutation, { data, loading, error }] = useCreateReferenciaProyectoMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateReferenciaProyectoMutation(baseOptions?: Apollo.MutationHookOptions<CreateReferenciaProyectoMutation, CreateReferenciaProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReferenciaProyectoMutation, CreateReferenciaProyectoMutationVariables>(CreateReferenciaProyectoDocument, options);
      }
export type CreateReferenciaProyectoMutationHookResult = ReturnType<typeof useCreateReferenciaProyectoMutation>;
export type CreateReferenciaProyectoMutationResult = Apollo.MutationResult<CreateReferenciaProyectoMutation>;
export type CreateReferenciaProyectoMutationOptions = Apollo.BaseMutationOptions<CreateReferenciaProyectoMutation, CreateReferenciaProyectoMutationVariables>;
export const UpdateReferenciaProyectoDocument = gql`
    mutation UpdateReferenciaProyecto($updateInput: UpdateReferenciaInput!) {
  updateReferenciaProyecto(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateReferenciaProyectoMutationFn = Apollo.MutationFunction<UpdateReferenciaProyectoMutation, UpdateReferenciaProyectoMutationVariables>;

/**
 * __useUpdateReferenciaProyectoMutation__
 *
 * To run a mutation, you first call `useUpdateReferenciaProyectoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReferenciaProyectoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReferenciaProyectoMutation, { data, loading, error }] = useUpdateReferenciaProyectoMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateReferenciaProyectoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReferenciaProyectoMutation, UpdateReferenciaProyectoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReferenciaProyectoMutation, UpdateReferenciaProyectoMutationVariables>(UpdateReferenciaProyectoDocument, options);
      }
export type UpdateReferenciaProyectoMutationHookResult = ReturnType<typeof useUpdateReferenciaProyectoMutation>;
export type UpdateReferenciaProyectoMutationResult = Apollo.MutationResult<UpdateReferenciaProyectoMutation>;
export type UpdateReferenciaProyectoMutationOptions = Apollo.BaseMutationOptions<UpdateReferenciaProyectoMutation, UpdateReferenciaProyectoMutationVariables>;
export const RemoveProyectoReferenciaDocument = gql`
    mutation RemoveProyectoReferencia($removeProyectoReferenciaId: ID!) {
  removeProyectoReferencia(id: $removeProyectoReferenciaId) {
    id
  }
}
    `;
export type RemoveProyectoReferenciaMutationFn = Apollo.MutationFunction<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>;

/**
 * __useRemoveProyectoReferenciaMutation__
 *
 * To run a mutation, you first call `useRemoveProyectoReferenciaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveProyectoReferenciaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeProyectoReferenciaMutation, { data, loading, error }] = useRemoveProyectoReferenciaMutation({
 *   variables: {
 *      removeProyectoReferenciaId: // value for 'removeProyectoReferenciaId'
 *   },
 * });
 */
export function useRemoveProyectoReferenciaMutation(baseOptions?: Apollo.MutationHookOptions<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>(RemoveProyectoReferenciaDocument, options);
      }
export type RemoveProyectoReferenciaMutationHookResult = ReturnType<typeof useRemoveProyectoReferenciaMutation>;
export type RemoveProyectoReferenciaMutationResult = Apollo.MutationResult<RemoveProyectoReferenciaMutation>;
export type RemoveProyectoReferenciaMutationOptions = Apollo.BaseMutationOptions<RemoveProyectoReferenciaMutation, RemoveProyectoReferenciaMutationVariables>;
export const CreateProyectoReferenciaDocument = gql`
    mutation CreateProyectoReferencia($createInput: AddReferenciaToProyectoInput!) {
  createProyectoReferencia(createInput: $createInput) {
    id
  }
}
    `;
export type CreateProyectoReferenciaMutationFn = Apollo.MutationFunction<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>;

/**
 * __useCreateProyectoReferenciaMutation__
 *
 * To run a mutation, you first call `useCreateProyectoReferenciaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProyectoReferenciaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProyectoReferenciaMutation, { data, loading, error }] = useCreateProyectoReferenciaMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateProyectoReferenciaMutation(baseOptions?: Apollo.MutationHookOptions<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>(CreateProyectoReferenciaDocument, options);
      }
export type CreateProyectoReferenciaMutationHookResult = ReturnType<typeof useCreateProyectoReferenciaMutation>;
export type CreateProyectoReferenciaMutationResult = Apollo.MutationResult<CreateProyectoReferenciaMutation>;
export type CreateProyectoReferenciaMutationOptions = Apollo.BaseMutationOptions<CreateProyectoReferenciaMutation, CreateProyectoReferenciaMutationVariables>;
export const StocksDocument = gql`
    query Stocks {
  stocks {
    id
    createdAt
    updatedAt
    deletedAt
    referencia
    nombreReferencia
    clase
    nombreClase
    cantidadActual
    stcMin
    isDeleted
    stcMax
    fichaTecnica {
      id
      createdAt
      updatedAt
      deletedAt
      fileName
      fileExtension
      fileMode
      fileMongoId
      chunkSize
      fileUrl
      url
    }
  }
}
    `;

/**
 * __useStocksQuery__
 *
 * To run a query within a React component, call `useStocksQuery` and pass it any options that fit your needs.
 * When your component renders, `useStocksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStocksQuery({
 *   variables: {
 *   },
 * });
 */
export function useStocksQuery(baseOptions?: Apollo.QueryHookOptions<StocksQuery, StocksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StocksQuery, StocksQueryVariables>(StocksDocument, options);
      }
export function useStocksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StocksQuery, StocksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StocksQuery, StocksQueryVariables>(StocksDocument, options);
        }
export type StocksQueryHookResult = ReturnType<typeof useStocksQuery>;
export type StocksLazyQueryHookResult = ReturnType<typeof useStocksLazyQuery>;
export type StocksQueryResult = Apollo.QueryResult<StocksQuery, StocksQueryVariables>;
export const CreateStockDocument = gql`
    mutation CreateStock($createInput: CreateStockInput!) {
  createStock(createInput: $createInput) {
    id
  }
}
    `;
export type CreateStockMutationFn = Apollo.MutationFunction<CreateStockMutation, CreateStockMutationVariables>;

/**
 * __useCreateStockMutation__
 *
 * To run a mutation, you first call `useCreateStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStockMutation, { data, loading, error }] = useCreateStockMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateStockMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockMutation, CreateStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockMutation, CreateStockMutationVariables>(CreateStockDocument, options);
      }
export type CreateStockMutationHookResult = ReturnType<typeof useCreateStockMutation>;
export type CreateStockMutationResult = Apollo.MutationResult<CreateStockMutation>;
export type CreateStockMutationOptions = Apollo.BaseMutationOptions<CreateStockMutation, CreateStockMutationVariables>;
export const UpdateStockDocument = gql`
    mutation UpdateStock($updateInput: UpdateStockInput!) {
  updateStock(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateStockMutationFn = Apollo.MutationFunction<UpdateStockMutation, UpdateStockMutationVariables>;

/**
 * __useUpdateStockMutation__
 *
 * To run a mutation, you first call `useUpdateStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStockMutation, { data, loading, error }] = useUpdateStockMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateStockMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStockMutation, UpdateStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStockMutation, UpdateStockMutationVariables>(UpdateStockDocument, options);
      }
export type UpdateStockMutationHookResult = ReturnType<typeof useUpdateStockMutation>;
export type UpdateStockMutationResult = Apollo.MutationResult<UpdateStockMutation>;
export type UpdateStockMutationOptions = Apollo.BaseMutationOptions<UpdateStockMutation, UpdateStockMutationVariables>;
export const UpdateToStockDocument = gql`
    mutation UpdateToStock {
  updateToStock {
    success
    message
  }
}
    `;
export type UpdateToStockMutationFn = Apollo.MutationFunction<UpdateToStockMutation, UpdateToStockMutationVariables>;

/**
 * __useUpdateToStockMutation__
 *
 * To run a mutation, you first call `useUpdateToStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateToStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateToStockMutation, { data, loading, error }] = useUpdateToStockMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateToStockMutation(baseOptions?: Apollo.MutationHookOptions<UpdateToStockMutation, UpdateToStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateToStockMutation, UpdateToStockMutationVariables>(UpdateToStockDocument, options);
      }
export type UpdateToStockMutationHookResult = ReturnType<typeof useUpdateToStockMutation>;
export type UpdateToStockMutationResult = Apollo.MutationResult<UpdateToStockMutation>;
export type UpdateToStockMutationOptions = Apollo.BaseMutationOptions<UpdateToStockMutation, UpdateToStockMutationVariables>;
export const RemoveStockDocument = gql`
    mutation RemoveStock($removeStockId: ID!) {
  removeStock(id: $removeStockId) {
    id
  }
}
    `;
export type RemoveStockMutationFn = Apollo.MutationFunction<RemoveStockMutation, RemoveStockMutationVariables>;

/**
 * __useRemoveStockMutation__
 *
 * To run a mutation, you first call `useRemoveStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeStockMutation, { data, loading, error }] = useRemoveStockMutation({
 *   variables: {
 *      removeStockId: // value for 'removeStockId'
 *   },
 * });
 */
export function useRemoveStockMutation(baseOptions?: Apollo.MutationHookOptions<RemoveStockMutation, RemoveStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveStockMutation, RemoveStockMutationVariables>(RemoveStockDocument, options);
      }
export type RemoveStockMutationHookResult = ReturnType<typeof useRemoveStockMutation>;
export type RemoveStockMutationResult = Apollo.MutationResult<RemoveStockMutation>;
export type RemoveStockMutationOptions = Apollo.BaseMutationOptions<RemoveStockMutation, RemoveStockMutationVariables>;
export const TasksDocument = gql`
    query Tasks($orderBy: [FindTaskTypeOrderBy!], $where: FindTaskTypeWhere, $pagination: Pagination) {
  tasks(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    taskName
    taskDescription
    taskDateExpiration
    taskPriority
    taskStatus
    worker {
      email
      identificationType
      identificationNumber
      fullName
    }
    createdByUser {
      email
      identificationType
      identificationNumber
      fullName
    }
  }
  tasksCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useTasksQuery__
 *
 * To run a query within a React component, call `useTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTasksQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useTasksQuery(baseOptions?: Apollo.QueryHookOptions<TasksQuery, TasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
      }
export function useTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TasksQuery, TasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TasksQuery, TasksQueryVariables>(TasksDocument, options);
        }
export type TasksQueryHookResult = ReturnType<typeof useTasksQuery>;
export type TasksLazyQueryHookResult = ReturnType<typeof useTasksLazyQuery>;
export type TasksQueryResult = Apollo.QueryResult<TasksQuery, TasksQueryVariables>;
export const CreateTaskDocument = gql`
    mutation CreateTask($createInput: CreateTaskInput!) {
  createTask(createInput: $createInput) {
    id
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($updateInput: UpdateTaskInput!) {
  updateTask(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const UsersDocument = gql`
    query Users($orderBy: [FindUsersOrderBy!], $where: FindUsersWhere, $pagination: Pagination) {
  users(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    middleName
    lastName
    secondSurname
    email
    identificationType
    identificationNumber
    dateIssue
    legalRepresentativeIdentificationType
    legalRepresentativeIdentificationNumber
    phoneCountryCode
    phoneNumber
    address
    hasRural
    confirmationCode
    position
    status
    phoneVerification
    emailVerification
    type
    valueTransport
    typeWoker
    subordinates {
      id
      fullName
      email
      identificationType
      identificationNumber
    }
    city {
      id
      name
    }
    department {
      id
      name
    }
    country {
      id
      name
    }
    userRoles {
      id
      name
    }
    userRolesFx {
      id
    }
    fullName
  }
  usersCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createInput: CreateUserInput!) {
  createUser(createInput: $createInput) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($removeUserId: ID!) {
  removeUser(id: $removeUserId) {
    id
    fullName
    name
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      removeUserId: // value for 'removeUserId'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateInput: UpdateUserInput!) {
  updateUser(updateInput: $updateInput) {
    id
    fullName
    lastName
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AssignSubordinateDocument = gql`
    mutation AssignSubordinate($managerId: String!, $subordinateId: String!) {
  assignSubordinate(managerId: $managerId, subordinateId: $subordinateId) {
    id
  }
}
    `;
export type AssignSubordinateMutationFn = Apollo.MutationFunction<AssignSubordinateMutation, AssignSubordinateMutationVariables>;

/**
 * __useAssignSubordinateMutation__
 *
 * To run a mutation, you first call `useAssignSubordinateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAssignSubordinateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [assignSubordinateMutation, { data, loading, error }] = useAssignSubordinateMutation({
 *   variables: {
 *      managerId: // value for 'managerId'
 *      subordinateId: // value for 'subordinateId'
 *   },
 * });
 */
export function useAssignSubordinateMutation(baseOptions?: Apollo.MutationHookOptions<AssignSubordinateMutation, AssignSubordinateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AssignSubordinateMutation, AssignSubordinateMutationVariables>(AssignSubordinateDocument, options);
      }
export type AssignSubordinateMutationHookResult = ReturnType<typeof useAssignSubordinateMutation>;
export type AssignSubordinateMutationResult = Apollo.MutationResult<AssignSubordinateMutation>;
export type AssignSubordinateMutationOptions = Apollo.BaseMutationOptions<AssignSubordinateMutation, AssignSubordinateMutationVariables>;
export const RemoveSubordinateDocument = gql`
    mutation RemoveSubordinate($managerId: String!, $subordinateId: String!) {
  removeSubordinate(managerId: $managerId, subordinateId: $subordinateId) {
    id
  }
}
    `;
export type RemoveSubordinateMutationFn = Apollo.MutationFunction<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>;

/**
 * __useRemoveSubordinateMutation__
 *
 * To run a mutation, you first call `useRemoveSubordinateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSubordinateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSubordinateMutation, { data, loading, error }] = useRemoveSubordinateMutation({
 *   variables: {
 *      managerId: // value for 'managerId'
 *      subordinateId: // value for 'subordinateId'
 *   },
 * });
 */
export function useRemoveSubordinateMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>(RemoveSubordinateDocument, options);
      }
export type RemoveSubordinateMutationHookResult = ReturnType<typeof useRemoveSubordinateMutation>;
export type RemoveSubordinateMutationResult = Apollo.MutationResult<RemoveSubordinateMutation>;
export type RemoveSubordinateMutationOptions = Apollo.BaseMutationOptions<RemoveSubordinateMutation, RemoveSubordinateMutationVariables>;
export const VisitsDocument = gql`
    query Visits($orderBy: [FindVisitOrderBy!], $where: FindVisitWhere, $pagination: Pagination) {
  visits(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    dateVisit
    status
    isProyect
    latitude
    longitude
    client {
      id
      createdAt
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      type
      vertical
      celular
      city {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      department {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
      country {
        id
        createdAt
        updatedAt
        deletedAt
        code
        name
      }
    }
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
    user {
      id
      createdAt
      updatedAt
      deletedAt
      name
      middleName
      lastName
      secondSurname
      email
      identificationType
      identificationNumber
      dateIssue
      legalRepresentativeIdentificationType
      legalRepresentativeIdentificationNumber
      phoneCountryCode
      phoneNumber
      address
      hasRural
      confirmationCode
      position
      status
      phoneVerification
      emailVerification
      type
      userRoles {
        id
        createdAt
        updatedAt
        deletedAt
        name
        description
        defaultForType
        users {
          id
          createdAt
          updatedAt
          deletedAt
          name
          middleName
          lastName
          secondSurname
          email
          identificationType
          identificationNumber
          dateIssue
          legalRepresentativeIdentificationType
          legalRepresentativeIdentificationNumber
          phoneCountryCode
          phoneNumber
          address
          hasRural
          confirmationCode
          position
          status
          phoneVerification
          emailVerification
          type
          fullName
        }
        roleFx {
          id
          createdAt
          updatedAt
          deletedAt
          permission
        }
      }
      userRolesFx {
        id
        createdAt
        updatedAt
        deletedAt
        permission
        role {
          id
          createdAt
          updatedAt
          deletedAt
          name
          description
          defaultForType
        }
      }
      fullName
    }
  }
  visitsCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    totalItems
    itemsPerPage
    totalPages
    currentPage
  }
}
    `;

/**
 * __useVisitsQuery__
 *
 * To run a query within a React component, call `useVisitsQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitsQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useVisitsQuery(baseOptions?: Apollo.QueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
      }
export function useVisitsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitsQuery, VisitsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitsQuery, VisitsQueryVariables>(VisitsDocument, options);
        }
export type VisitsQueryHookResult = ReturnType<typeof useVisitsQuery>;
export type VisitsLazyQueryHookResult = ReturnType<typeof useVisitsLazyQuery>;
export type VisitsQueryResult = Apollo.QueryResult<VisitsQuery, VisitsQueryVariables>;
export const VisitTypesDocument = gql`
    query VisitTypes($orderBy: [FindVisitTypeOrderBy!], $where: FindVisitTypeWhere, $pagination: Pagination) {
  visitTypes(orderBy: $orderBy, where: $where, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    description
    status
  }
  visitTypesCount(orderBy: $orderBy, where: $where, pagination: $pagination) {
    currentPage
    itemsPerPage
    totalItems
    totalPages
  }
}
    `;

/**
 * __useVisitTypesQuery__
 *
 * To run a query within a React component, call `useVisitTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitTypesQuery({
 *   variables: {
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useVisitTypesQuery(baseOptions?: Apollo.QueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
      }
export function useVisitTypesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitTypesQuery, VisitTypesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitTypesQuery, VisitTypesQueryVariables>(VisitTypesDocument, options);
        }
export type VisitTypesQueryHookResult = ReturnType<typeof useVisitTypesQuery>;
export type VisitTypesLazyQueryHookResult = ReturnType<typeof useVisitTypesLazyQuery>;
export type VisitTypesQueryResult = Apollo.QueryResult<VisitTypesQuery, VisitTypesQueryVariables>;
export const CreateVisitTypeDocument = gql`
    mutation CreateVisitType($createInput: CreateVisitTypeInput!) {
  createVisitType(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitTypeMutationFn = Apollo.MutationFunction<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;

/**
 * __useCreateVisitTypeMutation__
 *
 * To run a mutation, you first call `useCreateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitTypeMutation, { data, loading, error }] = useCreateVisitTypeMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>(CreateVisitTypeDocument, options);
      }
export type CreateVisitTypeMutationHookResult = ReturnType<typeof useCreateVisitTypeMutation>;
export type CreateVisitTypeMutationResult = Apollo.MutationResult<CreateVisitTypeMutation>;
export type CreateVisitTypeMutationOptions = Apollo.BaseMutationOptions<CreateVisitTypeMutation, CreateVisitTypeMutationVariables>;
export const VisitDocument = gql`
    query Visit($visitId: ID!) {
  visit(id: $visitId) {
    id
    createdAt
    updatedAt
    deletedAt
    description
    location
    dateVisit
    status
    isProyect
    longitude
    latitude
    client {
      id
      updatedAt
      deletedAt
      name
      numberDocument
      email
      telefono
      address
      type
      vertical
      celular
      createdAt
    }
    type {
      id
      createdAt
      updatedAt
      deletedAt
      name
      description
      status
    }
  }
}
    `;

/**
 * __useVisitQuery__
 *
 * To run a query within a React component, call `useVisitQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitQuery({
 *   variables: {
 *      visitId: // value for 'visitId'
 *   },
 * });
 */
export function useVisitQuery(baseOptions: Apollo.QueryHookOptions<VisitQuery, VisitQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
      }
export function useVisitLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitQuery, VisitQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitQuery, VisitQueryVariables>(VisitDocument, options);
        }
export type VisitQueryHookResult = ReturnType<typeof useVisitQuery>;
export type VisitLazyQueryHookResult = ReturnType<typeof useVisitLazyQuery>;
export type VisitQueryResult = Apollo.QueryResult<VisitQuery, VisitQueryVariables>;
export const UpdateVisitTypeDocument = gql`
    mutation UpdateVisitType($updateInput: UpdateVisitTypeInput!) {
  updateVisitType(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitTypeMutationFn = Apollo.MutationFunction<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;

/**
 * __useUpdateVisitTypeMutation__
 *
 * To run a mutation, you first call `useUpdateVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitTypeMutation, { data, loading, error }] = useUpdateVisitTypeMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>(UpdateVisitTypeDocument, options);
      }
export type UpdateVisitTypeMutationHookResult = ReturnType<typeof useUpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationResult = Apollo.MutationResult<UpdateVisitTypeMutation>;
export type UpdateVisitTypeMutationOptions = Apollo.BaseMutationOptions<UpdateVisitTypeMutation, UpdateVisitTypeMutationVariables>;
export const RemoveVisitTypeDocument = gql`
    mutation RemoveVisitType($removeVisitTypeId: ID!) {
  removeVisitType(id: $removeVisitTypeId) {
    id
  }
}
    `;
export type RemoveVisitTypeMutationFn = Apollo.MutationFunction<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>;

/**
 * __useRemoveVisitTypeMutation__
 *
 * To run a mutation, you first call `useRemoveVisitTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveVisitTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeVisitTypeMutation, { data, loading, error }] = useRemoveVisitTypeMutation({
 *   variables: {
 *      removeVisitTypeId: // value for 'removeVisitTypeId'
 *   },
 * });
 */
export function useRemoveVisitTypeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>(RemoveVisitTypeDocument, options);
      }
export type RemoveVisitTypeMutationHookResult = ReturnType<typeof useRemoveVisitTypeMutation>;
export type RemoveVisitTypeMutationResult = Apollo.MutationResult<RemoveVisitTypeMutation>;
export type RemoveVisitTypeMutationOptions = Apollo.BaseMutationOptions<RemoveVisitTypeMutation, RemoveVisitTypeMutationVariables>;
export const UpdateVisitDocument = gql`
    mutation UpdateVisit($updateInput: UpdateVisitInput!) {
  updateVisit(updateInput: $updateInput) {
    id
  }
}
    `;
export type UpdateVisitMutationFn = Apollo.MutationFunction<UpdateVisitMutation, UpdateVisitMutationVariables>;

/**
 * __useUpdateVisitMutation__
 *
 * To run a mutation, you first call `useUpdateVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVisitMutation, { data, loading, error }] = useUpdateVisitMutation({
 *   variables: {
 *      updateInput: // value for 'updateInput'
 *   },
 * });
 */
export function useUpdateVisitMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVisitMutation, UpdateVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVisitMutation, UpdateVisitMutationVariables>(UpdateVisitDocument, options);
      }
export type UpdateVisitMutationHookResult = ReturnType<typeof useUpdateVisitMutation>;
export type UpdateVisitMutationResult = Apollo.MutationResult<UpdateVisitMutation>;
export type UpdateVisitMutationOptions = Apollo.BaseMutationOptions<UpdateVisitMutation, UpdateVisitMutationVariables>;
export const AcceptOrDeclineVisitDocument = gql`
    mutation AcceptOrDeclineVisit($updateStatusInput: UpdateStatusInput!) {
  acceptOrDeclineVisit(UpdateStatusInput: $updateStatusInput)
}
    `;
export type AcceptOrDeclineVisitMutationFn = Apollo.MutationFunction<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>;

/**
 * __useAcceptOrDeclineVisitMutation__
 *
 * To run a mutation, you first call `useAcceptOrDeclineVisitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptOrDeclineVisitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptOrDeclineVisitMutation, { data, loading, error }] = useAcceptOrDeclineVisitMutation({
 *   variables: {
 *      updateStatusInput: // value for 'updateStatusInput'
 *   },
 * });
 */
export function useAcceptOrDeclineVisitMutation(baseOptions?: Apollo.MutationHookOptions<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>(AcceptOrDeclineVisitDocument, options);
      }
export type AcceptOrDeclineVisitMutationHookResult = ReturnType<typeof useAcceptOrDeclineVisitMutation>;
export type AcceptOrDeclineVisitMutationResult = Apollo.MutationResult<AcceptOrDeclineVisitMutation>;
export type AcceptOrDeclineVisitMutationOptions = Apollo.BaseMutationOptions<AcceptOrDeclineVisitMutation, AcceptOrDeclineVisitMutationVariables>;
export const CreateVisitComentDocument = gql`
    mutation CreateVisitComent($createInput: CreateVisitComentInput!) {
  createVisitComent(createInput: $createInput) {
    id
  }
}
    `;
export type CreateVisitComentMutationFn = Apollo.MutationFunction<CreateVisitComentMutation, CreateVisitComentMutationVariables>;

/**
 * __useCreateVisitComentMutation__
 *
 * To run a mutation, you first call `useCreateVisitComentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVisitComentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVisitComentMutation, { data, loading, error }] = useCreateVisitComentMutation({
 *   variables: {
 *      createInput: // value for 'createInput'
 *   },
 * });
 */
export function useCreateVisitComentMutation(baseOptions?: Apollo.MutationHookOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVisitComentMutation, CreateVisitComentMutationVariables>(CreateVisitComentDocument, options);
      }
export type CreateVisitComentMutationHookResult = ReturnType<typeof useCreateVisitComentMutation>;
export type CreateVisitComentMutationResult = Apollo.MutationResult<CreateVisitComentMutation>;
export type CreateVisitComentMutationOptions = Apollo.BaseMutationOptions<CreateVisitComentMutation, CreateVisitComentMutationVariables>;
export const VisitasPorVendedorDocument = gql`
    query VisitasPorVendedor($year: Float!, $workerNumber: String!) {
  visitasPorVendedor(year: $year, workerNumber: $workerNumber) {
    numero_mes
    visitas
  }
}
    `;

/**
 * __useVisitasPorVendedorQuery__
 *
 * To run a query within a React component, call `useVisitasPorVendedorQuery` and pass it any options that fit your needs.
 * When your component renders, `useVisitasPorVendedorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVisitasPorVendedorQuery({
 *   variables: {
 *      year: // value for 'year'
 *      workerNumber: // value for 'workerNumber'
 *   },
 * });
 */
export function useVisitasPorVendedorQuery(baseOptions: Apollo.QueryHookOptions<VisitasPorVendedorQuery, VisitasPorVendedorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VisitasPorVendedorQuery, VisitasPorVendedorQueryVariables>(VisitasPorVendedorDocument, options);
      }
export function useVisitasPorVendedorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VisitasPorVendedorQuery, VisitasPorVendedorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VisitasPorVendedorQuery, VisitasPorVendedorQueryVariables>(VisitasPorVendedorDocument, options);
        }
export type VisitasPorVendedorQueryHookResult = ReturnType<typeof useVisitasPorVendedorQuery>;
export type VisitasPorVendedorLazyQueryHookResult = ReturnType<typeof useVisitasPorVendedorLazyQuery>;
export type VisitasPorVendedorQueryResult = Apollo.QueryResult<VisitasPorVendedorQuery, VisitasPorVendedorQueryVariables>;
export const VentasPorVendedorDocument = gql`
    query VentasPorVendedor($input: GetSalesInput!) {
  ventasPorVendedor(input: $input) {
    vendedor
    nombre_mes
    numero_mes
    venta
    costo
    oip
    flete
    back
    utilidad
    utilidad_porcentaje
  }
}
    `;

/**
 * __useVentasPorVendedorQuery__
 *
 * To run a query within a React component, call `useVentasPorVendedorQuery` and pass it any options that fit your needs.
 * When your component renders, `useVentasPorVendedorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVentasPorVendedorQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVentasPorVendedorQuery(baseOptions: Apollo.QueryHookOptions<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>(VentasPorVendedorDocument, options);
      }
export function useVentasPorVendedorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>(VentasPorVendedorDocument, options);
        }
export type VentasPorVendedorQueryHookResult = ReturnType<typeof useVentasPorVendedorQuery>;
export type VentasPorVendedorLazyQueryHookResult = ReturnType<typeof useVentasPorVendedorLazyQuery>;
export type VentasPorVendedorQueryResult = Apollo.QueryResult<VentasPorVendedorQuery, VentasPorVendedorQueryVariables>;
export const VentasPorVendedorDepartamentoDocument = gql`
    query VentasPorVendedorDepartamento($input: GetSalesInput!) {
  ventasPorVendedorDepartamento(input: $input) {
    vendedor
    departamento
    venta
    costo
    oip
    flete
    back
    utilidad
    utilidad_porcentaje
  }
}
    `;

/**
 * __useVentasPorVendedorDepartamentoQuery__
 *
 * To run a query within a React component, call `useVentasPorVendedorDepartamentoQuery` and pass it any options that fit your needs.
 * When your component renders, `useVentasPorVendedorDepartamentoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVentasPorVendedorDepartamentoQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVentasPorVendedorDepartamentoQuery(baseOptions: Apollo.QueryHookOptions<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>(VentasPorVendedorDepartamentoDocument, options);
      }
export function useVentasPorVendedorDepartamentoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>(VentasPorVendedorDepartamentoDocument, options);
        }
export type VentasPorVendedorDepartamentoQueryHookResult = ReturnType<typeof useVentasPorVendedorDepartamentoQuery>;
export type VentasPorVendedorDepartamentoLazyQueryHookResult = ReturnType<typeof useVentasPorVendedorDepartamentoLazyQuery>;
export type VentasPorVendedorDepartamentoQueryResult = Apollo.QueryResult<VentasPorVendedorDepartamentoQuery, VentasPorVendedorDepartamentoQueryVariables>;