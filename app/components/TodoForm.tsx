"use client"
import {Button, FormControl, Input, FormErrorMessage} from '@chakra-ui/react';
import {Form, Formik, Field} from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function TodoForm() {
    const router = useRouter();
    const refreshData = () => {
        router.replace('/');
      }
    const notify = (msg) => toast(msg);
    const TodoSchema = Yup.object().shape({
        title: Yup.string()
          .min(3, 'title is too Short! (atleast 3 characters required)')
          .max(15, 'title is too long (15 characters allowed)')
          .required('Please provide the title'),
        description: Yup.string()
            .min(3, 'description is too Short! (atleast 5 characters required)')
            .max(15, 'description is too long (Max. 50 characters allowed)')
            .required('Please provide the description'),
        });
    
    return (
        <>
            <Formik
            initialValues={
                {
                    title:'',
                    description:'',
                    status:false
                }
            }
            validationSchema={TodoSchema}
            onSubmit={async (values, actions) => {
                try {
                    const res = await fetch('http://localhost:3000/api/todos', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  })
                  notify("Todo has been created!")
                  refreshData();
                  actions.resetForm()  
                } catch (error) {
                    notify(error.message)
                }      
                actions.setSubmitting(false)
            }}
            >
            {
                (props)=>(
                    <Form>
                        <Field name='title'>
                            {({ field, form }) => (
                            <FormControl my={6} isInvalid={form.errors.title && form.touched.title}>
                                <Input {...field} placeholder='Enter Title' />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Field name='description'>
                            {({ field, form }) => (
                            <FormControl my={6} isInvalid={form.errors.description && form.touched.description}>
                                <Input {...field} placeholder='Enter description' />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Button colorScheme='teal' type='submit'> Save Todo </Button>
                    </Form> 
                )
            } 
            
        </Formik>  
        <ToastContainer />
        </>      
    )
  }
