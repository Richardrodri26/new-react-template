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

export type AddAndRemoveRoleInput = {
  roleId: Scalars['String'];
  userId: Scalars['String'];
};

export type ApprovalTokenInput = {
  code: Scalars['String'];
  token: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String'];
  user: User;
};

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

export type Client = {
  __typename?: 'Client';
  address?: Maybe<Scalars['String']>;
  celular: Scalars['String'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  department?: Maybe<Department>;
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
  numberDocument: Scalars['String'];
  position: Scalars['String'];
  telefono?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CodeConfirmationInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type CodeRecoverPasswordInput = {
  code: Scalars['String'];
  email: Scalars['String'];
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAndRemoveRoleFxInput = {
  permissions: Array<Scalars['String']>;
  role: Scalars['ID'];
};

export type CreateClientContactInput = {
  celular: Scalars['String'];
  clientId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  position: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular: Scalars['String'];
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
  type: TypeClientEnum;
  vertical?: InputMaybe<Scalars['String']>;
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

export type CreateGroupInput = {
  name: Scalars['String'];
  notificationConfigId?: InputMaybe<Scalars['ID']>;
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

export type CreatePositionInput = {
  name?: InputMaybe<Scalars['String']>;
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

export type CreateRoleInput = {
  description: Scalars['String'];
  name: Scalars['String'];
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
};

export type CreateVisitComentInput = {
  description: Scalars['String'];
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
  status: StatusVisitEnum;
  typeId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateVisitTypeInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  status: VisitTypeStatusEnum;
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

export type FileInfo = {
  __typename?: 'FileInfo';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  fileExtension: Scalars['String'];
  fileMode: FileModes;
  fileMongoId: Scalars['String'];
  fileName: Scalars['String'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export enum FileModes {
  Buffer = 'buffer',
  Mongo = 'mongo',
  Url = 'url'
}

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
  numberDocument?: InputMaybe<OrderTypes>;
};

export type FindClientWhere = {
  _and?: InputMaybe<Array<FindClientWhere>>;
  _or?: InputMaybe<Array<FindClientWhere>>;
  name?: InputMaybe<StringFilter>;
  numberDocument?: InputMaybe<StringFilter>;
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
};

export type FindVisitComentWhere = {
  _and?: InputMaybe<Array<FindVisitComentWhere>>;
  _or?: InputMaybe<Array<FindVisitComentWhere>>;
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
  status?: InputMaybe<DateFilter>;
  user?: InputMaybe<StringFilter>;
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
  addUserRole: User;
  codeConfirmation: User;
  create: RoleFx;
  createClient: Client;
  createClientContact: ClientContact;
  createDefaultRoles: Array<Role>;
  createDocumentType: DocumentType;
  createDummiesX: Array<Dummy>;
  createDummy: Dummy;
  createGroup: Group;
  createMultiKeyRegister: MultikeyRegister;
  createNotification: Notification;
  createNotificationConfig: NotificationConfig;
  createNotificationGroup: NotificationGroup;
  createPageLinkInput: PageLink;
  createParameter: Parameter;
  createPositionInput: Position;
  createProfile: Profile;
  createRole: Role;
  createRoleFx: Array<RoleFx>;
  createUser: User;
  createVisit: Visit;
  createVisitComent: VisitComent;
  createVisitType: VisitType;
  enableAndDisableDoubleVerification: Scalars['String'];
  i18nTest: Scalars['String'];
  recoverPassword: Scalars['String'];
  remove: NotificationGroup;
  removeClient: Client;
  removeClientContact: ClientContact;
  removeDocumentType: DocumentType;
  removeDummy: Dummy;
  removeGroup: Group;
  removeMultiKeyRegister: MultikeyRegister;
  removeNotification: Notification;
  removeNotificationConfig: NotificationConfig;
  removePageLink: PageLink;
  removeParameter: Parameter;
  removePosition: Position;
  removeProfile: Profile;
  removeRole: Role;
  removeRoleFx: Array<Scalars['String']>;
  removeUser: User;
  removeUserRole: User;
  removeVisit: Visit;
  removeVisitComent: VisitComent;
  removeVisitType: VisitType;
  replaceAllRolesFx: Array<RoleFx>;
  resetSuperAdmin: User;
  sendCodeDoubleVerification: Scalars['String'];
  signInAdmin: AuthResponse;
  signUpWithDocument: AuthResponse;
  signUpWithEmail: AuthResponse;
  signin: AuthResponse;
  update: NotificationGroup;
  updateClient: Client;
  updateClientContact: ClientContact;
  updateDocumentType: DocumentType;
  updateDummy: Dummy;
  updateGroup: Group;
  updateMultiKeyRegister: MultikeyRegister;
  updateNotification: Notification;
  updateNotificationConfig: NotificationConfig;
  updatePageLinkInput: PageLink;
  updateParameter: Parameter;
  updatePassword: User;
  updatePositionInput: Position;
  updateProfile: Profile;
  updateRole: Role;
  updateUser: User;
  updateUserInformation: User;
  updateUserPassword: User;
  updateVisit: Visit;
  updateVisitComent: VisitComent;
  updateVisitType: VisitType;
};


export type MutationAddUserRoleArgs = {
  addAndRemoveRoleInput: AddAndRemoveRoleInput;
};


export type MutationCodeConfirmationArgs = {
  createInput: CodeConfirmationInput;
};


export type MutationCreateArgs = {
  createInput: CreateAndRemoveRoleFxInput;
};


export type MutationCreateClientArgs = {
  createInput: CreateClientInput;
};


export type MutationCreateClientContactArgs = {
  createInput: CreateClientContactInput;
};


export type MutationCreateDocumentTypeArgs = {
  createInput: CreateDocumentTypeInput;
};


export type MutationCreateDummyArgs = {
  createInput: CreateDummyInput;
};


export type MutationCreateGroupArgs = {
  createInput: CreateGroupInput;
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


export type MutationCreatePageLinkInputArgs = {
  createInput: CreatePageLinkInput;
};


export type MutationCreateParameterArgs = {
  createInput: CreateParametersInput;
};


export type MutationCreatePositionInputArgs = {
  createInput: CreatePositionInput;
};


export type MutationCreateProfileArgs = {
  createInput: CreateProfileInput;
};


export type MutationCreateRoleArgs = {
  createInput: CreateRoleInput;
};


export type MutationCreateRoleFxArgs = {
  createRoleFxInput: CreateAndRemoveRoleFxInput;
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


export type MutationEnableAndDisableDoubleVerificationArgs = {
  doubleVerificationInput: DoubleVerificationInput;
};


export type MutationRecoverPasswordArgs = {
  recoverPasswordInput: RecoverPasswordInput;
};


export type MutationRemoveArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveClientContactArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDocumentTypeArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveDummyArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveGroupArgs = {
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


export type MutationRemovePageLinkArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveParameterArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePositionArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveProfileArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveRoleFxArgs = {
  removeRoleFxInput: CreateAndRemoveRoleFxInput;
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


export type MutationReplaceAllRolesFxArgs = {
  replaceAllRoleFxInput: CreateAndRemoveRoleFxInput;
};


export type MutationSendCodeDoubleVerificationArgs = {
  sendDoubleVerificationInput: SendDoubleVerificationInput;
};


export type MutationSignInAdminArgs = {
  signInAdminInput: SigninAdminInput;
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


export type MutationUpdateClientArgs = {
  updateInput: UpdateClientInput;
};


export type MutationUpdateClientContactArgs = {
  updateInput: UpdateClientContactInput;
};


export type MutationUpdateDocumentTypeArgs = {
  updateInput: UpdateDocumentTypeInput;
};


export type MutationUpdateDummyArgs = {
  updateInput: UpdateDummyInput;
};


export type MutationUpdateGroupArgs = {
  updateInput: UpdateGroupInput;
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


export type MutationUpdateProfileArgs = {
  updateInput: UpdateProfileInput;
};


export type MutationUpdateRoleArgs = {
  updateInput: UpdateRoleInput;
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

export type Query = {
  __typename?: 'Query';
  Count: MetadataPagination;
  NotificationGroup: NotificationGroup;
  NotificationGroups: Array<NotificationGroup>;
  NotificationGroupsCount: MetadataPagination;
  approvalJwt: AuthResponse;
  cities: Array<City>;
  city: City;
  client: Client;
  clientContact: ClientContact;
  clientContacts: Array<ClientContact>;
  clientContactsCount: MetadataPagination;
  clients: Array<Client>;
  clientsCount: MetadataPagination;
  codeRecoverPassword: Scalars['String'];
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
  file: FileInfo;
  findAll: Array<UserKey>;
  findAllVisitDashboard: VisitDashboardModel;
  findOne: UserKey;
  functionalities: FunctionalityModel;
  group: Group;
  groups: Array<Group>;
  groupsCount: MetadataPagination;
  multiKeyRegister: MultikeyRegister;
  multiKeyRegisters: Array<MultikeyRegister>;
  multiKeyRegistersCount: MetadataPagination;
  notification: Notification;
  notificationConfig: NotificationConfig;
  notificationConfigs: Array<NotificationConfig>;
  notificationConfigsCount: MetadataPagination;
  notifications: Array<Notification>;
  notificationsCount: MetadataPagination;
  pageLink: PageLink;
  pageLinks: Array<PageLink>;
  pageLinksCount: MetadataPagination;
  parameter: Parameter;
  parameters: Array<Parameter>;
  parametersCount: MetadataPagination;
  position: Position;
  positions: Array<Position>;
  positionsCount: MetadataPagination;
  profile: Profile;
  profiles: Array<Profile>;
  profilesCount: MetadataPagination;
  revalidate: AuthResponse;
  role: Role;
  roleFx: RoleFx;
  roles: Array<Role>;
  rolesCount: MetadataPagination;
  rolesFx: Array<RoleFx>;
  rolesFxCount: MetadataPagination;
  user: User;
  users: Array<User>;
  usersCount: MetadataPagination;
  validateUserToken: User;
  visit: Visit;
  visitComent: VisitComent;
  visitComents: Array<VisitComent>;
  visitComentsCount: MetadataPagination;
  visitType: VisitType;
  visitTypes: Array<VisitType>;
  visitTypesCount: MetadataPagination;
  visits: Array<Visit>;
  visitsCount: MetadataPagination;
};


export type QueryCountArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
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


export type QueryApprovalJwtArgs = {
  approvalTokenInput: ApprovalTokenInput;
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


export type QueryFileArgs = {
  id: Scalars['ID'];
};


export type QueryFindAllArgs = {
  orderBy?: InputMaybe<Array<FindUsersOrderBy>>;
  pagination?: InputMaybe<Pagination>;
  where?: InputMaybe<FindUsersWhere>;
};


export type QueryFindOneArgs = {
  id: Scalars['ID'];
};


export type QueryGroupArgs = {
  id: Scalars['ID'];
};


export type QueryGroupsArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryGroupsCountArgs = {
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


export type QueryProfileArgs = {
  id: Scalars['ID'];
};


export type QueryProfilesArgs = {
  pagination?: InputMaybe<Pagination>;
};


export type QueryProfilesCountArgs = {
  pagination?: InputMaybe<Pagination>;
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

export type SendDoubleVerificationInput = {
  email?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
  token: Scalars['String'];
};

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

export type StringFilter = {
  _contains?: InputMaybe<Scalars['String']>;
  _endswith?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  _like?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _notcontains?: InputMaybe<Scalars['String']>;
  _notendswith?: InputMaybe<Scalars['String']>;
  _notlike?: InputMaybe<Scalars['String']>;
  _notstartswith?: InputMaybe<Scalars['String']>;
  _startswith?: InputMaybe<Scalars['String']>;
};

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

export type UpdateClientContactInput = {
  celular?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
};

export type UpdateClientInput = {
  address?: InputMaybe<Scalars['String']>;
  celular?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TypeClientEnum>;
  vertical?: InputMaybe<Scalars['String']>;
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

export type UpdateGroupInput = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  notificationConfigId?: InputMaybe<Scalars['ID']>;
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

export type UpdateRoleInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
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
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['ValidatePassword'];
  newPassword: Scalars['ValidatePassword'];
  newPasswordConfirm: Scalars['ValidatePassword'];
};

export type UpdateVisitComentInput = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
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
  middleName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phoneCountryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  phoneVerification: Scalars['Boolean'];
  position?: Maybe<Scalars['String']>;
  secondSurname?: Maybe<Scalars['String']>;
  status: UserStatusTypes;
  type: UserTypes;
  updatedAt: Scalars['DateTime'];
  userRoles: Array<Role>;
  userRolesFx: Array<RoleFx>;
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
  status: StatusVisitEnum;
  type: VisitType;
  updatedAt: Scalars['DateTime'];
  user: User;
};

export type VisitComent = {
  __typename?: 'VisitComent';
  createdAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  type: VisitComentTypeEnum;
  updatedAt: Scalars['DateTime'];
  user: User;
  visit: Visit;
};

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

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  phonePrefix?: InputMaybe<Scalars['String']>;
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


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }>, clientsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

export type CreateClientMutationVariables = Exact<{
  createInput: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string } };

export type RemoveClientMutationVariables = Exact<{
  removeClientId: Scalars['ID'];
}>;


export type RemoveClientMutation = { __typename?: 'Mutation', removeClient: { __typename?: 'Client', id: string } };

export type ClientContactsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindClientContactOrderBy> | FindClientContactOrderBy>;
  pagination?: InputMaybe<Pagination>;
}>;


export type ClientContactsQuery = { __typename?: 'Query', clientContacts: Array<{ __typename?: 'ClientContact', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, celular: string, email: string, position: string, telefono?: string | null, client?: { __typename?: 'Client', id: string, name: string, numberDocument: string, telefono?: string | null, type?: TypeClientEnum | null, email: string } | null }>, clientContactsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

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

export type DepartmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type DepartmentsQuery = { __typename?: 'Query', departments: Array<{ __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string }> };

export type CitiesQueryVariables = Exact<{
  departmentId?: InputMaybe<Scalars['ID']>;
}>;


export type CitiesQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string, department?: { __typename?: 'Department', code: number, createdAt: any, deletedAt?: any | null, id: string, name: string, updatedAt: any } | null }> };

export type ParametersQueryVariables = Exact<{
  pagination?: InputMaybe<Pagination>;
}>;


export type ParametersQuery = { __typename?: 'Query', parameters: Array<{ __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, url: string, fileMongoId: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes } | null }>, parametersCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

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


export type CreateParameterMutation = { __typename?: 'Mutation', createParameter: { __typename?: 'Parameter', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, codigo: string, descripcion: string, type: TypeParameterEnum, valueInt?: number | null, valueString?: string | null, valueDate?: any | null, valueFile?: { __typename?: 'FileInfo', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, fileName: string, fileExtension: string, fileMode: FileModes, fileMongoId: string, url: string } | null } };

export type UsersQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindUsersOrderBy> | FindUsersOrderBy>;
  where?: InputMaybe<FindUsersWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, name: string } | null, department?: { __typename?: 'Department', id: string, name: string } | null, country?: { __typename?: 'Country', id: string, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, name: string }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string }> }>, usersCount: { __typename?: 'MetadataPagination', currentPage?: number | null, itemsPerPage?: number | null, totalItems?: number | null, totalPages?: number | null } };

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

export type VisitsQueryVariables = Exact<{
  orderBy?: InputMaybe<Array<FindVisitOrderBy> | FindVisitOrderBy>;
  where?: InputMaybe<FindVisitWhere>;
  pagination?: InputMaybe<Pagination>;
}>;


export type VisitsQuery = { __typename?: 'Query', visits: Array<{ __typename?: 'Visit', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, description: string, location?: string | null, dateVisit: any, status: StatusVisitEnum, isProyect: boolean, client: { __typename?: 'Client', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, numberDocument: string, email: string, telefono?: string | null, address?: string | null, type?: TypeClientEnum | null, vertical?: string | null, celular: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null }, type: { __typename?: 'VisitType', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, status: VisitTypeStatusEnum }, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } }>, visitsCount: { __typename?: 'MetadataPagination', totalItems?: number | null, itemsPerPage?: number | null, totalPages?: number | null, currentPage?: number | null } };

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
export const ClientContactsDocument = gql`
    query ClientContacts($orderBy: [FindClientContactOrderBy!], $pagination: Pagination) {
  clientContacts(orderBy: $orderBy, pagination: $pagination) {
    id
    createdAt
    updatedAt
    deletedAt
    name
    numberDocument
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
  clientContactsCount(orderBy: $orderBy, pagination: $pagination) {
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