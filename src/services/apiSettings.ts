import { ISetting, SettingFormData } from '../features/settings/settings.types';

const URL = import.meta.env.VITE_SERVER_URL;

interface ErrorResponse {
  status: string;
  message: string;
}

export async function getSettings() {
  const res = await fetch(`${URL}/settings`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    // throw new Error(errData.message);
    throw new Error('Settings could not be loaded');
  }

  const data = (await res.json()) as {
    status: 'success';
    data: { setting: ISetting };
  };
  return data.data.setting;
}

export async function updateSetting(newSetting: Partial<SettingFormData>) {
  const res = await fetch(`${URL}/settings`, {
    method: 'PATCH',
    body: JSON.stringify(newSetting),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Settings could not be loaded');
  }
}
