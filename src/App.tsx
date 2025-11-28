import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { queryClient, apolloClient } from './main.config'
import { appRouter } from './router'
import { ApolloProvider } from '@apollo/client';
import { AlertRoot } from './composables/AlertRoot'
import { Toaster } from './components/ui/sonner'
import ScrollToTop from './components/Utils/ScrollToTop'


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={appRouter} />
          <AlertRoot />
          <Toaster richColors theme='light' />
        </ApolloProvider>

      </QueryClientProvider>
      
    </>
  )
}

export default App
