const mongoose = require('mongoose');
const Farm = require('../models/farms');
const fs = require('fs')
mongoose.connect('mongodb://localhost:27017/farmanalytics', {
    useNewUrlParser: true
});

let dataArr = []


function parse(filename) {

    let dataCSV = fs.readFileSync(filename, 'utf-8').trim()

    dataArr = dataCSV.replace(/(\[|\"|\]|\\|\')/g, '').split('\n').map(i => i.split(','))

    for (let i = 0; i < dataArr.length; i++) {
        dataArr[i].splice(90, 4)

    }


}


// parse('data.csv')
// console.log(dataArr)


let schemaVariablesRU = ['CODE ID',
    'Давность симптомов',
    'Длительность приступа (в днях)',
    'Интенсивность боли (ВАШ)',
    'Тип боли',
    'Частота (раз в месяц)',
    'Локализация боли (сторона)',
    'Локализация боли (анатомическая)',
    'Боль в теле',
    'Слабость',
    'Фото/фоно фобия',
    'Тошнота',
    'Аура 1',
    'Аура 2',
    'Триггер 1',
    'Триггер 2',
    'Неврологический дефицит',
    'Семейный анамнез по мигрени',
    'Возраст',
    'Пол',
    'Аллергия',
    'Сердечно-сосудистые заболевания',
    'Заболевания ЦНС',
    'Заболевания ЖКТ',
    'Эндокринные заболевания',
    'Поражения костно-мышечной системы',
    'Психические заболевания',
    'Респираторные заболевания',
    'Инсульт + мигрень',
    'МРТ - выдано направление',
    ' но результаты не указаны',
    'МРТ - патологии не выявлено',
    'МРТ - выявлены отклонения',
    'КТ -выдано направление',
    ' но результаты не указаны',
    'КТ - патологии не выявлено',
    'КТ - выявлены отклонения',
    'Рентген -  выдано направление',
    ' но результаты не указаны',
    'Рентген - патологии не выявлено',
    'Рентген - выявлены отклонения',
    'ЭЭГ - выдано направление',
    ' но результаты не указаны',
    'ЭЭГ - патологии не выявлено',
    'ЭЭГ - выявлены отклонения',
    'УЗИ - выдано направление',
    ' но результаты не указаны',
    'УЗИ - патологии не выявлено',
    'УЗИ - выявлены отклонения',
    'Диагноз поставлен',
    'Бассейн',
    'Гирудотерапия',
    'Диетотерапия',
    'Иглорефлексотерапия',
    'ЛФК',
    'Массаж',
    'Психотерапия',
    'Физиотерапия',
    'Количество обращений по мигрени',
    'Кардиолог',
    'Физиотерапевт',
    'Мануальный терапевт',
    'Невролог',
    'Офтальмолог',
    'Психотерапевт',
    'Терапевт',
    'Вызов СМП',
    'Госпитализации',
    'Дней госпитализации',
    'Больничный лист',
    'Дней б/л',
    'Сопутсвующая терапия (гормонотерапия',
    ' гормональная контрацепция)',
    'бетаблокаторы',
    'антиконвульсанты',
    'антидепрессанты',
    'миорелаксант',
    'ботокс',
    'триптаны',
    'алкалоиды',
    'противорвотные',
    'анальгетики',
    'антихолинэстеразные',
    'анксиолитики',
    'нейролептики',
    'ноотропы',
    'корректоры',
    'антагонисты',
    'метаболики',
    'антигипоксанты',
    'Кому назначены ФД',
    'Клиника'
]
let schemaVariablesEng = ['CODE ID',
    'Longevity of symptoms.',
    'Seizure duration (in days)',
    'Pain intensity (YOUR).',
    'Type of pain.',
    'Frequency (once a month)',
    'Localization of pain (side)',
    'Pain localization (anatomical).',
    'Pain in the body.',
    'Weakness.',
    'Photo/phono phobia.',
    'Nausea.',
    'Aura 1.',
    'Aura 2.',
    'Trigger 1.',
    'Trigger 2.',
    'Neurological Deficit.',
    'Family history of migraine.',
    'Age',
    'Paul.',
    'Allergies',
    'Cardiovascular disease.',
    'CNS Diseases.',
    'Gastrointestinal diseases.',
    'Endocrine Diseases',
    'Lesions of the musculoskeletal system.',
    'Mental illness.',
    'Respiratory Diseases',
    'Stroke + migraine.',
    'MRI is a referral',
    'but the results are not indicated',
    'MRI - no pathology detected.',
    'MRI - Discrepancies detected',
    'KT\'s been given a direction',
    'but the results are not indicated',
    'KT - no pathology detected.',
    'C.T. - Discrepancies detected.',
    'X-rays - referral issued',
    'but the results are not indicated',
    'No X-ray pathology detected.',
    'X-rays - Discrepancies detected.',
    'EEG - referral issued',
    'but the results are not indicated',
    'EEG - no pathology detected.',
    'EEG - Discrepancies detected.',
    'Ultrasound is a referral',
    'but the results are not indicated',
    'No ultrasound pathology detected.',
    'Ultrasound - Discrepancies detected.',
    'Diagnosis made.',
    'Swimming pool.',
    'Gyrudotherapy.',
    'Diet Therapy.',
    'Igloreflexotherapy.',
    'LFK.',
    'Massage.',
    'Psychotherapy',
    'Physiotherapy',
    'Number of migraine calls.',
    'Cardiologist.',
    'Physiotherapist.',
    'Chiropractor.',
    'Neurologist.',
    'Ophthalmologist.',
    'Psychotherapist.',
    'The therapist.',
    'Call the SOC.',
    'Hospitalization',
    'Hospitalization Days.',
    'Hospital Leaf',
    'Days of b/l',
    'Concomitant therapy (hormone therapy)',
    'Hormonal contraception',
    'beta-blockers',
    'Anticonvulsants.',
    'Antidepressants.',
    'Myorelaxant.',
    'Botox',
    'Tryptans.',
    'Alkaloids.',
    'anti-vomiting.',
    'analgesics.',
    'Anticholinesterase.',
    'Anxiolytics.',
    'Neuroleptics.',
    'Nootropics.',
    'proofreaders',
    'Antagonists.',
    'Metabolics.',
    'Anti-hypoxicants.',
    'To whom are the FBI assigned?',
    'Clinic'
]
let newNewEng = ['codeID',
    'sympDuration',
    'attackDuration',
    'painIntencity',
    'painType',
    'frequancy',
    'localizationSide',
    'localizationAnatomy',
    'bodyPain',
    'weakness',
    'phobia',
    'nausea',
    'aura1',
    'aura2',
    'trigger1',
    'trigger2',
    'neurologicalDeficit',
    'anamnesis',
    'age',
    'gender',
    'allergy',
    'cardiovascular',
    'cns',
    'tract',
    'endocrine',
    'skeletalmuscular',
    'mental',
    'respiratory',
    'insultmigranie',
    'mriDirection',
    'mriGood',
    'mriBad',
    'ctDirection',
    'ctGood',
    'ctBad',
    'xraysDirection',
    'xraysGood',
    'xraysBad',
    'eegDirection',
    'eegGood',
    'eegBad',
    'ultrasoundDirection',
    'ultrasoundGood',
    'ultrasoundBad',
    'diagnosed',
    'pool',
    'gyrudotherapy',
    'diet',
    'igloreflex',
    'lfk',
    'massage',
    'psychotherapy',
    'physiotherapy',
    'magraineCalls',
    'cardiologist',
    'physiotherapist',
    'manualtherapist',
    'neurologist',
    'ophtalmologist',
    'psychotherapist',
    'therapist',
    'socCall',
    'hospitalization',
    'hospitalizationDays',
    'hospitalLeaf',
    'leafDays',
    'concomitantTherapy',
    'betaBlockers',
    'anticonvulsants',
    'antidepressants',
    'myorelaxant',
    'botox',
    'tryptans',
    'alkaloids',
    'antiVomiting',
    'analgesics',
    'anticholinesterase',
    'anxiolytics',
    'neuroleptics',
    'nootropics',
    'proofreaders',
    'antagonists',
    'metabolics',
    'antiHypoxicants',
    'patient',
    'clinic'
]


async function seedBase() {
    for (let i = 1; i < dataArr.length; i++) {
        const farmData = {}
        for (let j = 0; j < dataArr[i].length; j++) {
            farmData[newNewEng[j]] = dataArr[i][j]
        }
        let newFarm = new Farm(farmData)
        await newFarm.save()
    }
    mongoose.disconnect()
}

seedBase()

async function name() {
    let user = await Farm.find({
        codeID: '"RU05-208114"'
    })
    console.log(user)
}

// name()

async function magraineCalls() {
    let callsArr = await Farm.find({gender: 'M'}, {
        magraineCalls: 1,
        gender: 1,
        _id: 0
    })
    let calls1M = []
    // let calls2M = []
    // let calls3M = []
    // let calls4_5M = []
    // let calls6M = []
    // let calls1F = []
    // let calls2F = []
    // let calls3F = []
    // let calls4_5F = []
    // let calls6F = []

    
    for (let i = 0; i < callsArr.length; i++) {
        if (callsArr[i].magraineCalls === '1' && callsArr[i].gender === 'M'){
            calls1M.push(callsArr[i].magraineCalls)
        }
        // else if (callsArr[i].magraineCalls === '2'){
        //     calls2.push(callsArr[i].magraineCalls)
        // }
        // else if (callsArr[i].magraineCalls === '3'){
        //     calls3.push(callsArr[i].magraineCalls)
        // }
        // else if (callsArr[i].magraineCalls === 'от 4 до 5'){
        //     calls4_5.push(callsArr[i].magraineCalls)
        // }
        // else if (callsArr[i].magraineCalls === '>6'){
        //     calls6.push(callsArr[i].magraineCalls)
        // }
    }
    
    // let callsGroups = [calls1, calls2, calls3, calls4_5, calls6] 
    // for (let j = 0; j < callsGroups.length; j++) {
    //     callsGroups[j] = (callsGroups[j].length *100 / callsArr.length).toFixed(2)
    // }
    // console.log(callsGroups);
    console.log(calls1M);
    
}
magraineCalls()







// async function age() {

//     let ageArray = await Farm.find({}, {
//         age: 1,
//         _id: 0
//     })

//     let ageGroups = []
//     let age0to20 = [];
//     let age21to30 = [];
//     let age31to40 = [];
//     let age41to50 = [];
//     let age51to60 = [];
//     let age61AndOlder = [];

//     for (let i = 0; i < ageArray.length; i++) {
//         if (ageArray[i].age <= 20) {
//             age0to20.push(ageArray[i].age)
//         } else if (ageArray[i].age > 20 && ageArray[i].age <= 30) {
//             age21to30.push(ageArray[i].age)
//         } else if (ageArray[i].age > 30 && ageArray[i].age <= 40) {
//             age31to40.push(ageArray[i].age)
//         } else if (ageArray[i].age > 40 && ageArray[i].age <= 50) {
//             age41to50.push(ageArray[i].age)
//         } else if (ageArray[i].age > 50 && ageArray[i].age <= 60) {
//             age51to60.push(ageArray[i].age)
//         } else if (ageArray[i].age > 60) {
//             age61AndOlder.push(ageArray[i].age)
//         }
//     }
//     ageGroups = [age0to20, age21to30, age31to40, age41to50, age51to60, age61AndOlder]

//     for (let j = 0; j < ageGroups.length; j++) {
//         ageGroups[j] = (ageGroups[j].length * 100 / ageArray.length).toFixed(2)
//     }

//     console.log(ageGroups)

// }

// age()

async function gender() {
    let maleGender = await Farm.find({
        gender: 'M'
    }, {
        gender: 1,
        _id: 0
    })

    let allGender = await Farm.find()

    let malePercent = (maleGender.length * 100 / allGender.length).toFixed(2)
    let femalePercent = (100 - malePercent).toFixed(2)
    console.log(malePercent, '%')
    console.log(femalePercent, '%')
}

// gender()

async function age() {

    let ageArray = await Farm.find({}, {
        age: 1,
        _id: 0
    })

    let ageGroups = []
    let age0to20 = [];
    let age21to30 = [];
    let age31to40 = [];
    let age41to50 = [];
    let age51to60 = [];
    let age61AndOlder = [];

    for (let i = 0; i < ageArray.length; i++) {
        if (ageArray[i].age <= 20) {
            age0to20.push(ageArray[i].age)
        } else if (ageArray[i].age > 20 && ageArray[i].age <= 30) {
            age21to30.push(ageArray[i].age)
        } else if (ageArray[i].age > 30 && ageArray[i].age <= 40) {
            age31to40.push(ageArray[i].age)
        } else if (ageArray[i].age > 40 && ageArray[i].age <= 50) {
            age41to50.push(ageArray[i].age)
        } else if (ageArray[i].age > 50 && ageArray[i].age <= 60) {
            age51to60.push(ageArray[i].age)
        } else if (ageArray[i].age > 60) {
            age61AndOlder.push(ageArray[i].age)
        }
    }
    ageGroups = [age0to20, age21to30, age31to40, age41to50, age51to60, age61AndOlder]

    for (let j = 0; j < ageGroups.length; j++) {
        ageGroups[j] = (ageGroups[j].length * 100 / ageArray.length).toFixed(2)
    }

    console.log(ageGroups)

}

// age()

async function allPatients() {
    let patient = await Farm.find({}, {
        gender: 1,
        age: 1
    })

    let male = [];
    let female = [];


    let ageGroups = []
    let age0to20 = [];
    let age21to30 = [];
    let age31to40 = [];
    let age41to50 = [];
    let age51to60 = [];
    let age61AndOlder = [];

    for (let i = 0; i < patient.length; i++) {

        if (patient[i].age <= 20) {
            age0to20.push(patient[i].age)
        } else if (patient[i].age > 20 && patient[i].age <= 30) {
            age21to30.push(patient[i].age)
        } else if (patient[i].age > 30 && patient[i].age <= 40) {
            age31to40.push(patient[i].age)
        } else if (patient[i].age > 40 && patient[i].age <= 50) {
            age41to50.push(patient[i].age)
        } else if (patient[i].age > 50 && patient[i].age <= 60) {
            age51to60.push(patient[i].age)
        } else if (patient[i].age > 60) {
            age61AndOlder.push(patient[i].age)
        }

        if (patient[i].gender === 'F') {
            male.push(patient[i].gender)
        } else {
            female.push(patient[i].gender)
        }

    }

    let malePercent = (male.length * 100 / patient.length).toFixed(2)
    let femalePercent = (100 - malePercent).toFixed(2)
    console.log(malePercent, '%')
    console.log(femalePercent, '%')
    ageGroups = [age0to20, age21to30, age31to40, age41to50, age51to60, age61AndOlder]

    for (let j = 0; j < ageGroups.length; j++) {
        ageGroups[j] = (ageGroups[j].length * 100 / patient.length).toFixed(2)
    }
    console.log(ageGroups)

}

// allPatients()

async function migrane() {
    let patient = await Farm.find({}, {
        gender: 1,
        age: 1,
        painIntencity: 1
    })



    let maleCount = [];
    let femaleCount = [];

    let ageGroups = []
    let age0to20 = [];
    let age21to30 = [];
    let age31to40 = [];
    let age41to50 = [];
    let age51to60 = [];
    let age61AndOlder = [];

    for (let i = 0; i < patient.length; i++) {

        if (patient) {

        }

        if (patient[i].age <= 20) {
            age0to20.push(patient[i].age)
        } else if (patient[i].age > 20 && patient[i].age <= 30) {
            age21to30.push(patient[i].age)
        } else if (patient[i].age > 30 && patient[i].age <= 40) {
            age31to40.push(patient[i].age)
        } else if (patient[i].age > 40 && patient[i].age <= 50) {
            age41to50.push(patient[i].age)
        } else if (patient[i].age > 50 && patient[i].age <= 60) {
            age51to60.push(patient[i].age)
        } else if (patient[i].age > 60) {
            age61AndOlder.push(patient[i].age)
        }

        if (patient[i].gender === 'F') {
            femaleCount.push(patient[i].gender)
        } else {
            maleCount.push(patient[i].gender)
        }

    }

    let malePercent = (maleCount.length * 100 / patient.length).toFixed(2)
    let femalePercent = (100 - malePercent).toFixed(2)
    console.log(malePercent)
    console.log(femalePercent)

    ageGroups = [age0to20, age21to30, age31to40, age41to50, age51to60, age61AndOlder]

    for (let j = 0; j < ageGroups.length; j++) {
        ageGroups[j] = (ageGroups[j].length * 100 / patient.length).toFixed(2)
    }
    console.log(ageGroups)

}

// migrane()

async function f() {
    let i = await Farm.find({
        gender: 'F'
    }, {
        gender: 1
    })
    console.log(i)
}
// f()


patient = await Farm.count({})