"use client"
import {Button, FormControl, Input, FormErrorMessage} from '@chakra-ui/react';
import {Form, Formik, Field} from 'formik'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import BeatLoader from "react-spinners/BeatLoader";
import {useState} from 'react';

export default function TodoForm(todo:any) {
    const router = useRouter();
    const refreshData = () => {
        router.replace('/');
      }
      const [isLoading, setIsLoading] = useState(false);
    const notify = (msg:string) => toast(msg);
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
                    setIsLoading(true);
                    const res = await fetch("/api/todos", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                  })
                  setIsLoading(false)
                  notify("Todo has been created!")
                  todo.getAllTodos();
                  refreshData();
                  actions.resetForm()  
                } catch (error:any) {
                    setIsLoading(false)
                    let e:string = error.message
                    notify(e)
                }      
                actions.setSubmitting(false)
            }}
            >
            {
                (props)=>(
                    <Form>
                        <Field name='title'>
                            {({ field, form }:any) => (
                            <FormControl my={6} isInvalid={form.errors.title && form.touched.title}>
                                <Input {...field} placeholder='Enter Title' />
                                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Field name='description'>
                            {({ field, form }:any) => (
                            <FormControl my={6} isInvalid={form.errors.description && form.touched.description}>
                                <Input {...field} placeholder='Enter description' />
                                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
                            </FormControl>
                            )}
                        </Field>
                        <Button colorScheme='teal' isLoading={isLoading ? isLoading:false} spinner={<BeatLoader size={8} color='white' />} type='submit'> Save Todo </Button>
                    </Form> 
                )
            } 
            
        </Formik>  
        <ToastContainer />
        </>      
    )
  }
