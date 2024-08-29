import { FieldErrors, useForm } from "react-hook-form"

type FormValues = {
    name: string;
    email: string;
    message: string;
}

export default function ContactForm() {
    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
        mode: "onBlur"
    });
    const {register, handleSubmit, formState} = form;
    const {errors} = formState;

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log("Form errors", errors);
    }

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <div className="form-input" >
                <label htmlFor="name">Name</label>
                <input type="text" id="name" {...register("name", {
                    required: "Name is required",
                    minLength: {value: 3, message: "Name must be at least 3 characters long"}
                })} />
                <p className="error">{errors.name?.message}</p>
            </div>

            <div className="form-input">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" {...register("email", {
                    required: "Email is required",
                    pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address"}
                })}/>
                <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-input">
                <label htmlFor="message">Message</label>
                <textarea id="message" {...register("message", {
                    required: "Message is required",
                    minLength: {value: 10, message: "Message must be at least 10 characters long"}
                })}/>
                <p className="error">{errors.message?.message}</p>
            </div>

            <button type="submit">Send</button>
        </form>
    )
}