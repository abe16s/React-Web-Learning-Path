import {useForm} from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type FormValues = {
    username: string;
    email: string;
    channel: string;
}

export const YouTubeForm = () => {
    const form = useForm<FormValues>();
    const {register, control, handleSubmit} = form;

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    }
    
    return (
        <div>
            <h1>YouTube Form</h1>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: "Username is required"})} />

                <label htmlFor="email">E-mail</label>
                <input type="email" id="email"  {...register("email", {
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Invalid email address"
                    },
                })} />

                <label htmlFor="channel">Channel</label>
                <input type="text" id="channel"  {...register("channel", {required: "Channel is required"})}/>

                <button>Submit</button>
            </form>
            <DevTool control={control}/>
        </div>
    );
}