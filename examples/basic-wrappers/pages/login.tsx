import React from 'react';
import { useModel } from 'noae';

const LoginPage = () => {
  const { description } = useModel('bar');
  console.log(description);
  return (
    <div>
      <h1>Login Page</h1>
      <p>Hi,you're here,We have a 'wrappers' in IndexPage.</p>
    </div>
  );
};

export default LoginPage;
