import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { DataProvider } from './contexts/DataContext'
import { routes } from './routes'
import { AuthProvider } from './contexts/auth-context'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
        <AuthProvider>
          <GlobalStyle />
            <DataProvider>
              <RouterProvider router={routes} />
            </DataProvider>
        </AuthProvider>
    </ThemeProvider>
  )
}
