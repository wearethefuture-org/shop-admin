export interface IUserCreeds {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUserItem;
  token: string;
}

export interface IUserItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: string;
  email: string;
  password: string;
  telegramId?: string;
  role: {
    name: string;
    id: number;
    description: string;
  };
  avatar?: {
    name: string;
  };
}

export interface IError {
  statusCode: number;
  message: string;
}

export interface IUserState {
  user: IUserItem | null;
  isFetching: boolean;
  isLoggedIn: boolean;
  error: IError | null;
  avatarLink: string;
}

export interface IUserReqUp {
  id: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  roleId?: number;
  password?: string;
  email?: string;
  telegramId?: string;
}

export interface IUserReqAdd {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  roleId: number;
  telegramId: string;
}

export interface IUsersData {
  list: Array<IUserItem>;
  loading: boolean;
  currentUser: IUserItem | null;
  error: string | null;
  count: number;
  totalPages: number;
  isSearch: boolean;
  paginationPage: number;
  searchValue: null | string;
  paginationPageSearch: number;
  currentPage: number;
}

export interface UserTableData {
  id: number;
  createdAt: string;
  updatedAt: string;
  email: string;
  newPassword: string;
  role: string;
  users: number;
}

export interface IOrderUser {
  id: number;
  dateOfBirth?: string;
  email: string;
  facebookId?: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IResponseMessage {
  success?: boolean;
  message: string;
}

export interface IUsersSearchResponse {
  data: IUserItem[];
  count: number;
  totalPages: number;
}

export interface UsersTableProps {
  list: IUserItem[];
  activeColumns: string[];
  isSearch: boolean;
  searchValue: string;
  count: number;
  paginationPage: number;
}
