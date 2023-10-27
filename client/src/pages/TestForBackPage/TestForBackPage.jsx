/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllProductsQuery } from '../../store/serverResponse/danitApi.products';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { uploadHandler } from './vanilaJsHelpers';
import {
  userLoginUserAction,
  userLogutUserAction,
} from '../../store/user/user.slice';
import { userMockData } from './mockedTestData';
import { useLoginUserMutation } from '../../store/serverResponse/danitApi.auth';
import { useLazyGetWishlistQuery } from '../../store/serverResponse/danitApi.wishlist';

import styles from './TestForBackPage.module.scss';

const log = console.log;

function TestForBackPage() {
  // INIT HOOKS:
  const dispatch = useDispatch();

  // REDUX STATE:
  const { isUserLogin, token } = useSelector((state) => state.user);
  // log('USER SATATE "isLogin"', isUserLogin);
  // log('USER SATATE "token"', token);

  // RTK QUERY CUSTOM HOOKS:

  const { data: allProductsData } = useGetAllProductsQuery();
  // log('All products data: ', allProductsData);

  const [loginUserReq, { data: userToken, isSuccess: isLoginSuccess }] =
    useLoginUserMutation();
  // log('user token RTK: ', userToken);

  const [
    getWishlist,
    { data: userWishListData, isSuccess: isSuccessUserWishlistData },
  ] = useLazyGetWishlistQuery();

  // COMPONENT HANDLERS:
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(userLogutUserAction());
  };

  const checkTokenHandler = () => {
    const token = localStorage.getItem('token');
    log('loginHandler token: ', token);
  };

  const getAllProductsHandler = () => {};

  const showWishlistHandler = () => {
    log('Wishlist data: ', userWishListData);
  };

  // COMPONENT LOGIC
  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.setItem('token', userToken);
      dispatch(userLoginUserAction(userToken));
      log('useEffect scope. Works only on trigger from hook');
    }
  }, [isLoginSuccess]);

  useEffect(() => {
    if (isUserLogin) {
      getWishlist(token);
      if (isSuccessUserWishlistData) {
        log('User wishlist data: ', userWishListData);
      }
    } else {
      log('Я работаю...');
    }
  }, [isUserLogin]);

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className="">
          <button
            onClick={() => {
              loginUserReq(userMockData);
            }}
          >
            Login
          </button>
          {/* <button onClick={() => uploadHandler()}>Upload</button> */}
          <button onClick={() => checkTokenHandler()}>Check TOKEN</button>
          <button onClick={() => logoutHandler()}>Logout</button>
          <button onClick={() => showWishlistHandler()}>Show wishlist</button>
          <button onClick={() => getAllProductsHandler()}>
            Get All Products
          </button>
        </div>
        <div className={styles.btnWrapper}>
          <Link target="_blank" className={styles.wishBtn} to={'/wishlist'}>
            <span>W</span>
            {isUserLogin && <span className={styles.info}>0</span>}
          </Link>
          <Link className={styles.wishBtn} to={'/cart'}>
            <span>C</span>
            {isUserLogin && <span className={styles.info}>0</span>}
          </Link>
        </div>
      </div>
      <div className={styles.secondaryWrapper}></div>
    </>
  );
}

export default TestForBackPage;
