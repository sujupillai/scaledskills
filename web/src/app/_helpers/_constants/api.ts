export const ApiPath = {
  'changePassword': 'api/Account/changePassword',
  'userEducation': 'api/User/Education',
  'userBasic': 'api/User',
  /* General */
  /* trainer */
  'trainerUserTag': 'api/Trainer/UserTag',
  'trainerCertificate': 'api/Trainer/Certificate',
  /* organization */
  'Organization': 'api/Organization',
  'organizationUserTag': 'api/Organization/UserTag',
  'organizationUserCertificate': 'api/Organization/Certificate',
  /* auth */
  'register': 'api/Account',
  'Accountlogin': 'api/Account/login',
  /* global */
  'globalCountry': 'api/Global/Country',
  'globalState': 'api/Global/State',
  'userSocial': 'api/User/UserSocial',
  'globalDropdown': 'api/Global/GlobalDropdown',
  'trainingRequest': 'api/Training/Request',
  'documentUpload': 'api/Document/Upload',

  /* training */
  'training': 'api/Training',
  'trainingLocation': 'api/Training/{TrainingId}/Location',
  'trainingPromotions': 'api/Training/{TrainingId}/Promotions',
  'trainingSettings': 'api/Training/{TrainingId}/Settings',
  'trainingTicket': 'api/Training/{TrainingId}/Ticket',
  'trainingTrainers': 'api/Training/{TrainingId}/Trainers',
  'trainingReview': 'api/Training/{TrainingId}/Review',
  'trainingAbout':'api/Training/{TrainingId}/About',
  'trainingImage':'api/Training/{TrainingId}/Image',


  /* home */
  'homeRunningTraining':'api/Home/RT',
  'headerTraining':'api/Home/h/{urlName}',
  'upcomingTraining':'api/Home/UCT',
  'pastTraining':'api/Home/PT',

  /* urls */
  'trainingUrl':'api/Home/T/{urlName}',
}