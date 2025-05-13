import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        {/* Your existing components go here */}
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
