import {ApiSlice} from "../../features/apiSlice"
import {setToken,setUserInfo} from "../../features/Slice"

export const authApiSlice = ApiSlice.injectEndpoints({
  endpoints:builder=>({
    //emailLogin
    emailLogin:builder.mutation({
        query:body =>({
          url:"/auth/emailLogin",
          method:"POST",
          body:body
        })
    }),
    pwdLogin:builder.mutation({
        query:body =>({
          url:"/auth/pwdLogin",
          method:"POST",
          body:body
        })
    }),
    recover:builder.mutation({
        query:body =>({
          url:"/auth/recover",
          method:"POST",
          body:body
        })
    }),
   verifyEmailPwd:builder.mutation({
        query:body =>({
          url:"/auth/verify-email-pwd",
          method:"POST",
          body:body
        })
    }),
   pwdReset:builder.mutation({
        query:body =>({
          url:"/auth/pwd-reset",
          method:"POST",
          body:body
        })
    }),
   resendMailPwd:builder.mutation({
        query:body =>({
          url:"/auth/resendMailPwd",
          method:"POST",
          body:body
        })
    }),
    refresh:builder.mutation({
      query:()=>({
        url:"/auth/refresh",
        method:"GET"
      }),
      async onQueryStarted(arg,{dispatch,queryFulfilled}){
        try{
          const {data} = await queryFulfilled
          
          dispatch(setToken(data.accessToken))
        }catch(err){
          console.log(err)
        }
      }
    }),
    logout:builder.mutation({
        query:body =>({
          url:"/auth/logout",
          method:"POST"
        }),
        async onQueryStarted(arg,{dispatch,queryFulfilled}){
          try{
            const {data} = await queryFulfilled
            setTimeout(()=>{
              dispatch(setToken(""))
              dispatch(setUserInfo(""))
             dispatch(ApiSlice.util.resetApiState())
            },2000)
          }catch(err){
            console.log(err.message)
          }
        }
    }),
  
    
  }),
})


export const {
  useEmailLoginMutation,
  usePwdLoginMutation,
  
  useRecoverMutation,
  useVerifyEmailPwdMutation,
  usePwdResetMutation,
  useResendMailPwdMutation,
  
  useRefreshMutation,
  useLogoutMutation
} = authApiSlice