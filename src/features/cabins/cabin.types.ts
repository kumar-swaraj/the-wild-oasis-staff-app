export interface ICabin {
  _id: string;
  name: string;
  description: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface CabinFormDataObj {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}
