import Login from "../../components/login/Login";
import React, { useEffect, useState } from 'react';

const Home = () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if(token){
        return <h1>Hello, {user && user.displayName}</h1>
    }else{
        return <Login />
    }
}

export default Home;