import {
  Modal,
  TextInput,
  Select,
  Switch,
  Button,
  Group
} from '@mantine/core';
import { useForm } from '@mantine/form';

const roles = ['admin', 'user'];

export default function UserForm({ opened, onClose, onSubmit, initialValues = {} }) {
  const form = useForm({
    initialValues: {
      name: initialValues.name || '',
      email: initialValues.email || '',
      role: initialValues.role || 'user',
      status: initialValues.status === 'active',
    },
  });

  const handleSubmit = (values) => {
    const formattedData = {
      ...values,
      status: values.status ? 'active' : 'inactive',
    };
    onSubmit(formattedData);
  };

  return (
    <Modal opened={opened} onClose={onClose} title={initialValues.id ? 'Edit User' : 'Add User'} centered>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput label="Name" placeholder="Enter name" {...form.getInputProps('name')} required />
        <TextInput mt="md" label="Email" placeholder="Enter email" {...form.getInputProps('email')} required />
        <Select
          mt="md"
          label="Role"
          data={roles}
          {...form.getInputProps('role')}
          required
        />
        <Switch
          mt="md"
          label="Active"
          checked={form.values.status}
          onChange={(event) => form.setFieldValue('status', event.currentTarget.checked)}
        />

        <Group position="right" mt="lg">
          <Button variant="default" onClick={onClose}>Cancel</Button>
          <Button type="submit">{initialValues.id ? 'Update' : 'Add'}</Button>
        </Group>
      </form>
    </Modal>
  );
}
