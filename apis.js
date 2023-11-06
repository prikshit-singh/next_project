export const apis = {
    //user apis
    // baseUrl: 'https://gitgurus.com/api/',
    baseUrl: 'http://localhost:3000/api/',

    // menus


    getAllUniversity: 'university/university/getuniversity',
    getUniversityCreateDetails: 'university/university/getuniversitycreatedetails',
    createUniversity: 'university/university/createuniversity',
    updateUniversity: 'university/university/updateuniversity',
    getUniversityWithId: 'university/university/getuniversitywithid',

    getAllCity: 'university/city/getcity',
    createCity: 'university/city/createcity',
    updateCity: 'university/city/updatecity',

    getAllState: 'university/state/getstate',
    createState: 'university/state/createstate',
    updateState: 'university/state/updatestate',


    getAllCourse: 'university/course/getcourse',
    createCourse: 'university/course/createcourse',
    updateCourse: 'university/course/updatecourse',
    getCourseWithId: 'university/course/getcoursewithid',

    getAllSubject: 'university/subject/getsubject',
    createSubject: 'university/subject/createsubject',
    updateSubject: 'university/subject/updatesubject',

    // getAllRoles: 'settings/rolesettings/getroles',


    //question paper details
    getquestionpaperdetails: 'university/questionpapers/getquestionpaperdetails',
    getsemesterwisequestionpaperdetails:'university/questionpapers/getsemesterwisequestionpaperdetails',
    getquestionpaperswithsemesterandyear:'university/questionpapers/getquestionpaperswithsemesterandyear',
    uoloadQuestionPapers: 'pdfupload',
    getAllPreviousYearPapers: 'pdfupload/getpreviousyearpaper',



    // admin apis 

    getAllRoles: 'adminapi/roles/getallroles',
    getAllMenus: 'adminapi/menus/getallmenus',
    getAllProfileMenus: 'adminapi/profilemenus/getallprofilemenus',
    getAllSettings: 'adminapi/settings/getallsettings',
    getAllUsers: 'adminapi/users/getallusers',
    getAllPapers:'adminapi/papers/getallpapers'
}