import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {userModel} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    // get user details from the frontend
    // Validation - not empty
    // check if user already exists :username , email
    // check for images, avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check fro user creation
    // return response

    const {fullName,userName,email,password}=req.body
    console.log("email:",email)

   if(
    [fullName, email, userName, password].some((field)=>field?.trim()=== "")
   ){
    
     throw new ApiError(400, "All Fields are Required")

   }


   const existedUser = userModel.findOne({
    $or: [{userName},{email}]
   })

   if(existedUser){
    throw new ApiError(409, "User with email or unsername already exists")
   }

   const avatarLocalPath=req.files?.avatart[0]?.path
   console.log("avatar object:", req.files?.avatart[0])

   const coverImageLocalPath=req.files?.coverImage[0]?.path

   if(!avatarLocalPath){
    throw new ApiError(400, "Avatar file is required")
   }

  
   const avatar = await uploadOnCloudinary(avatarLocalPath)
   const coverImage=await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400, "Avatar is required")
   }

 const user =  await userModel.create({
    fullName,
    avatar:avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName:userName.toLowerCase() 
   })

   const createddUser = await userModel.findById(userModel._id).select(
    "-password -refreshToken"
   )


   if(createddUser){
    throw new ApiError(500, "Something went wrong while registering the user")
   }

  return res.status(201).json(
    new ApiResponse(200, createddUser, "User registered Successfully")
  )

});

export { registerUser };
