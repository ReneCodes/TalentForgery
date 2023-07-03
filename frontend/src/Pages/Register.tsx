// @ts-ignore
import React, { ChangeEvent, useState } from "react";
import Button from "@mui/material/Button";
import theme from "../config/theme";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import {
  Box,
  Container,
  Typography,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Stack,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FaceIcon from "@mui/icons-material/Face";

import { Navigate } from "react-router";
import { registerUser } from "../services/Api.service";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { LoginAndOut } from "../utils/zustand.store";

// import './register.css';

type RegisterFormValues = {
  profile_image: File;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  password: string;
  confirmPassword: string;
  personal_email: string;
  phone: string;
};

const Register = () => {
  const { red, secondary, gray, primary } = theme.palette;
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const navigate: NavigateFunction = useNavigate();
  const { MinonLogin } = LoginAndOut();

  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      profile_image: {} as File,
      first_name: "",
      last_name: "",
      email: "",
      department: "",
      password: "",
      confirmPassword: "",
      personal_email: "",
      phone: "",
    },
  });

  const { register, handleSubmit, formState, reset } = registerForm;
  const { errors } = formState;

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordCheck = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert("passwords don't match");
      return false;
    } else if (password.length < 8) {
      alert("password must be 8 character or more");
      return false;
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/.test(password)) {
      alert("password must be a mix of alphanumeric characters");
      return false;
    }
    return true;
  };

  const handleRegister = async (formData: RegisterFormValues) => {
    const checkPassword = handlePasswordCheck(
      formData.password,
      formData.confirmPassword
    );

    if (checkPassword) {
      const registerAnswer = await registerUser(formData, navigate);
      if (registerAnswer) setRegisterError(registerAnswer);
      else {
        MinonLogin();
        reset({
          profile_image: {} as File,
          first_name: "",
          last_name: "",
          email: "",
          department: "",
          personal_email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        });
        <Navigate to={"/home"} />;
      }
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const getFiles = e.target.files;
    if (getFiles?.length) {
      setFile(getFiles[0]);
    }
  };

  return (
    <Container maxWidth="md" sx={{ height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "space-between", sm: "space-between" },
          alignItems: "center",
        }}
      >
        <Button
          aria-label="go to Minon Mentor homepage"
          variant="text"
          sx={{
            ":hover": {
              backgroundColor: "transparent",
            },
          }}
          onClick={() => navigate("/")}
        >
          {
            <Box
              display="flex"
              gap={1}
              sx={{ ":hover": { cursor: "pointer" } }}
              onClick={() => navigate("/")}
            >
              <Typography
                sx={{ color: secondary.main, fontSize: "24px" }}
                variant="overline"
              >
                Minon
              </Typography>
              <Typography
                sx={{ color: primary.main, fontSize: "24px" }}
                variant="overline"
              >
                Mentor
              </Typography>
            </Box>
          }
        </Button>

        <Button
          aria-label="login"
          onClick={() => navigate("/login")}
          sx={{
            p: 1,
            px: 2,
            backgroundColor: secondary.main,
            color: gray[900],
            ":hover": {
              backgroundColor: secondary[900],
            },
          }}
        >
          Login
        </Button>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          my: 2,
          py: 2,
          boxShadow: 3,
          borderRadius: 2,
          minWidth: "fit-content",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Register
          </Typography>
          {registerError ? (
            <Typography color={red.main}>{registerError}</Typography>
          ) : (
            <Typography color={red.main} visibility={"hidden"}>
              {"error"}
            </Typography>
          )}
        </Box>

        <form onSubmit={handleSubmit(handleRegister)} className="page">
          <Stack
            spacing={1}
            width={"100%"}
            margin={"auto"}
            maxWidth={"800px"}
            minWidth={"250px"}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}
            >
              {/* Profile Image */}
              <Box display="flex">
                <label htmlFor="profile_image">
                  <div style={{ width: 100, height: 100, borderRadius: 999 }}>
                    {file.name ? (
                      <img
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "999px",
                        }}
                        src={URL.createObjectURL(file)}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <FaceIcon sx={{ width: 80, height: 80 }} />
                    )}
                  </div>
                </label>

                <TextField
                  type="file"
                  variant="standard"
                  error={!!errors.profile_image}
                  helperText={
                    errors.profile_image
                      ? errors.profile_image?.message
                      : "Profile picture optional"
                  }
                  label="Profile Image"
                  aria-label="profile picture input-field"
                  aria-invalid={errors.profile_image ? "true" : "false"}
                  {...register("profile_image", {
                    onChange: (e) => handleFileInput(e),
                  })}
                  id="profile_image"
                  sx={{
                    width: "100%",
                    maxWidth: "250px",
                    height: 100,
                    px: 1,
                    py: 2,
                    "& .MuiInputLabel-root": {
                      display: "none",
                    },
                  }}
                />
              </Box>
              {/*  */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { md: 3 },
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  m: "auto",
                }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  label="First Name"
                  type="text"
                  aria-label="name input-field"
                  aria-invalid={errors.first_name ? "true" : "false"}
                  helperText={
                    errors.first_name ? errors.first_name?.message : " "
                  }
                  error={!!errors.first_name}
                  sx={{ maxWidth: "400px" }}
                  {...register("first_name", {
                    required: "Your first name is required",
                  })}
                />

                <TextField
                  fullWidth
                  variant="outlined"
                  label="Last Name"
                  type="text"
                  aria-label="name input-field"
                  aria-invalid={errors.last_name ? "true" : "false"}
                  helperText={
                    errors.last_name ? errors.last_name?.message : " "
                  }
                  error={!!errors.last_name}
                  sx={{ maxWidth: "400px" }}
                  {...register("last_name", {
                    required: "Your last name is required",
                  })}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { md: 3 },
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                m: "auto",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                type="email"
                helperText={errors.email ? errors.email?.message : " "}
                aria-label="name input-field"
                aria-invalid={errors.email ? "true" : "false"}
                error={!!errors.email}
                sx={{ maxWidth: "400px" }}
                {...register("email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.+([a-z.]+){2,}$/,
                    message: "Not a valid email",
                  },
                  required: {
                    value: true,
                    message: "Your email is required",
                  },
                })}
              />
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                label="Department"
                aria-label="department input-field"
                aria-invalid={errors.department ? "true" : "false"}
                helperText={
                  errors.department ? errors.department?.message : " "
                }
                error={!!errors.department}
                sx={{ maxWidth: "400px" }}
                {...register("department", {
                  required: {
                    value: true,
                    message: "Your department is required",
                  },
                })}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { md: 3 },
                justifyContent: "center",
                alignItems: { xs: "center", sm: "center", md: "flex-start" },
                width: "100%",
                m: "auto",
              }}
            >
              <FormControl
                fullWidth
                variant="outlined"
                error={!!errors.password}
                sx={{ maxWidth: "400px" }}
              >
                <InputLabel htmlFor="password-field">Password</InputLabel>

                <OutlinedInput
                  label="Password"
                  id="password-field"
                  type={showPassword ? "text" : "password"}
                  minLength={8}
                  aria-label="password input-field"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Must be 8 characters or more",
                    },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
                      message:
                        "Must contain upper & lowercase letters and numbers",
                    },
                  })}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Stack>
                  <FormHelperText>
                    {errors.password
                      ? errors.password?.message
                      : "Minimun 8 Characters."}
                  </FormHelperText>

                  <FormHelperText>
                    {errors.password
                      ? ""
                      : "Must contain lower and uppercase letters"}
                  </FormHelperText>
                </Stack>
              </FormControl>

              <TextField
                fullWidth
                variant="outlined"
                label="Confirm Password"
                minLength={8}
                type={showPassword ? "text" : "password"}
                aria-label="confirmPassword input-field"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword?.message : " "
                }
                error={!!errors.confirmPassword}
                sx={{ maxWidth: "400px" }}
                {...register("confirmPassword", {
                  required: "Password does not match",
                })}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { md: 3 },
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                m: "auto",
              }}
            >
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                helperText={
                  errors.personal_email ? errors.personal_email?.message : " "
                }
                label="Secondary Email - Optional"
                aria-label="second email optional"
                aria-invalid={errors.personal_email ? "true" : "false"}
                error={!!errors.personal_email}
                sx={{ maxWidth: "400px" }}
                {...register("personal_email", {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@+[a-zA-Z0-9]+\.+([a-z.]+){2,}$/,
                    message: "Not a valid email",
                  },
                })}
              />
              <TextField
                fullWidth
                variant="outlined"
                label="Phone Number - Optional"
                helperText={errors.phone ? errors.phone?.message : " "}
                error={!!errors.phone}
                aria-label="phone number optional"
                aria-invalid={errors.phone ? "true" : "false"}
                sx={{ maxWidth: "400px" }}
                {...register("phone", {
                  pattern: {
                    value:
                      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: "Not a valid phone number",
                  },
                })}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                aria-label="register now"
                sx={{
                  backgroundColor: primary.main,
                  p: 1,
                  px: 3,
                  fontWeight: "bold",
                  ":hover": {
                    backgroundColor: primary[800],
                  },
                }}
              >
                Register Now
              </Button>
              {registerError ? (
                <Typography color={red.main}>{registerError}</Typography>
              ) : (
                <Typography color={red.main} visibility={"hidden"}>
                  {"error"}
                </Typography>
              )}
            </Box>
          </Stack>
        </form>
      </Container>
    </Container>
  );
};

export default Register;
