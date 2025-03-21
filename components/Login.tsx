// components/LoginCard.tsx
import React, { useEffect, useState } from "react";
import { Card, Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { login } from "@/lib/slice/authSlice";
import { AuthLogin, PostLogin } from "@/lib/api/auth";

const LoginCard: React.FC = () => {
  const [client, setIsClient] = useState(false);
  const [errorLogin, setIsErrorLogin] = useState({email:'' , password:'',errorPost : ''});
  const dispatch = useDispatch();
  const initiate : AuthLogin ={
    email:'',
    password:''
  }
const [auth, setIsAuth] = useState<AuthLogin>(initiate);
  const handleLogin = async () => {
    try {
      if(auth.email === '') {
        setIsErrorLogin({...errorLogin,email:'Harap di isi email anda !'})
        return
      }
      if(auth.password === '') {
        setIsErrorLogin({...errorLogin,password:'Harap di isi password anda !'})
        return
      }
      const data = await PostLogin(auth)
      if(data?.status === 200) {
        dispatch(login({token:data.data.token}))
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      console.log(String(error.response.data.message))
      setIsErrorLogin({...errorLogin , errorPost:error.response.data.message})
    }
  };
  useEffect(() => {
    setIsClient(true)
  }, []);
if(!client) {
  return <h1>Loading...</h1>
}
  return (
    <div  className="flex w-[300px] h-full items-center justify-center mx-auto">
      <Card title="Login">
        
        <Input placeholder="Username"  onChange={(e) => {
          setIsAuth({...auth,email:e.target.value})
        }} style={{ marginBottom: errorLogin.email === '' ? 10 : 0 }} />
        {errorLogin.email.length > 0 && (
          <p className=" text-red-600 text-xs italic mb-2.5">{errorLogin.email}</p>
        )}
        
        <Input.Password placeholder="Password"  onChange={(e) => {
          setIsAuth({...auth,password:e.target.value})
        }}  style={{ marginBottom: 10 }} />
        {errorLogin.password.length > 0 && (
          <p className=" text-red-600 text-xs italic">{errorLogin.password}</p>
        )}
        {errorLogin.errorPost.length > 0 && (
          <p className=" text-red-600 text-xs text-center italic">{errorLogin.errorPost}, Please Try Again !</p>
        )}
        <Button type="primary" block onClick={handleLogin}>
          Login
        </Button>
      </Card>
    </div>
  );
};

export default LoginCard;
