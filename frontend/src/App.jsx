// src/App.jsx
import React from 'react';
import { MantineProvider, Container, Title } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import UserTable from './components/UserTable'; // You'll create this next

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="sm" />
        <Container>
          <Title order={2} align="center" my="lg">
            User Management Dashboard
          </Title>
          <UserTable />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}
