const mongoCollections = require('../config/mongoCollection');
const questions = mongoCollections.questions;
const uuid = require('uuid');

async function createQuestion(productId, nickName, question) {
    if (!productId || typeof productId !== 'string')
        throw 'you should input a string as productId';
    if (!nickName || typeof nickName !== 'string')
        throw 'you should input a string as nickName';
    if (!question || typeof question !== 'string')
        throw 'you should input a string as the question';
    let questionCollection = await questions();
    let newQuestion = {
        _id: uuid.v4(),
        productId: productId,
        nickName: nickName,
        question: question,
        answer: null,
    };
    let insertInfo = await questionCollection.insertOne(newQuestion);
    if (insertInfo.insertedCount === 0)
        throw 'Something wrong when creating the question';
    let newId = insertInfo.insertedId;
    let questionCreated = await getQuestionById(newId);
    return questionCreated;
}

async function getAllQuestion() {
    let questionCollection = await questions();
    let allQuestion = await questionCollection.find({}).toArray();
    return allQuestion;
}

async function getQuestionById(id) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an question id to search for a question';
    let questionCollection = await questions();
    let questionGoal = await questionCollection.findOne({ _id: id });
    if (questionGoal === null) throw 'No Question with that id';
    return questionGoal;
}

async function getQuestionsByProductId(productId) {
    if (!productId || typeof productId !== 'string')
        throw 'You must provide an productId to search for its questions';
    let questionCollection = await questions();
    let questionArr = await questionCollection
        .find({ productId: productId })
        .toArray();
    return questionArr;
}

async function giveAnswer(id, answer) {
    if (!id || typeof id !== 'string') throw 'You must provide an id to answer';
    if (!answer || typeof answer !== 'string')
        throw 'You must provide a string as answer';
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
        throw 'Could not give the answer';
    }
    return await getQuestionById(id);
}

async function deleteOneQuestion(id) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an id to delete Question';
    let questionCollection = await questions();
    let questionToDelete = await getQuestionById(id);
    let deletionInfo = await questionCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
        throw `Could not delete the Question with this id`;
    return questionToDelete;
}

async function deleteAllQuestionInProduct(productId) {
    if (!productId || typeof productId !== 'string')
        throw 'You must provide a productId to delete its Question';
    let questionCollection = await questions();
    let questionsToDelete = await getQuestionsByProductId(productId);
    let deletionInfo = await questionCollection.remove({
        //deleteMany
        productId: productId,
    });
    return questionsToDelete;
}

module.exports = {
    createQuestion,
    getAllQuestion,
    getQuestionById,
    getQuestionsByProductId,
    giveAnswer,
    deleteOneQuestion,
    deleteAllQuestionInProduct,
};
