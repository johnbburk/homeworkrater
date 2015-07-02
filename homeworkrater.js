Homework = new Mongo.Collection("homework");
Homework.attachSchema(new SimpleSchema({
    userId:{
        type: String,
        autoValue:function(){return this.userId},

    },
    userName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).emails[0].address},
    },
    fName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).profile.fName},
    },
    lName:{
        type: String,
        autoValue:function(){return Meteor.users.findOne({_id: this.userId}).profile.lName},
    },
    dateCreated:{
        type: Date,
        autoValue:function(){return new Date()},
    },

    page: {
        type: Number,
        label: "Page Number",
        max: 200
    },

    problems:{
        type: String,
        label:"Problems"}



}));


if (Meteor.isClient) {
  latestPage = function(){
    return Homework.findOne({},{sort: {page: -1}}).page;
  };

  Session.setDefault('currentPage', latestPage());


    Template.registerHelper('formatDate', function(date) {
        return moment(date).format('MM-DD-YYYY');
    });

    Template.results.helpers({

        displayPage: function(){
          return Session.get('currentPage');
        },

        Homework: function() {
            return Homework.find();
        },

        Name: function() {
            return Meteor.user().lName();
        },

        problemString: function() {

            return problemsStringToArray(this.problems);

        },
        selectedPageHomeworkAll:function(){
          return Homework.find({page:Session.get('currentPage')});

        },
        flaggedProblemsText:function(){

        var currentPageHomework = Homework.find({page:Session.get('currentPage')}); //get HW from database with current page
        var selectedProblems = [];
        if(currentPageHomework){
        currentPageHomework.forEach(function(hw){

        selectedProblems = _.union(selectedProblems,problemsStringToArray(hw.problems)); //find all problems that students submitted and combine them into a single array
        selectedProblems = _.sortBy(selectedProblems,function(e){return e}); //sort problems in ascending order
        })

        var arrayString = "";

        selectedProblems.forEach(function(problem){

        arrayString += problem+",";

        })

        return arrayString;
        }
        },
        flaggedProblems:function(){
        //As described above, create an array that contains all flagged problems submitted

        var currentPageHomework = Homework.find({page:Session.get('currentPage')}).fetch(); //get HW from database with current page
        var selectedProblems = [];

        currentPageHomework.forEach(function(hw){

        selectedProblems = _.union(selectedProblems,problemsStringToArray(hw.problems)); //find the union of all problems that students have submitted so far, and the current hw document from the database


        })
        selectedProblems = _.sortBy(selectedProblems,function(e){return e}); //Sort in ascending order
        //Now we will create an array of objects containing these flagged problems and the number of times they are flagged by different students.
        var flaggedProblems = [];
        var currentProblems;
        var currentCount;

        selectedProblems.forEach(function(problemNum){ //for each problem number in this array...
            currentCount = 0;



            currentPageHomework.forEach(function(document){ //check each document in the DB on the current page to see if that problem is in the array

            currentProblems = problemsStringToArray(document.problems);
            if(_.contains(currentProblems,problemNum)){

           currentCount++;

           }
            });

        flaggedProblems.push({
        problemNum: problemNum,
        count: currentCount

        })    //You could potentially store other information about each problem as well, but I'm keeping it simple.

        })
        return flaggedProblems;


        }


    });
    Template.results.events({
    'change #selectPageNumber':function(e){
     var changedValue = parseInt($('#selectPageNumber').val());
     Session.set('currentPage',changedValue);

    }

    });




    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup


  });
}


AccountsTemplates.configure({
    enablePasswordChange: true,
    showForgotPasswordLink: true,
});


AccountsTemplates.addField({
    _id: "class",
    type: "select",
    displayName: "Class",
    select: [
        {
            text: "Problem Solving in Algebra and Geometry (Finch)",
            value: "Finch1",
        },
        {
            text: "Problem Solving in Algebra and Geometry (McGowan)",
            value: "McGowan1",
        },
    ],

});

AccountsTemplates.addField({

    _id: "username",
        type: "text",
    displayName: "username",
    required: true,
    minLength: 5,
});


AccountsTemplates.addField({
    _id: "fName",
    type: "text",
    displayName: "First Name",
});

AccountsTemplates.addField({
    _id: "lName",
    type: "text",
    displayName: "Last Name",
});


problemsStringToArray = function(string){
	blankArray = [];
    if(typeof(string)=="string"){
	problemString = string.split(",");

	problemString.forEach(function(e){blankArray.push(parseInt(e))});  //this adds the problems in the string array as ints

            return _.sortBy(blankArray,function(e){return e}); //return the sorted array
    }
    else{
     return null;
    }
};
