import React from 'react'
import { useData } from '../../context/DataContext'
import RecruitmentList from './RecruitmentList';
import Login from '../Login/Login';
import Loader from '../Loader/Loader';
const Secret = () => {
    const {auth,isLoading} =useData();
  return (
    <div>{auth ? isLoading ? <Loader /> : <RecruitmentList /> : <Login />}</div>
  );
}

export default Secret