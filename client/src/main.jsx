import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import CourseProvider from './context/CourseContext'
import StudentProvider from './context/StudentContext'
import PaymentProvider from './context/PaymentContext'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
           
        <AuthProvider>
                <CourseProvider>
                        <StudentProvider>
                                <PaymentProvider>
                                
                                <Router>
                                    
                                <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
                                               
                                        </Router>
                             
                                       
                                </PaymentProvider>

                        </StudentProvider>

                </CourseProvider>


        </AuthProvider>




)
