import { FieldErrors, useForm } from 'react-hook-form';

import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

import Form from '../../ui/Form';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Textarea from '../../ui/Textarea';
import FileInput from '../../ui/FileInput';

import { CabinFormDataObj, ICabin } from './cabin.types';

interface CreateCabinFormProps {
  onCloseModal?: () => void;
  cabinToEdit?: ICabin;
}

function CreateCabinForm({
  onCloseModal,
  cabinToEdit = {} as ICabin,
}: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  const { _id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<CabinFormDataObj>({
    defaultValues: isEditSession
      ? (editValues as unknown as CabinFormDataObj)
      : {},
  });

  function onSubmit(data: CabinFormDataObj) {
    const dataCopy: Partial<CabinFormDataObj> = { ...data };
    if (typeof dataCopy.image === 'string') {
      delete dataCopy.image;
    }

    if (isEditSession)
      editCabin(
        { editedCabinData: dataCopy, id: editId },
        {
          onSuccess: (_data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(data, {
        onSuccess: (_data) => {
          reset();
          onCloseModal?.();
        },
      });
  }

  function onError(_errs: FieldErrors<CabinFormDataObj>) {
    // console.error(_errs);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" labelFor="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Maximum Capacity"
        labelFor="maxCapacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register('maxCapacity', {
            valueAsNumber: true,
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        labelFor="regularPrice"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register('regularPrice', {
            valueAsNumber: true,
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be atleast 1',
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        labelFor="discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            valueAsNumber: true,
            validate: (val) =>
              val <= getValues().regularPrice ||
              'Discount should be less than regular price',
            min: {
              value: 0,
              message: "Discount can't be negative",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        labelFor="description"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register('description', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow
        label="Cabin photo"
        labelFor="image"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          disabled={isWorking}
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          disabled={isWorking}
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
