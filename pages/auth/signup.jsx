import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useState} from 'react'
import { signIn } from 'next-auth/react'
import { Button, Form,Alert } from 'react-bootstrap'
import myimg from 'public/assets/img/bg-foto-5.jpg'



const Signup = () => {
  const [authState, setAuthState] = useState({username: '' , email: '' })
  const [pageState, setPageState] = useState({error: '' , processing: false})
  const router =  useRouter()


  const handleFieldChange = (e) => {
    setAuthState(old => ({ ...old, [e.target.id]: e.target.value }))
  } 


  const simplifyError = (error) => {
    const errorMap = {
        "CredentialsSignin": "Invalid username or password"
    }
    return errorMap[error] ?? "Unknown error occurred"
  } 


  const handleAuth = async () => {
    setPageState(old => ({...old, processing: true, error: ''}))
    signIn('credentials', {
        ...authState,
        redirect: false
    }).then(response => {
        console.log(response)
        if (response.ok) {
            router.push("/")
        } else {
            setPageState(old => ({ ...old, processing: false, error: response.error }))
        }
    }).catch(error => {
        console.log(error)
        setPageState(old => ({...old, processing: false, error: error.message ?? "Something went wrong!"}))
    })
  }

 const handleGoogleauth = () => signIn('google',{callbackUrl:"http://localhost:3000"})


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
            {
                    pageState.error !== '' && <Alert>{simplifyError(pageState.error)}</Alert>
            }
              <Form.Group  controlId="Name">
                  <Form.Control type="text" placeholder="Name"/>
              </Form.Group>
              <Form.Group  controlId="email">
                  <Form.Control type="email" placeholder="Email" onChange={handleFieldChange} value={authState.email}/>
              </Form.Group>

              <Form.Group  controlId="password">
                  <Form.Control type="password" placeholder="Password" onChange={handleFieldChange} value={authState.password}/>
              </Form.Group>
            </div>
            <div className="body-buttons">
                <Button  onClick={handleAuth}>
                  <div>Create an account</div>
                </Button>
                
                <h5>Or</h5>

                <Button onClick={handleGoogleauth} >
                  <div className="google">                  
                    <div>Continue with Google</div>
                  </div>
                </Button>
            </div>
          </div>      
        </div>
      </div>
    </div>
  )
}

export default Signup