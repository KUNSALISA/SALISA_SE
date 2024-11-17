import { SignIn } from "../services/https/index";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import {SignInInterface} from '../interfaces/SignIn';
import {EmployeeInterface} from '../interfaces/InterfaceFull';

function SignInPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInInterface) => {
    let res = await SignIn(values);

    if (res.status === 200) {
      const { token, token_type, id, access_level } = res.data;

      messageApi.success("Sign-in successful");

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("token", token);
      localStorage.setItem("token_type", token_type);
      localStorage.setItem("id", id);
      localStorage.setItem("access_level", access_level);

      // Redirect based on access_level
      switch (access_level) {
        case "Manager":
          navigate("/manager");
          break;
        case "A":
          navigate("/page-a");
          break;
        case "B":
          navigate("/page-b");
          break;
        case "C":
          navigate("/page-c");
          break;
        case "D":
          navigate("/page-d");
          break;
        default:
          navigate("/dashboard");
      }
    } else {
      messageApi.error(res.data.error || "Sign-in failed");
    }
  };

  return (
    <>
      {contextHolder}
      <Form name="signIn" onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item
          label="Email"
          name="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignInPages;
