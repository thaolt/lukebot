// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
const moment = require('moment');
const vntk = require('vntk');
const ElizaBot = require('elizabot');
const eliza = new ElizaBot();
const initial = eliza.getInitial();

eliza.reset();

eliza.memSize = 100; // (default: 20)


// var posTag = vntk.posTag();
// var dictionary = vntk.dictionary();
// var ner = vntk.ner();

var classifier = new vntk.BayesClassifier();

classifier.addDocument('khi nào trận chiến đã kết thúc?', 'when');
classifier.addDocument('tàu rời đi lúc mấy giờ?', 'when');
classifier.addDocument('trận đấu diễn ra vào thời gian nào?', 'when');
classifier.addDocument('anh ấy rời đi vào lúc mấy giờ?', 'when');
classifier.addDocument('bao giờ thì đến lễ hội hóa trang?', 'when');
classifier.addDocument('ai phát hiện ra điện ?', 'who');
classifier.addDocument('người sáng lập ra microsoft là ai?', 'who');
classifier.addDocument('ai kiếm được tiền của họ một cách chăm chỉ ?', 'who');
classifier.addDocument('người phát minh tạo ra.', 'who');
classifier.addDocument('gia đình bạn gồm những ai?', 'who');
classifier.addDocument('làm thế nào để bẻ khóa?', 'how');
classifier.addDocument('Việt Nam nằm ở đâu?', 'where');
classifier.addDocument('Hà Nội kế tỉnh nào?', 'where');

classifier.train();

const { ActivityTypes } = require('botbuilder');

// Turn counter property
// const TURN_COUNTER_PROPERTY = 'turnCounterProperty';

class MyBot {
    /**
     *
     * @param {ConversationState} conversation state object
     */
    constructor(conversationState) {
        // Creates a new state accessor property.
        // See https://aka.ms/about-bot-state-accessors to learn more about the bot state and state accessors.
        // this.countProperty = conversationState.createProperty(TURN_COUNTER_PROPERTY);
        this.conversationState = conversationState;
    }
    /**
     *
     * @param {TurnContext} on turn context object.
     */
    async onTurn(turnContext) {
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
            // read from state.
            // let count = await this.countProperty.get(turnContext);
            // count = count === undefined ? 1 : ++count;
            let message = turnContext.activity.text;
            message = message.replace(/^.*?\s/, '');
            message = message.trim();
            let response = '';
            if (message.toLowerCase() === 'tet') {
                const remainDays = -moment().diff('2019-02-05', 'days');
                response = `Còn có ${ remainDays } ngày nữa là tới tết à. Cứ từ từ. Tết này không có thưởng đâu ${ turnContext.activity.from.name } ơi.`;

                await turnContext.sendActivity(response);
            }
            if (message.toLowerCase() === 'noel' || message.toLowerCase() === 'christmas') {
                const remainDays = -moment().diff('2018-12-24', 'days');
                response = `Còn ${ remainDays } ngày nữa là đến Noel rồi. Bạn dã có người yêu chưa. Khẩn trương lên.`;

                await turnContext.sendActivity(response);
            }
            if (message.toLowerCase() === 'valentin') {
                const remainDays = -moment().diff('2019-02-14', 'days');
                response = `Còn ${ remainDays } ngày nữa là đến Valentin rồi. Mình vẫn cô đơn. kaka.`;

                await turnContext.sendActivity(response);
            }
            // increment and set turn counter.
            // await this.countProperty.set(turnContext, count);
            if (response === '') {
                // console.log(posTag.tag(message));
                // await turnContext.sendActivity('POS: ' + posTag.tag(message, 'text'));
                // console.log(ner.tag(message));
                // await turnContext.sendActivity('NER: ' + ner.tag(message, 'text'));
                // await turnContext.sendActivity('CLASSIFY: ' + classifier.classify(message));
                const reply = eliza.transform(response);
                await turnContext.sendActivity('ELIZA: ' + reply);
            }
        } else {
            // await turnContext.sendActivity(`[${turnContext.activity.type} event detected]`);
        }
        // Save state changes
        await this.conversationState.saveChanges(turnContext);
    }
}

module.exports.MyBot = MyBot;
