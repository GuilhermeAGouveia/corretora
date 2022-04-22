import bcrypt from "bcryptjs"

//usando callback para Promessas
const Encrypt = {
    hash: async (passwd: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(passwd, salt)
    },

    compare: async (passwd: string, hash: string): Promise<boolean> => {
        return await bcrypt.compare(passwd, hash)
    }
}

export default Encrypt