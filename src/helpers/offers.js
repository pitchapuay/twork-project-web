import moment from 'moment'

export const newCollaboration = ({ offer: { company, toUser, id }, fromUser }) => ({
    allowedPeople: [fromUser.uid, toUser.uid],
    fromOffer: id, // id งานที่สมัคร
    fromUser: fromUser.uid, // employee
    companyId: company.id, // define ID on offer.service
    companyName: company.companyName,
    toUser: toUser.uid // owner
})

export const acceptedAlert = ({ offer: { company, toUser }, fromUser }) => ({
    text: `${company.companyName} ได้ตอบรับการสมัครงานของคุณแล้ว คุณสามารถติดต่อผ่านแชทกับผู้ประกอบการได้ที่กล่องข้อความ`,
    toUser: toUser.uid,
    fromUser: {
        name: fromUser.fullName,
        avatar: fromUser.avatar
    },
    fromUserUid: fromUser.uid,
    signupAs: 'employee',
    company: {
        image: company.image,
        companyName: company.companyName
    },
    timestamp: moment().format().slice(0, 19)
})

export const declinedAlert = ({ offer: { company, toUser }, fromUser }) => ({
    text: `${company.companyName} ได้ปฏิเสธการสมัครงานของคุณ`,
    toUser: toUser.uid,
    fromUser: {
        name: fromUser.fullName,
        avatar: fromUser.avatar,
    },
    fromUserUid: fromUser.uid,
    signupAs: 'employee',
    company: {
        image: company.image,
        companyName: company.companyName
    },
    timestamp: moment().format().slice(0, 19)
})

export const newMessageToOwner = offer => ({
    text: `${offer.fromUser.fullName} ได้สมัครงานที่ ${offer.companyName}`,
    toUser: offer.toUser.uid,
    fromUser: {
        name: offer.fromUser.fullName,
        avatar: offer.fromUser.avatar
    },
    fromUserUid: offer.fromUser.uid,
    signupAs: 'owner',
    company: {
        image: offer.image,
        companyName: offer.companyName
    },
    timestamp: moment().format().slice(0, 19)
})