import { Button } from "flowbite-react"
import {AiFillGoogleCircle} from "react-icons/ai"
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { app } from "../firebase"

const OAuth = () => {
    const auth=getAuth(app)
    const handleClick=async()=>{
        const provider=new GoogleAuthProvider()
        provider.setCustomParameters({prompt:"select_account"})

        try {
            const resultsFromGoogle=await signInWithPopup(auth,provider)


            console.log(resultsFromGoogle)

            // save this information in database with and save it in redux - WIP
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Button type="button" gradientDuoTone={"pinkToOrange"} outline  onClick={handleClick}>
        <AiFillGoogleCircle className="w-6 h-6 mr-2"/>
        <span className="flex justify-center items-center">Continue with Google</span>
    </Button>
  )
}

export default OAuth