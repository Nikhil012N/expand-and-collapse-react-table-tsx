import { TextField } from "@mui/material";
import { Fragment } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
const Hookform = () => {
    enum GenderEnums{
     female="female",
     male="male",
     other="other"
    }
    type Inputs = {
        name: string;
        age: number;
        gender:GenderEnums
    };
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>() ;
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
    return (
        <Fragment>
            <form onSubmit={handleSubmit(onSubmit)}>
                <span>Name</span>:
                <TextField
                    defaultValue="default"
                    size="small"
                    {...register("name", { required: true })}
                />
                <br />       <br />
                <span>Age</span>:{" "}
                <TextField size="small" {...register("age", { required: true , pattern:/[0-1]{1}[0-9]{0,2}/ })} />
                {errors.age && <span>This field is required</span>}
                <br />       <br />
                <span>SELECT GENDER</span>
                <select {...register("gender")}>
                <option value="female">female</option>
                <option value="male">male</option>
                <option value="other">other</option>
                </select><br/>       <br />
                <input type="submit" value="Submit"/>
            </form>
        </Fragment>
    );
};

export default Hookform;
