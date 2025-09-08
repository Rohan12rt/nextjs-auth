import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';


 export const getDataFromToken = (request:NextRequest) =>{
    try {
       const token =  request.cookies.get('token')?.value || "" ;
       const decodedTOKEN:any =  jwt.verify(token , process.env.TOKEN_SECRET!);
       return decodedTOKEN.id ;


        
    } catch (error:any) {
        throw new Error(error.message);
    }
 }