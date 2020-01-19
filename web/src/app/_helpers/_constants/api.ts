export const ApiPath = {
  'changePassword': 'api/Account/changePassword',
  'userEducation': 'api/User/Education',
  'userBasic': 'api/User',
  /* General */
  /* trainer api path starts */
  'trainerUserTag': 'api/Trainer/UserTag',
  'trainer': 'api/Trainer',
  'trainerCertificate': 'api/Trainer/Certificate',
  'trainerVU': 'api/Trainer/VU',
  'trainerEmail': 'api/Trainer/Email',
  /* trainer api path ends */
  /* organization */
  'Organization': 'api/Organization',
  'organizationUserTag': 'api/Organization/UserTag',
  'organizationUserCertificate': 'api/Organization/Certificate',
  'organizationList': 'api/Organization/list',
  /* auth */
  'register': 'api/Account',
  'Accountlogin': 'api/Account/login',
  'confirmEmail': 'api/Account/confirmEmail',
  'AccountForgotPassword': 'api/Account/forgotPassword',
  /* global */
  'globalCountry': 'api/Global/Country',
  'globalState': 'api/Global/State',
  'userSocial': 'api/User/UserSocial',
  'globalDropdown': 'api/Global/GlobalDropdown',
  'trainingRequest': 'api/Training/Request',
  'documentUpload': 'api/Document/Upload',
  'globalZone': 'api/Global/Zone',
  'contact': "api/Home/Contact",
  'social': {
    'fb': 'https://www.facebook.com/share.php?u=',
    'whatsapp': 'https://web.whatsapp.com/send?text=',
    'insta': 'https://www.instagram.com/?url=',
    'linkdin': 'https://www.linkedin.com/shareArticle?mini=true&url=',
    'twitter': 'http://twitter.com/home?status=',
  },
  /* training */
  'training': 'api/Training',
  'getTraining': '{id}',
  'trainingLocation': 'api/Training/{TrainingId}/Location',
  'trainingPromotions': 'api/Training/{TrainingId}/Promotions',
  'trainingSettings': 'api/Training/{TrainingId}/Settings',
  'trainingTicket': 'api/Training/{TrainingId}/Ticket',
  'trainingTrainers': 'api/Training/{TrainingId}/Trainers',
  'trainingReview': 'api/Training/{TrainingId}/Review',
  'trainingAbout': 'api/Training/{TrainingId}/About',
  'trainingImage': 'api/Training/{TrainingId}/Image',
  'trainingVU': 'api/Training/VU',

  'trainingMemberRegister': 'api/Home/T/M/R',
  'trainingMemberTrainer': 'api/Home/T/M/T',
  /* home */
  'homeRunningTraining': 'api/Home/RT',
  'headerTraining': 'api/Home/h/{urlName}',
  'upcomingTraining': 'api/Home/UCT',
  'pastTraining': 'api/Home/PT',
  'cancelTraining': 'api/Home/PT',
  /* urls */
  'trainingUrl': 'api/Home/T/{urlName}',
  'generalUrl': 'api/Home/P/{urlName}',
  'orgUrl': 'api/Home/O/{urlName}',
  /* interest */
  'interest': 'api/Training/{TrainingId}/Interest',
  /* order placement */
  'getTrainingTickets': 'api/Home/T/Tickets/{urlName}',
  'orderTicket': 'api/Order/T',
  'orderDetail': 'api/Order/{orderId}',
  'placeOrder': 'api/Order/P/{orderId}',

  /* follow /member */
  'generalMemberFollow': 'api/Home/P/M/f',
  'orgMemberFollow': 'api/Home/O/M/f',
  'relatedTraining': 'api/Home/RelatedT',
  'getTrainingReview': 'api/Home/T/review',

  /* handle follow */
  'followOrg': 'api/Home/O/f',
  'followTraining': 'api/Home/T/f',
  'followTrainer': 'api/Home/P/f',
}