import { Box, Dialog, Typography, Button, TextField } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../config/theme';
import { ChangeEvent, useEffect, useState } from "react";
import { sendValidation, validateCode } from "../../services/Api.service";


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


export const CodesValidation = (props: any) => {

  const showStats = props.showValidateCode;
  const closeStats = props.closeValidateCode;
  const whoToSend = props.whoToSend;
  const closeWindowAndRegister = props.closeWindowAndRegister;

  const [indexSend, setIndexSend] = useState<number[]>([0]);
  let sending = whoToSend[indexSend[0]];

  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [whereSend, setWhereSend] = useState<'email' | 'phone'>('email');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const emptyVariables = () => {
    setValue('');
    setError('');
  };

  useEffect(() => {

    if (indexSend[0] === 0 || indexSend[0] === 1 && sending !== '') {
      setWhereSend('email');
      emptyVariables();
      sendValidation({ email: sending }, 'email', setError);
    } else if (indexSend[0] === 2 && sending !== '') {
      setWhereSend('phone')
      sendValidation({ number: sending }, 'phone', setError);
    } else if (indexSend[0] < 2) {
      setIndexSend([indexSend[0] + 1]);
    } else {
      closeWindowAndRegister();
    }

  }, [indexSend[0]])

  async function confirmCode() {

    if (indexSend[0] === 0 || indexSend[0] === 1) {
      const codeValidated: any = await validateCode({ email: sending }, value, whereSend, setError);
      if (codeValidated?.data === 'Right Code') {
        setIndexSend([indexSend[0] + 1]);
        setError('');
      }
    } else if (indexSend[0] === 2) {
      const codeValidated: any = await validateCode({ number: sending }, value, whereSend, setError);
      if (codeValidated?.data === 'Right Code') {
        setIndexSend([indexSend[0] + 1]);
        setError('');
      }
    } else{
      return;
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/\D/g, ''); // Remove non-digit characters

    if (numericValue.length <= 4) {
      setValue(numericValue);
    }
  };

  return (
    <div>
      <Dialog
        open={showStats}
        fullScreen={fullScreen}
        onClose={closeStats}
        aria-labelledby="responsive-dialog-title"
      >

        <DialogContent sx={{ position: 'relative', backgroundColor: '#ffffff', p: '30px 90px', textAlign: 'center' }} >
          <Button sx={{ position: 'absolute', right: 0, top: 5, color: 'black' }} onClick={closeStats} >X</Button>

          <Box>
            <Box mb={2}>
              <Typography variant="h5">Check your {whereSend}</Typography>
              <Typography variant="h6">{sending}</Typography>
            </Box>
            <TextField value={value} onChange={handleChange}
              inputProps={{
                maxLength: 4,
                pattern: '\\d*',
                style: { fontSize: '30px' },
              }} sx={{ width: '100px', border: 1 }} />
          </Box>

          <Typography variant="h5" color='#290000' my={2}>
            {error}
          </Typography>
          <Button sx={{
            position: 'relative', margin: 'auto', color: '#ffffff', p: 1, mt: 1,
            backgroundColor: '#0a4e24', ':hover': { backgroundColor: '#05a341' }
          }} onClick={confirmCode} >
            Confirm Code
          </Button>

        </DialogContent>
      </Dialog>
    </div>
  );

};