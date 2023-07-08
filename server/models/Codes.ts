import { UUID } from "crypto";
export { };
const { Codes } = require('./Schemas');

const checkContactWaiting = async (contact: string) => {
  const info = await Codes.findOne({ where: { contact } });
  if (!info) return false;
  else return true;
};

const saveCode = async (code: number, contact: string, confirm: string) => {
  await Codes.create({
    code,
    contact,
    confirm
  });
};

const checkCode = async (contact: string, code: number) => {
  const info = await Codes.findOne({ where: { contact } });
  if (!info) return 'Not Found';
  else if (info.code !== code) return 'Wrong Code';
  else return 'Right Code';
};

const deleteCode = async (contact: string) => {
  await Codes.destroy({ where: { contact } });
};

const getInformation = async (code: UUID) => {

  const info = await Codes.findOne({
    where: {
      confirm: code
    }
  });

  if (!info || info.confirm !== code) return false;
  else return true;

};

module.exports = { saveCode, checkCode, deleteCode, checkContactWaiting, getInformation }