import { CabinFormDataObj, ICabin } from '../features/cabins/cabin.types';

const URL = import.meta.env.VITE_SERVER_URL;

interface ErrorResponse {
  status: string;
  message: string;
}

export async function getCabins() {
  const res = await fetch(`${URL}/cabins`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error('Cabins could not be loaded.');
  }

  const data = (await res.json()) as {
    status: 'success';
    data: { cabins: ICabin[] };
  };

  return data.data.cabins;
}

export async function deleteCabin(id: string) {
  const res = await fetch(`${URL}/cabins/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Cabin could not be deleted.');
  }
}

export async function createEditCabin(
  cabin: Partial<CabinFormDataObj>,
  id?: string
) {
  const cabinFormData = new FormData();

  Object.entries(cabin).forEach(([k, v]) => {
    if (v instanceof FileList && v.length > 0) cabinFormData.append(k, v[0]);
    else cabinFormData.append(k, v as string);
  });

  const res = await fetch(`${URL}/cabins${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    body: cabinFormData,
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error(`Cabin could not be ${id ? 'edited' : 'created'}`);
  }
}

export async function createDuplicatCabin(cabinID: string) {
  const res = await fetch(`${URL}/cabins/${cabinID}/duplicate`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    const errData = (await res.json()) as ErrorResponse;
    console.error(errData.message);
    throw new Error(errData.message);
    // throw new Error('Copy of cabin could not be created');
  }
}
