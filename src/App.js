import { useState, useEffect } from 'react';

// react-router components
import { Routes, Route, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// React examples
import Sidenav from 'examples/Sidenav';

// React themes
import theme from 'assets/theme';

// React contexts
import { useSoftUIController, setMiniSidenav } from 'context';

// Images
import brand from 'assets/images/logo-ct.png';
import Tables from 'layouts/tables';
import { useQuery } from 'react-query';
import { getTables } from 'http/restApi';

const App = () => {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const { isLoading, data: tables } = useQuery(['transactions'], () =>
    getTables()
  );

  const routes =
    (!isLoading &&
      tables?.map(
        (table, index) =>
          table[index] !== 'migrations' && {
            type: 'collapse',
            name:
              String(table).charAt(0).toUpperCase() + String(table).slice(1),
            key: `${table}`,
            route: `/${table}`,
            icon: [
              'people_icon',
              'admin_panel_settings_icon',
              'group_work_icon',
              'currency_bitcoin_icon',
              'star_rate_icon',
              'inventory2',
              'info',
              'image',
              'category',
              'category'
            ][index - 1],
            component: <Tables tableName={table} index={index} />,
            noCollapse: true
          }
      )) ||
    [];

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes?.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidenav
        color={sidenavColor}
        brand={brand}
        brandName='Supabase Tables'
        routes={routes}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      <Routes>{getRoutes(routes)}</Routes>
    </ThemeProvider>
  );
};
export default App;
