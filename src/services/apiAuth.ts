import {
  IUser,
  LoginCredentials,
  ResetPasswordData,
  SignupData,
  UpdateUserPasswordData,
} from '../features/authentication/user.types';

const URL = import.meta.env.VITE_SERVER_URL;

interface ErrorResponse {
  status: string;
  message: string;
}

export async function signup(signupData: SignupData) {
  const res = await fetch(`${URL}/users/signup`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(signupData),
    headers: {
      'Content-Type': 'application/json',
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

export async function verifyEmail(emailVerificationToken: string) {
  const res = await fetch(
    `${URL}/users/verify-email/${emailVerificationToken}`,
    {
      method: 'PATCH',
      credentials: 'include',
    }
  );

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

export async function login(loginCredentials: LoginCredentials) {
  const res = await fetch(`${URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify(loginCredentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
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

export async function logout() {
  const res = await fetch(`${URL}/users/logout`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
  }
}

export async function forgotPassword(email: string) {
  const res = await fetch(`${URL}/users/forgot-password`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
  }

  const data = (await res.json()) as { status: 'success'; message: string };

  return data.message;
}

export async function resetPassword(resetPasswordData: ResetPasswordData) {
  const res = await fetch(
    `${URL}/users/reset-password/${resetPasswordData.resetToken}`,
    {
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify(resetPasswordData.passwords),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

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

export async function updateUserPassword(
  updateUserPasswordData: UpdateUserPasswordData
) {
  const res = await fetch(`${URL}/users/update-my-password`, {
    method: 'PATCH',
    credentials: 'include',
    body: JSON.stringify(updateUserPasswordData),
    headers: {
      'Content-Type': 'application/json',
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
