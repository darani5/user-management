
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
import { Container, Box } from "@mantine/core";
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
         style: {
    fontSize: "12px",  // You can change this value to make it even smaller
    padding: "5px 10px", // Adjust padding as needed
  },
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
         style: {
    fontSize: "12px",  // You can change this value to make it even smaller
    padding: "5px 10px", // Adjust padding as needed
  },
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
        size: "xs",
         position: "top-center",
         style: {
    fontSize: "12px",  // You can change this value to make it even smaller
    padding: "5px 10px", // Adjust padding as needed
  },
  
      });
      queryClient.invalidateQueries(["users"]);
    },
  });
   setTimeout(() => {
      notifications.hide(notificationId);  // Hide the notification after 5 seconds
    }, 5000);

  return (
    <>
   <Container size="md" px="md" style={{ marginTop: "0", marginLeft: "50px", paddingTop: "0" }}>

     <Group position="center" m={0} p={0}>

        <h2 position="center" >User Management</h2>
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
      



   <Box
  style={{
    marginTop: "0px",
    marginLeft: "20px", 
    backgroundColor: "#1E3A8A", 
    borderRadius: "8px",
    padding: "px",
    color: "white", 
  }}
>
  <Table
    striped
    highlightOnHover
    withColumnBorders
    style={{
      minWidth: "700px",
      color: "white", 
    }}
  >
    <thead>
      <tr>
        <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Name</th>
        <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Email</th>
        <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Role</th>
        <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Status</th>
        <th style={{ padding: "10px", textAlign: "center", color: "white" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((u) => (
        <tr key={u.id}>
          <td style={{ padding: "10px", textAlign: "center", color: "white" }}>{u.name}</td>
          <td style={{ padding: "10px", textAlign: "center", color: "white" }}>{u.email}</td>
          <td style={{ padding: "10px", textAlign: "center", color: "white" }}>{u.role}</td>
          <td style={{ padding: "10px", textAlign: "center", color: "white" }}>
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
          <td style={{ padding: "10px", textAlign: "center", color: "white" }}>
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
</Box>

  </Container>



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