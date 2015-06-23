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
        type: Object,
    },
    'problems.one':{
    type: Boolean,
        label: "Problem 1"

    },
    'problems.two':{
        type: Boolean,
        label: "Problem 2"

    },
    'problems.three':{
        type: Boolean,
        label: "Problem 3"

    },
    'problems.four':{
        type: Boolean,
        label: "Problem 4"
    },
    'problems.five':{
        type: Boolean,
        label: "Problem 5"
    },
    'problems.six':{
        type: Boolean,
        label: "Problem 6"
    },
    'problems.seven':{
        type: Boolean,
        label: "Problem 7"
    },
    'problems.eight':{
        type: Boolean,
        label: "Problem 8"
    },
    'problems.nine':{
        type: Boolean,
        label: "Problem 9"
    },
    'problems.ten':{
        type: Boolean,
        label: "Problem 10"
    },
    'problems.eleven':{
        type: Boolean,
        label: "Problem 11"
    },
    'problems.twelve':{
        type: Boolean,
        label: "Problem 12"
    },

}));


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);


    Template.registerHelper('formatDate', function(date) {
        return moment(date).format('MM-DD-YYYY');
    });

    Template.results.helpers({

        Homework: function() {
           var hw= Homework.find({},{sort:{page:-1}});
           hw.forEach(function(pg){
               console.log(pg.page);
               var i = 1;
               _.each(pg.problems,function(problem){
                    console.log(i+" "+problem);
                    i++;
               });
           }) ;

        },

        Name: function() {
            return Meteor.user().lName();
        },

        Problems: function(probelms) {
            _.each(problems,function(problem){
                console.log(i+" "+problem);
                i++;
            });

        }


    });


    Template.results2.helpers({

        Homework: function() {
            return Homework.find({},{sort:{page:-1}});

        },

        Name: function() {
            return Meteor.user().lName();
        },

        Problems: function(probelms) {
            text = ""
            var i =1;
            _.each(this.problems,function(problem){

                if(problem){
                    text+=i+", ";
                }
                console.log(i+" "+problem);
                i++;
            });
            return text;
        }


    });



    Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
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




