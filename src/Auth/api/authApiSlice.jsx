import {ApiSlice} from "../../features/apiSlice"

export const authApiSlice = ApiSlice.injectEndpoints({
  endpoints:builder=>({
    //register user
    register:builder.mutation({
        query:body =>({
          url:"/users/register",
          method:"POST",
          body:body
        })
    }),
    verifyEmail : builder.mutation({
      query: body =>({
        url:"/auth/verify-email",
        method:"POST",
        body:body
      })
    }),
    resendMail : builder.mutation({
      query: body =>({
        url:"/users/resendMail",
        method:"POST",
        body:body
      })
    }),
    
    sendPwdPermit : builder.mutation({
      query: body =>({
        url:"/auth/pwd-permit",
        method:"POST",
        body:body
      })
    }),
     
    
    
  }),
})


export const {
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendMailMutation,
  useSendPwdPermitMutation
} = authApiSlice