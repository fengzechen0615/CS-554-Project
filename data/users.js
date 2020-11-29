const mongoCollections = require('../config/mongoCollection');
const users = mongoCollections.users;
const uuid = require('uuid');

let exportedMethods = {
    async getUserById(id) {
        const userCollection = await users();

        const user = await userCollection.findOne({ _id: id });
        if (!user) {
            throw { status: 404, errorMessage: `No user with id: ${id}` };
        }

        return { status: 200, result: user };
    },

    async getAllUsers() {
        const userCollection = await users();

        const allUsers = await userCollection.find({}).toArray();

        return { status: 200, result: allUsers };
    },

    async getUserByEmail(email) {
        const userCollection = await users();

        const user = await userCollection.findOne({
            email: new RegExp(`^${email}$`, 'i'),
        });
        if (!user) {
            throw { status: 404, errorMessage: `No user with email: ${email}` };
        }

        return { status: 200, result: user };
    },

    async addUser(nickname, email) {
        const userCollection = await users();

        let newUser = {
            _id: uuid.v4(),
            nickname: nickname,
            email: email,
            phoneNumber: '',
            address: '',
            zipCode: '',
            avatar: 'default.jpg',
            isAdmin: false,
            state: true,
        };

        const insertInfo = await userCollection.insertOne(newUser);
        if (insertInfo.insertedCount === 0) {
            throw { status: 500, serrorMessage: 'Insert user failed!' };
        }

        return {
            status: 200,
            result: (await this.getUserById(insertInfo.insertedId)).result,
        };
    },

    async updatedUser(id, nickname, phoneNumber, address, zipCode) {
        const userCollection = await users();

        const updatedUser = {
            nickname: nickname,
            phoneNumber: phoneNumber,
            address: address,
            zipCode: zipCode,
        };

        const updateInfo = await userCollection.updateOne(
            { _id: id },
            { $set: updatedUser }
        );

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
            throw {
                status: 500,
                errorMessage: `Could not update user successfully by id: ${id}`,
            };
        }

        return { status: 200, result: (await this.getUserById(id)).result };
    },

    async updatedUserState(id) {
        const userCollection = await users();

        const updatedUser = {
            state: !(await this.getUserById(id)).result.state,
        };

        const updateInfo = await userCollection.updateOne(
            { _id: id },
            { $set: updatedUser }
        );

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
            throw {
                status: 500,
                errorMessage: `Could not update user state successfully by id: ${id}`,
            };
        }

        return { status: 200, result: (await this.getUserById(id)).result };
    },

    async updatedAvatar(id, avatar) {
        const userCollection = await users();

        const updateAvatarInfo = await userCollection.updateOne(
            { _id: id },
            { $set: { avatar: avatar } }
        );

        if (!updateAvatarInfo.matchedCount && !updateAvatarInfo.modifiedCount) {
            throw {
                status: 500,
                errorMessage: `updateAvatar Update failed by id: ${id}`,
            };
        }

        return { status: 200, result: (await this.getUserById(id)).result };
    },
};

module.exports = exportedMethods;
