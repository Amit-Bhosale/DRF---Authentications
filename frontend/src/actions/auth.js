import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  LOGOUT,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
} from "../actions/types";
import auth from "../reducers/auth";



export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `JWT ${localStorage.getItem("access")}`,
        'Accept': "application/json",
      },
    };
    try {
      const res = await axios.get(`/auth/users/me/`, config);
      dispatch({
        type: USER_LOAD_SUCCESS,
        payload: res.data,
      });
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: USER_LOAD_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOAD_FAIL,
    });
  }
};


export const googleAuthenticate=(state,code)=>async dispatch=>{
  if(state && code && !localStorage.getItem('access')){
    const config={
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    };
    const detials={
      'state':state,
      'code':code
    };

    const formBody=Object.keys(detials).map(key=>encodeURIComponent(key) + "=" + encodeURIComponent(detials[key])).join('&');

    try {
      const res=await axios.post(`/auth/o/google-oauth2/?${formBody}`,config);
      dispatch({
        type:GOOGLE_AUTH_SUCCESS,
        payload:res.data
      });
      dispatch(load_user());
    } catch (error) {
      dispatch({
        type:GOOGLE_AUTH_FAIL
      })
    }

  }
}

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json",
      }
    };
    const body=JSON.stringify({token:localStorage.getItem('access')})
    try {
        const res=await axios.post(`/auth/jwt/verify/`,body,config)
        if (res.data.code!=='token_not_valid') {
            dispatch({
                type:AUTHENTICATED_SUCCESS
            })
        }
        else{
            dispatch({
                type:AUTHENTICATED_FAIL
            })
        }
    } catch (err) {
        dispatch({
            type:AUTHENTICATED_FAIL
        })
    }
  } 
  else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};


export const signup=(first_name, last_name,email,password,re_password)=>async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({first_name, last_name, email, password,re_password });

  try {
    const res = await axios.post(`/auth/users/`, body, config);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const verify=(uid,token)=>async dispatch=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({uid,token});
  try {
    const res = await axios.post(`/auth/users/activation/`, body, config);
    dispatch({
      type: ACTIVATION_SUCCESS,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
}


export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`/auth/jwt/create/`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const reset_password=(email)=>async dispatch=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body=JSON.stringify({email});
  try {
    await axios.post(`/auth/users/reset_password/`,body,config);
    dispatch({
      type:PASSWORD_RESET_SUCCESS
    });
  } catch (err) {
    dispatch({
      type:PASSWORD_RESET_FAIL
    })
  }
};

export const reset_password_confirm=(uid,token,new_password,re_new_password)=>async dispatch=>{
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body=JSON.stringify({uid,token,new_password,re_new_password});
  
  try {
    await axios.post(`/auth/users/reset_password_confirm/`,body,config);
    dispatch({
      type:PASSWORD_RESET_CONFIRM_SUCCESS
    });
  } catch (err) {
    dispatch({
      type:PASSWORD_RESET_CONFIRM_FAIL
    })  
  }

}


export const logout = () => dispatch=>{
  dispatch({
    type: LOGOUT,
  });
};
