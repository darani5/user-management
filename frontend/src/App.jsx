import React from 'react';
import {
  MantineProvider,
  Container,
} from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import UserTable from './components/UserTable';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" />

        <Container
          size="xl"
          fluid
          px={0}
          py={0}
          m={0}
          style={{
            marginTop: 0,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          <UserTable />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}
