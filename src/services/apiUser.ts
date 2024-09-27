import { IUser, UpdateUserData } from '../features/authentication/user.types';

const URL = import.meta.env.VITE_SERVER_URL;

interface ErrorResponse {
  status: string;
  message: string;
}

export async function getCurrentUser() {
  const res = await fetch(`${URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
    },
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
  }

  const data = (await res.json()) as {
    status: 'success';
    data: {
      user: IUser;
    };
  };

  return data.data.user;
}

export async function updateUserData(userData: UpdateUserData) {
  const userFormData = new FormData();

  if (userData.fullName) userFormData.append('fullName', userData.fullName);
  if (userData.avatar) userFormData.append('avatar', userData.avatar);

  const res = await fetch(`${URL}/users/update-me`, {
    method: 'PATCH',
    credentials: 'include',
    body: userFormData,
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
  }

  const data = (await res.json()) as {
    status: 'success';
    data: {
      user: IUser;
    };
  };

  return data.data.user;
}
