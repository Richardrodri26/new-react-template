import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { queryClient, apolloClient } from './main.config'
import { appRouter } from './router'
import { ApolloProvider } from '@apollo/client';


function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={apolloClient}>

          <RouterProvider router={appRouter} />
        </ApolloProvider>

      </QueryClientProvider>
      
    </>
  )
}

export default App
