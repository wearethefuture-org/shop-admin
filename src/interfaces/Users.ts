export interface IUserItem {
    id: number,
    createdAt: string,
    updatedAt: string,
    email: string,
    password: string,
    role: string,
}

export interface IUsersData {
    list: Array<IUserItem>
}
  
export interface UserTableData {
    id: number;
    createdAt: string;
    updatedAt: string;
    email: string;
    password: string;
    role: string;
    users: number;
};
