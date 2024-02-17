import { useAppContext } from "@/context/state";
import { Button,Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Icon from './Icon';

const LogoutButton = () => {
  const router=useRouter();
  const {setUser}=useAppContext()
  const handleLogout=()=>{
setUser(null)
    router.push('/')
  }
  return (
  <Button onClick={()=>handleLogout()} size={'sm'} variant={'outline'} colorScheme='red' rounded={'full'}><Text mr={2} as={'span'}>Logout</Text> <Icon  size={20} name='logout'/></Button>
  )
}

export default LogoutButton