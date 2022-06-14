import { Redirect } from 'noae';

export default (props) => {
  const isLogin = false;
  if (isLogin) {
    return <div>{props.children}</div>;
  }
  return <Redirect to="/login" />;
};
