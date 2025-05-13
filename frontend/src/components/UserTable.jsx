
/*
import {
  Table,
  Button,
  Group,
  Switch,
  Modal,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:5000/api/users");
  return data;
};

function UserTable() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [modalOpened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "admin",
    status: "active",
  });

  const saveUser = useMutation({
    mutationFn: (user) => {
      if (user.id) {
        return axios.put(`http://localhost:5000/api/users/${user.id}`, user);
      } else {
        return axios.post("http://localhost:5000/api/users", user);
      }
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "User saved",
        color: "green",
      });
      queryClient.invalidateQueries(["users"]);
      close();
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to save user",
        color: "red",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/api/users/${id}`),
    onSuccess: () => {
      notifications.show({
        title: "Deleted",
        message: "User removed",
        color: "red",
      });
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <>
      <Group position="apart" my="md">
        <h2>Users</h2>
        <Button
          onClick={() => {
            setForm({
              id: null,
              name: "",
              email: "",
              role: "admin",
              status: "active",
            });
            open();
          }}
        >
          Add User
        </Button>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <Switch
                  checked={u.status === "active"}
                  onChange={() =>
                    saveUser.mutate({
                      ...u,
                      status: u.status === "active" ? "inactive" : "active",
                    })
                  }
                />
              </td>
              <td>
                <Group spacing="xs">
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => {
                      setForm(u);
                      open();
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    color="red"
                    onClick={() => deleteUser.mutate(u.id)}
                  >
                    Delete
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        opened={modalOpened}
        onClose={close}
        title={form.id ? "Edit User" : "Add User"}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser.mutate(form);
          }}
        >
          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.currentTarget.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.currentTarget.value })}
            required
            mb="sm"
          />
          <Group position="right" mt="md">
            <Button type="submit">{form.id ? "Update" : "Create"}</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default UserTable;


*/
import {
  Table,
  Button,
  Group,
  Switch,
  Modal,
  TextInput,
  Select,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";

const fetchUsers = async () => {
  const { data } = await axios.get("http://localhost:5000/api/users");
  return data;
};

function UserTable() {
  const queryClient = useQueryClient();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const [modalOpened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    role: "admin",
    status: "active",
  });

  const saveUser = useMutation({
    mutationFn: (user) => {
      if (user.id) {
        return axios.put(`http://localhost:5000/api/users/${user.id}`, user);
      } else {
        return axios.post("http://localhost:5000/api/users", user);
      }
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "User saved",
        color: "green",
        size: "sm",
         position: "top-center",
      });
      queryClient.invalidateQueries(["users"]);
      close();
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to save user",
        color: "red",
        size: "sm",
         position: "top-center",
      });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:5000/api/users/${id}`),
    onSuccess: () => {
      notifications.show({
        title: "Deleted",
        message: "User removed",
        color: "red",
        size: "sm",
         position: "top-center",
      });
      queryClient.invalidateQueries(["users"]);
    },
  });

  return (
    <>
      <Group position="apart" my="md">
        <h2>User Management</h2>
        <Button
          onClick={() => {
            setForm({
              id: null,
              name: "",
              email: "",
              role: "admin",
              status: "active",
            });
            open();
          }}
        >
          Add User
        </Button>
      </Group>

      <Flex justify="center" align="center" style={{ height: "70vh" }}>
        <Table
          striped
          highlightOnHover
          withColumnBorders
          style={{
            width: "60%",
            tableLayout: "fixed",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "center" }}>Name</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Email</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Role</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Status</th>
              <th style={{ padding: "10px", textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{ padding: "10px", textAlign: "center" }}>{u.name}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{u.email}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>{u.role}</td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Switch
                    checked={u.status === "active"}
                    onChange={() =>
                      saveUser.mutate({
                        ...u,
                        status: u.status === "active" ? "inactive" : "active",
                      })
                    }
                    size="xs"
                  />
                </td>
                <td style={{ padding: "10px", textAlign: "center" }}>
                  <Group spacing="xs" justify="center">
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => {
                        setForm(u);
                        open();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="outline"
                      color="red"
                      onClick={() => deleteUser.mutate(u.id)}
                    >
                      Delete
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Flex>

      <Modal
        opened={modalOpened}
        onClose={close}
        title={form.id ? "Edit User" : "Add User"}
        centered
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveUser.mutate(form);
          }}
        >
          <TextInput
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.currentTarget.value })}
            required
            mb="sm"
          />
          <TextInput
            label="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.currentTarget.value })
            }
            required
            mb="sm"
          />
          <Select
            label="Role"
            data={["admin", "editor", "viewer"]}
            value={form.role}
            onChange={(value) => setForm({ ...form, role: value })}
            required
            mb="sm"
            searchable
            withinPortal
            nothingFound="No roles"
          />
          <Group position="right" mt="md">
            <Button type="submit">{form.id ? "Update" : "Create"}</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default UserTable;



