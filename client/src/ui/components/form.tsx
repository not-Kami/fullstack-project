import { useForm } from "react-hook-form";
import { Button, TextField, Box, Typography } from "@mui/material";

interface FormData {
    email: string;
    password: string;
}

export const Form = () => {
    const { register, handleSubmit } = useForm<FormData>();
    
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <Box>
            <Typography variant="h4">Loggez vous</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField {...register("email")} />
                <TextField {...register("password")} />
                <Button type="submit">Se connecter</Button>
            </form>
        </Box>
    )
}

