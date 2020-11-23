const mongoCollections = require('../config/mongoCollection');
const questions = mongoCollections.questions;
const uuid = require('uuid');

async function createQuestion(productId, sellerId, nickName, question) {
    if (!productId || typeof productId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as productId',
        };
    }
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as sellerId',
        };
    }
    if (!nickName || typeof nickName !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as nickName',
        };
    }
    if (!question || typeof question !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as the question',
        };
    }

    let questionCollection = await questions();

    let newQuestion = {
        _id: uuid.v4(),
        productId: productId,
        sellerId: sellerId,
        nickName: nickName,
        question: question,
        answer: null,
    };
    let insertInfo = await questionCollection.insertOne(newQuestion);
    if (insertInfo.insertedCount === 0) {
        throw {
            error: 500,
            errorMessage: 'Something wrong when creating the question',
        };
    }
    let newId = insertInfo.insertedId;
    return { status: 200, result: (await getQuestionById(newId)).result };
}

async function getAllQuestion() {
    let questionCollection = await questions();

    let allQuestion = await questionCollection.find({}).toArray();
    return { status: 200, result: allQuestion };
}

async function getQuestionById(id) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            error: 'You must provide an question id to search for a question',
        };
    }

    let questionCollection = await questions();

    let questionGoal = await questionCollection.findOne({ _id: id });
    if (questionGoal === null) {
        throw { status: 404, errorMessage: `No Question with that ${id}` };
    }
    return { status: 200, result: questionGoal };
}

async function getQuestionsByProductId(productId) {
    if (!productId || typeof productId !== 'string') {
        throw {
            status: 400,
            errorMessage:
                'You must provide an productId to search for its questions',
        };
    }

    let questionCollection = await questions();

    let questionArr = await questionCollection
        .find({ productId: productId })
        .toArray();
    return { status: 200, result: questionArr };
}

async function getQuestionsBySellerId(sellerId) {
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            status: 400,
            errorMessage:
                'You must provide an sellerId to search for questions',
        };
    }

    let questionCollection = await questions();

    let questionArr = await questionCollection
        .find({ sellerId: sellerId })
        .toArray();
    return { status: 200, result: questionArr };
}

async function giveAnswer(id, answer) {
    if (!id || typeof id !== 'string') {
        throw { status: 400, errorMessage: 'You must provide an id to answer' };
    }
    if (!answer || typeof answer !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide a string as answer',
        };
    }

    let questionCollection = await questions();

    let updateInfo = await questionCollection.updateOne(
        { _id: id },
        {
            $set: {
                answer: answer,
            },
        }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw { status: 500, errorMessage: 'Could not give the answer' };
    }
    return { status: 200, result: (await getQuestionById(id)).result };
}

async function deleteOneQuestion(id) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an id to delete Question',
        };
    }

    let questionCollection = await questions();

    let questionToDelete = (await getQuestionById(id)).result;
    let deletionInfo = await questionCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
        throw {
            status: 500,
            errorMessage: `Could not delete the Question with this ${id}`,
        };
    }
    return { status: 200, result: questionToDelete };
}

async function deleteAllQuestionInProduct(productId) {
    if (!productId || typeof productId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide a productId to delete its Question',
        };
    }

    let questionCollection = await questions();

    let questionsToDelete = await getQuestionsByProductId(productId);
    let deletionInfo = await questionCollection.remove({
        //deleteMany
        productId: productId,
    });
    if (deletionInfo.deletedCount === 0) {
        throw {
            status: 500,
            errorMessage: `Delete all questions failed`,
        };
    }
    return { status: 200, result: questionsToDelete };
}

module.exports = {
    createQuestion,
    getAllQuestion,
    getQuestionById,
    getQuestionsByProductId,
    getQuestionsBySellerId,
    giveAnswer,
    deleteOneQuestion,
    deleteAllQuestionInProduct,
};
