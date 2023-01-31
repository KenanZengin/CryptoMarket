import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button,Form,FloatingLabel  } from 'react-bootstrap'
import { useFormik } from 'formik'
import signUp_validate from '@/lib/validate'
import myimg from 'public/assets/img/bg-foto-5.jpg'



const Signup = () => {
  const router =  useRouter()

  const formik = useFormik({
    initialValues:{
        username:"",
        email:"",
        password:"",
        cpassword:""
    },
    validate:signUp_validate,
    onSubmit
  })

  async function onSubmit(values){
    const options = {
        method:"POST",
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(values)
      }
    await fetch("http://localhost:3000/api/auth/signup",options)
        .then(res=>res.json())
        .then(data=>{
            if(data) router.push('http://localhost:3000/auth/signin')
        })
  }

  return (
    <div className="modal">
      <div className='modal-signup'>
        <div className='modal-signup-content'>  
          <div className="modal-signup-content-img">
            <Image src={myimg} alt="/" />
          </div>                      
          <div className="modal-signup-content-body">
            <div className="body-title">
            <h2>Sign up</h2>
            </div> 
            <div className="body-inputs">
              <Form onSubmit={formik.handleSubmit}>

                <Form.Group>
                  <FloatingLabel     label="Username">                  
                  <Form.Control type="text" id='username' placeholder='username' {...formik.getFieldProps('username')} style={{"border":`${formik.errors.username && formik.touched.username ? "1px solid #8a1e2f":"1px solid #707171"}`}}  />
                  </FloatingLabel>
                </Form.Group>
                
                <Form.Group>
                  <FloatingLabel   label="Email address">
                      <Form.Control type="email" id='email' placeholder="Email" {...formik.getFieldProps('email')}  style={{"border":`${formik.errors.email && formik.touched.email ? "1px solid #8a1e2f":"1px solid #707171"}`}}  />
                  </FloatingLabel>            
                </Form.Group>

                <Form.Group>
                <FloatingLabel    label="Password">
                    <Form.Control type="password" id='password' placeholder="Password" {...formik.getFieldProps('password')}   style={{"border":`${formik.errors.password && formik.touched.password ? "1px solid #8a1e2f":"1px solid #707171"}`}} />
                </FloatingLabel>            
                </Form.Group>

                <Form.Group>
                <FloatingLabel    label="Confirm">
                    <Form.Control type="password" placeholder="Password" id='cpassword' {...formik.getFieldProps('cpassword')} style={{"border":`${formik.errors.cpassword && formik.touched.cpassword ? "1px solid #8a1e2f":"1px solid #707171"}`}}/>
                </FloatingLabel>          
                </Form.Group>

                <Button type='submit'>
                  Create an account
                </Button>
              </Form>
            </div>
          </div>      
        </div>
      </div>
    </div>
  )
}

export default Signup