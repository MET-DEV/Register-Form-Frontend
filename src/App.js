import './App.css';
import {Button, Card, CardContent, Form, Input} from 'semantic-ui-react'
import * as Yup from 'yup'
import { useFormik } from 'formik';
import axios from 'axios';

function App() {
  const message="Bu alan boş bırakılamaz"
  const schema=Yup.object().shape({
    firstname:Yup.string().required(message),
    lastname:Yup.string().required(message),
    email:Yup.string().required(message),
    password:Yup.string().required(message)
  })
  const formik=useFormik({
    initialValues:{
      firstname:"",
      lastname:"",
      email:"",
      password:""
    },validationSchema:schema,
    onSubmit:(values)=>{
      add(values)
    }
  })
  function add(values) {
    axios.post("http://localhost:8080/user",values).then((res)=>console.log(res))
  }
  return (
    <div className="App">
      <Form onSubmit={formik.handleSubmit}>
        <Card centered style={{marginTop:"100px"}}>
          <Card.Content>Ad</Card.Content>
          <Form.Field><CardContent><Input value={formik.values.firstname} name="firstname" onChange={formik.handleChange} placeholder="isim"></Input></CardContent></Form.Field>
          <Card.Content>Soyad</Card.Content>
          <Form.Field><CardContent><Input value={formik.values.lastname} name="lastname" onChange={formik.handleChange} placeholder="soyad"></Input></CardContent></Form.Field>
          <Card.Content>Email</Card.Content>
          <Form.Field><CardContent><Input value={formik.values.email} name="email" onChange={formik.handleChange} placeholder="email"></Input></CardContent></Form.Field>
          <Card.Content>Parola</Card.Content>
          <Form.Field><CardContent><Input value={formik.values.password} name="password" onChange={formik.handleChange} placeholder="parola"></Input></CardContent></Form.Field>
          <Form.Field><CardContent><Button type="submit" color="purple" style={{marginBottom:"70px"}}>Ekle</Button></CardContent></Form.Field>
        </Card>
      </Form>
    </div>
  );
}

export default App;
