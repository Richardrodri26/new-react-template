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
  updatedAt: Scalars['DateTime'];
  user?: Maybe<User>;
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
  celular: Scalars['String'];
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  numberDocument: Scalars['String'];
  telefono?: InputMaybe<Scalars['String']>;
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
  cityId: Scalars['ID'];
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
  location?: InputMaybe<Scalars['String']>;
  status: StatusVisitEnum;
  userId: Scalars['String'];
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
  celular?: InputMaybe<Scalars['String']>;
  cityId?: InputMaybe<Scalars['String']>;
  countryId?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  numberDocument?: InputMaybe<Scalars['String']>;
  telefono?: InputMaybe<Scalars['String']>;
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
  location?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusVisitEnum>;
  userId?: InputMaybe<Scalars['String']>;
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
  dateVisit: Scalars['String'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  isProyect: Scalars['Boolean'];
  location?: Maybe<Scalars['String']>;
  status: StatusVisitEnum;
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

export type WssRecipient = {
  document?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
  phonePrefix?: InputMaybe<Scalars['String']>;
};

export type SigninMutationVariables = Exact<{
  signinInput: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> } } };

export type UserFragmentFragment = { __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string, city?: { __typename?: 'City', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, department?: { __typename?: 'Department', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, country?: { __typename?: 'Country', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, code: number, name: string } | null, userRoles: Array<{ __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null, users?: Array<{ __typename?: 'User', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name?: string | null, middleName?: string | null, lastName?: string | null, secondSurname?: string | null, email: string, identificationType?: UserDocumentTypes | null, identificationNumber?: string | null, dateIssue?: any | null, legalRepresentativeIdentificationType?: UserDocumentTypes | null, legalRepresentativeIdentificationNumber?: string | null, phoneCountryCode?: string | null, phoneNumber?: string | null, address?: string | null, hasRural?: boolean | null, confirmationCode?: string | null, position?: string | null, status: UserStatusTypes, phoneVerification: boolean, emailVerification: boolean, type: UserTypes, fullName: string }> | null, roleFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string }> }>, userRolesFx: Array<{ __typename?: 'RoleFx', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, permission: string, role?: { __typename?: 'Role', id: string, createdAt: any, updatedAt: any, deletedAt?: any | null, name: string, description: string, defaultForType?: UserTypes | null } | null }> };

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