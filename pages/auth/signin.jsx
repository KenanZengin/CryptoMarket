import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { Button,Form,FloatingLabel  } from 'react-bootstrap'
import { useFormik } from 'formik'
import { signIn_validate } from '@/lib/validate'
import myimg from 'public/assets/img/bg-foto-5.jpg'



const Signup = () => {
  const router =  useRouter()

  const formik = useFormik({
    initialValues:{
        email:'',
        password:'',
    },
    validate:signIn_validate,
    onSubmit
})

async function onSubmit(values){
  console.log(values);
    const status = await signIn("credentials",{
        redirect:false,
        email:values.email,
        password:values.password,
        callbackUrl:"/"
    })

    if(status.ok) router.push(status.url)
}

const handleGoogle = () => signIn('google',{callbackUrl:"http://localhost:3000"})


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
                  <FloatingLabel   label="Email address">
                      <Form.Control type="email" id='email' placeholder="Email" {...formik.getFieldProps('email')}  style={{"border":`${formik.errors.email && formik.touched.email ? "1px solid #8a1e2f  ":"1px solid #707171"}`}}  />
                  </FloatingLabel>            
                </Form.Group>

                <Form.Group>
                <FloatingLabel    label="Password">
                    <Form.Control type="password" id='password' placeholder="Password" {...formik.getFieldProps('password')}   style={{"border":`${formik.errors.password && formik.touched.password ? "1px solid #8a1e2f ":"1px solid #707171"}`}} />
                </FloatingLabel>            
                </Form.Group>

                <Button type='submit'>
                  Log in
                </Button>
                <p>
                  Don't have an account?
                  <Link href={"/auth/signup"}> Sign up</Link>
                </p>
                <Button onClick={handleGoogle} >
                  <div className="google">                  
                    <div>Continue with Google</div>
                  </div>
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