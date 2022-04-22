import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/Auth';

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth()

  const onSubmit = async (data: any) => {
    try {
      await login(data)
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
         
          <input
            type="email"
            id="email"
            {...register('email')}
            />
        </div>
        <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
                type="password"
                id="password"
                {...register('password')}
            />
        </div>
        <button type="submit" className="btn btn-primary">
            Login
        </button>
        </form>
    </div>
    );
}