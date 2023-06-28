import { UUID } from "crypto";
const crypto = require('crypto');
const { Invites } = require('./Schemas');

const getUserInvite = async (user_id: UUID) => {
  const invite = await Invites.findOne({ where: { user_created: user_id } });
  if (invite) return invite.inviteID;
  else {
    const randomBytes = crypto.randomBytes(16);
    const inviteID = randomBytes.toString('hex');
    const newInvite = await Invites.create({ inviteID, user_created: user_id })
    return newInvite.inviteID;
  };
};

const checkInvite = async (inviteID: string) => {
  const inviteFound = await Invites.findOne({ where: { inviteID } });
  return Boolean(inviteFound);
};

module.exports = {
  getUserInvite,
  checkInvite
}