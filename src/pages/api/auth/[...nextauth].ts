import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import TwitterProvider from "next-auth/providers/twitter"
import Auth0Provider from "next-auth/providers/auth0"
import Roles from '../models/settings/roles/roles.js'
import Profile_menu from '../models/settings/menues/profilemenu.js'
import Signup from '../models/signup'
import CredentialsProvider from "next-auth/providers/credentials"
import { connectDB } from '../users/dbconfig/dbconfig'
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
          const user = await Signup.findOne({ 'email': Credentials.username, 'password': Credentials.password })
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
    async jwt({ token, user }) {
      console.log('user',user,token)
      if (user) {
        const token2 = await Jwt.sign({ email: user.email, _id: user.id }, 'this key is private',{
          expiresIn: '60s', // Set the token to expire in 60 seconds
        })
        console.log('token2',token2)
        token.id = user.id;
        token.name = user.name;
        token.token = token2
        token._id = user.id
        token.exp = '60'
       
      }
        return Promise.resolve(token);
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      
      await connectDB()
      await Profile_menu.find({})
      const existingUser = await Signup.findOne({ _id: token._id }).populate({
        path: 'roles',
        populate: {
            path: 'canaccessprofilemenus',
        },
    })
      let newSession = {strategy: 'jwt', maxAge:60, expires: session.expires, user: session.user, userData: token,existingUser }
      return newSession
    },
    async signIn({ user, account, profile, email }) {
      // Check if the user already exists
      let userEmail = ''
      if (account.type == 'credentials') {
        userEmail = user.email
      } else {
        userEmail = profile.email
      }

      const existingUser = await Signup.findOne({ email: userEmail });

      if (existingUser == null) {
        // Create the user only if they don't exist
        try {
          const givenName = (profile as { given_name?: string }).given_name;
          const familyname = (profile as { family_name?: string }).family_name;
          const picture = (profile as { picture?: string }).picture;
          let userRole = await Roles.find({title:'user'})
          
            const newUser = new Signup({
              // Any other user data you want to save
              name: givenName,
              lastname: familyname,
              userName: `${Date.now()}`,
              userImage: picture,
              profession: '',
              phone: `${Date.now()}`,
              email: profile.email,
              password: 'gitgurus',
              roles: userRole[0] ? userRole[0]._id:[],
              isvarify: 'true',
              isvarifiedWriter: '',
              bio: '',
              usermeta: [],
              date: Date.now(),
            });
          
         

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
