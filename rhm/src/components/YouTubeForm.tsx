import { useForm, useFieldArray, FieldErrors } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useEffect } from 'react';

type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
        facebook: string;
        twitter: string;
    }
    phoneNumbers: string[];
    phNumbers: {
        number: string;
    }[];
    age: number;
    dob: Date
}

let renderCount = 1;

export const YouTubeForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "batman",
            email: "",
            channel: "",
            social: {
                facebook: "",
                twitter: ""
            },
            phoneNumbers: ["", ""],
            phNumbers: [{number: ""}],
            age: 0,
            dob: new Date()
        },
        mode: "onBlur",
    });
    const {register, control, handleSubmit, formState, watch, getValues, setValue, reset} = form;
    const {errors, isDirty, isValid, isSubmitting, isSubmitSuccessful} = formState;

    const {fields, append, remove} = useFieldArray({
        name: "phNumbers",
        control
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form submitted", data);
    }

    const onError = (errors: FieldErrors<FormValues>) => {
        console.log("Form errors", errors);
    }

    const handleGetValues = () => {
        console.log("Get values", getValues());
    }

    const handleSetValues = () => {
        setValue("username", "superman");
    }


    useEffect (() => {
        if (isSubmitSuccessful) {
            reset();   
        }
    }, [isSubmitSuccessful, reset])

    useEffect(() => {
        const subscription = watch((value) => {
            console.log("Watched value", value);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    // const watchUsername = watch("username");
    return (
        <div>
            <h1>YouTube Form ({renderCount++})</h1>
            <h2>Watched value: </h2>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" {...register("username", {required: "Username is required"})} />
                    <p className='error'>{errors.username?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email"  {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address"
                        },
                        validate: {
                            notAdmin: (fieldValue) => {
                                return fieldValue !== "admin@example.com" || "Enter a different email address";
                            },
                            notBlacklisted: (fieldValue) => {
                                return !fieldValue.endsWith("baddomain.com") || "This domain is not supported";
                            },
                            emailAvailable: async (fieldValue) => {
                                const response = await fetch(
                                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                                );
                                const data = await response.json();
                                return data.length === 0 || "Email already exists";
                            }
                        }
                    })} />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel"  {...register("channel", {required: "Channel is required"})}/>
                    <p className='error'>{errors.channel?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="twitter">Twitter</label>
                    <input type="text" id="twitter"  {...register("social.twitter",
                        {
                            disabled: watch("channel") === "",
                            required: "Enter twitter profile"
                        }
                    )}/>
                </div>

                <div className='form-control'>
                    <label htmlFor="facebook">Facebook</label>
                    <input type="text" id="facebook"  {...register("social.facebook")}/>
                </div>

                <div className='form-control'>
                    <label htmlFor="primary-phone">Primary phone number</label>
                    <input type="text" id="primary-phone"  {...register("phoneNumbers.0")}/>
                </div>

                <div className='form-control'>
                    <label htmlFor="secondary-phone">Secondary phone number</label>
                    <input type="text" id="secondary-phone"  {...register("phoneNumbers.1")}/>
                </div>

                <div className='form-control'>
                    <label>List of phone numbers</label>
                    <div>
                        {fields.map((field, index) => (
                            <div className='form-control' key={field.id}>
                                <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                                {
                                    index > 0 && (
                                        <button type='button' onClick={() => remove(index)}>Remove</button>   
                                    )
                                }
                            </div>
                        ))}
                        <button type='button' onClick={() => append({number: ""})}>Add phone number</button>
                    </div>
                </div>

                <div className='form-control'>
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age"  {...register("age", {
                        valueAsNumber: true,
                        required: "Age is required"})
                    }/>
                    <p className='error'>{errors.age?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="dob">Date of birth</label>
                    <input type="date" id="dob"  {...register("dob", {
                        valueAsDate: true,
                        required: "Date of birth is required"})
                    }/>
                    <p className='error'>{errors.dob?.message}</p>
                </div>

                <button disabled={!isDirty || !isValid || !isSubmitting}>Submit</button>
                <button type='button' onClick={handleGetValues}>Get Values</button>
                <button type='button' onClick={handleSetValues}>Set Value</button>
                <button type='button' onClick={() => reset()}>Reset</button>
            </form>
            <DevTool control={control}/>
        </div>
    );
}