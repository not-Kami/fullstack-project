// src/App.tsx
import { Layout } from './ui/layout/layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Form } from './ui/components/form';

const theme = createTheme({ cssVariables: true });

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Form />
      </Layout>
    </ThemeProvider>
  );
}