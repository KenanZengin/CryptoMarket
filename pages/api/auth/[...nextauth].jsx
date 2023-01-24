import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret : process.env.GOOGLE_SECRET
        }),
        CredentialsProvider({
            name : "Credentials",
            async authorize(credentials,req){
                if(credentials.email ==="test@gmail.com"){
                    return{
                        user : {
                            name : "test@gmail.com"
                        }
                    }
                }
                return null
            }
        })

    ],


})