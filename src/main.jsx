import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MainLayout from './templates/MainLayout'
import { DataStoreProvider } from './context/DataStoreContext'
import SupabaseCrud from './functions/SupabaseCrud'
import { createClient } from '@supabase/supabase-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const supabase = createClient(
	'https://jatxzfxogmmsunywewam.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphdHh6ZnhvZ21tc3VueXdld2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY0MDgzMTgsImV4cCI6MjAxMTk4NDMxOH0.51R1YIjEVnP_J2Im_wjasF_NRxMSklo1XNXMvjBQVe4'
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={ queryClient }>
    <BrowserRouter>
      <SupabaseCrud client={ supabase } />
      <DataStoreProvider>
        <Routes>
          <Route element={ <MainLayout /> }>
            <Route path='/' element={ <Home supabaseClient={ supabase }/> }/>
          </Route>
        </Routes>
      </DataStoreProvider>
    </BrowserRouter>
  </QueryClientProvider>
)
