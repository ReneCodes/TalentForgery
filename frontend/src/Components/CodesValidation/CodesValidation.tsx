import { Box, Dialog, Typography, Button, TextField } from "@mui/material";
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import theme from '../../config/theme';
import { ChangeEvent, useEffect, useState } from "react";
import { sendValidation, validateCode } from "../../services/Api.service";

export const CodesValidation = (props: any) => {

  const {
    showValidateCode,
    closeValidateCode,
    closeWindowAndRegister,
    verification,
    setVerification
  } = props;

  const [indexSend, setIndexSend] = useState<number[]>([0]);
  let sending = verification[indexSend[0]]?.value;

  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const [whereSend, setWhereSend] = useState<'email' | 'phone'>('email');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const emptyVariables = () => {
    setValue('');
    setError('');
  };

  const allVerified = () => {
    let allVerified = true;
    verification.forEach((item: any) => {
      if (item.verified || item.value === '' || item.value === undefined) allVerified = allVerified === true ? true : false;
      else allVerified = false;
    });
    return allVerified;
  }

  function updateVerified(email: boolean, sending: string, verified: string) {
    const newArr = JSON.parse(JSON.stringify(verification));
    newArr[indexSend[0]] = { email, value: sending, verified };
    setVerification(newArr);
  };

  function checkVerified() {
    return verification[indexSend[0]].verified;
  }

  async function checkCodes() {
    if (indexSend[0] <= 1 && sending !== '' && !checkVerified()) {

      setWhereSend('email');
      emptyVariables();
      sendValidation({ email: sending }, 'email', setError);

    } else if (indexSend[0] === 2 && sending !== '' && !checkVerified()) {

      setWhereSend('phone');
      emptyVariables();
      sendValidation({ number: sending }, 'phone', setError);

    } else if (indexSend[0] < 2) {

      setIndexSend([indexSend[0] + 1]);

    } else if (allVerified()) {
      closeWindowAndRegister();
    }
  }

  useEffect(() => {
    checkCodes();
  }, [indexSend[0]]);


  async function confirmCode() {

    if (error === 'Email already registered') {
      setError('Change the email');

    } else if (error === 'Number already registered') {
      setError('Change the phone number');

    } else if (indexSend[0] === 0 || indexSend[0] === 1) {

      const codeValidated: any = await validateCode({ email: sending }, value, whereSend, setError);

      if (codeValidated && codeValidated.data) {
        updateVerified(true, sending, codeValidated.data);
        setIndexSend([indexSend[0] + 1]);
        setError('');
      };

    } else if (indexSend[0] === 2) {
      const codeValidated: any = await validateCode({ number: sending }, value, whereSend, setError);
      if (codeValidated && codeValidated.data) {
        updateVerified(false, sending, codeValidated.data);
        setIndexSend([indexSend[0] + 1]);
        setError('');
      }

    } else {
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
        open={showValidateCode}
        fullScreen={fullScreen}
        onClose={closeValidateCode}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{
          position: 'relative',
          width: '500px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
          <DialogContent sx={{ backgroundColor: '#ffffff', p: '0', textAlign: 'center' }} >
            <Button sx={{ position: 'absolute', right: 0, top: 5, color: 'black' }} onClick={closeValidateCode} >X</Button>

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
        </Box>
      </Dialog>
    </div>
  );

};