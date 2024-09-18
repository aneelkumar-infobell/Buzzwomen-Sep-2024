// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
import { AuthProvider } from './AuthContext';
// components
import ScrollToTop from './components/ScrollToTop';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// ----------------------------------------------------------------------

export default function App() {
  return (
  <AuthProvider>
  <ThemeProvider>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ScrollToTop />
      <Router />
      </LocalizationProvider>
    </ThemeProvider>
    </AuthProvider>
  );
}
