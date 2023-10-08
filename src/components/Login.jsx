import { useSession, signIn, signOut } from "next-auth/react"
import axios from "axios"
import { toast } from 'react-toastify';
function Login() {
  const { data: session } = useSession()
  if (session) {
    const { email, image, name } = session.user
  }
  return (
    <>
      <input type="button" value="Google"
        onClick={() => signIn('google', { callbackUrl: 'https://gitgurus.com' })} />
    </>
  )
}

export default Login


const handleSignup = async (email, image, name) => {

  let data = { email, image, name }
  const res = await axios.post('/api/signup', data)
  if (res.data.CODE === 200) {
    toast('User Created Successfully', { hideProgressBar: false, autoClose: 2000, type: 'success' })
    router.push('/login')
  } else {
    toast('Something went wrong', { hideProgressBar: false, autoClose: 2000, type: 'error' })

  }
}