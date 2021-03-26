import {api} from '../../../api/api';
import {IUserCreeds} from "../../../interfaces/IUsers";


export async function apiSignIn(data: IUserCreeds) {
    const user = await api.user.auth(data);
    return user.data;
}


export async function apiSignOut() {
    return;
}



