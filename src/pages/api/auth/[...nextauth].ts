import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from '../users/dbconfig/dbconfig'
import Signup from '../models/signup'
import Jwt from 'jsonwebtoken';


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider(
      {
        name: "credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(Credentials, req) {
          await connectDB()
          const user =  await Signup.findOne({'email':Credentials.username,'password':Credentials.password})
          if (user) {
            return user
          } else {
            return null
          }
        }
      }
    ),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),


  ],
  callbacks: {
    async jwt({ token, user}) {
      if (user) {
        console.log(101,user)
        const token2 = await Jwt.sign({ email: user.email , _id:user.id }, 'this key is private')
        token.id = user.id;
        token.name = user.name;
        token.token = token2
        token._id = user.id
      }
      return Promise.resolve(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      let newSession = {expires:session.expires,user:session.user,userData:token}
      return newSession
    },
    async signIn({ user, account, profile, email }) {
      // Check if the user already exists
      await connectDB()
      console.log(103,profile)

      const existingUser = await Signup.findOne({ email:profile.email });
      console.log(102,existingUser)

      if (existingUser==null) {
        // Create the user only if they don't exist
        try {
          const givenName = (profile as { given_name?: string }).given_name;
          const familyname = (profile as { family_name?: string }).family_name;
          const picture = (profile as { picture?: string }).picture;

          const newUser = new Signup({
            // Any other user data you want to save
            name:givenName ,
            lastname:familyname,
            userName:`${Date.now()}`,
            userImage:picture,
            profession:'',
            phone: `${Date.now()}`,
            email: profile.email,
            password: 'gitgurus',
            roles:[],
            isvarify:'true',
            isvarifiedWriter:'',
            bio:'',
            usermeta:[],
            date: Date.now(),
          });

          console.log('newUser',newUser)
          user.id = newUser._id
          await newUser.save();
          
        } catch (error) {
          if (error.code === 11000 && error.keyPattern && error.keyPattern.phone) {
            // Duplicate phone number
            console.error('Phone number already exists');
            // Handle the duplicate phone number error
          } else {
            // Handle other errors
            console.error('An error occurred:', error);
            // Handle the error as needed
          }
        }
        return true;
      }

      user.id = existingUser._id


      return true; // Continue the sign-in process
    },
  },
}

export default NextAuth(authOptions)
