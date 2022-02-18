import { model, ObjectId, Schema } from 'mongoose'

type Info = {
  name: string
  lastName: string
  address: string
  phone: string
}

type User = {
  authId: string
  info: Info
  avatar: string
}

const UserSchema = new Schema<User>(
  {
    authId: { type: String, required: true },
    info: {
      name: { type: String, default: '' },
      lastName: { type: String, default: '' },
      address: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// UserSchema.pre<User>('save', async function () {
//   this.password = await encryptPassword(this.password)
// })

export default model<User>('User', UserSchema)
