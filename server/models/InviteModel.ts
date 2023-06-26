const sequelize = require('./connection');
const { DataTypes } = require('sequelize');
import { UUID } from "crypto";
import { User } from "./UserModel";
const crypto = require('crypto');

const Invites = sequelize.define("invite", {
  inviteID: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_created: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

const getUserInvite = async (user_id: UUID) => {

  const userInfo = await User.findOne({ where: { user_id } });

  if (!userInfo) throw new Error('user_id is invalid');
  if (userInfo.role !== 'admin') throw new Error('unauthorized');
  else {
    const invite = await Invites.findOne({ where: { user_created: user_id } });
    if (invite) return invite.inviteID;
    else{
      const randomBytes = crypto.randomBytes(16);
      const inviteID = randomBytes.toString('hex');
      const newInvite = await Invites.create({ inviteID, user_created: user_id })
      return newInvite.inviteID;
    };
  }
}

const checkInvite = async(inviteID: string) =>{
  const inviteFound = await Invites.findOne({where: {inviteID}});
  return Boolean(inviteFound);
}

module.exports = {
  Invites,
  getUserInvite,
  checkInvite
}