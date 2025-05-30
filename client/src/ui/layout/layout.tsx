// src/ui/layout/Layout.tsx
import { AppBar, Toolbar, Typography} from '@mui/material';
import { theme } from '../theme/theme';
import './Layout.css';
import logo from '../../assets/taktus.png';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: theme.palette.secondary.main}} >
          <img src={logo} alt="Taktus" width={32} height={32} style={{position: 'absolute', left: 12}}/>
          <Typography  sx={{color: theme.palette.text.primary, fontSize: theme.typography.h2.fontSize}}>
            Taktus
          </Typography>

        </Toolbar>
      </AppBar>

      <main>
        {children}
      </main>
      
      <footer>
        <p>&copy; Taktus {new Date().getFullYear()} - Your contacts management application</p>
      </footer>
    </>
  );
};