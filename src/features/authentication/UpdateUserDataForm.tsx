import { useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import { useUser } from './useUser';
import { useUpdateUserData } from './useUpdateUserData';
import { UpdateUserData } from './user.types';

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useUser();

  const { fullName: currentFullName, email } = user!;

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  const { isUpdatingUserData, updateUserData } = useUpdateUserData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName) return;

    const updateData: UpdateUserData = { fullName };
    if (avatar) updateData.avatar = avatar;

    updateUserData(updateData, {
      onSuccess: () => {
        setAvatar(null);
        (e.target as HTMLFormElement).reset();
      },
    });
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name" labelFor="fullName">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdatingUserData}
        />
      </FormRow>

      <FormRow label="Avatar image" labelFor="avatar">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatar(e.target.files[0]);
            }
          }}
          disabled={isUpdatingUserData}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          disabled={isUpdatingUserData}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button disabled={isUpdatingUserData}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
