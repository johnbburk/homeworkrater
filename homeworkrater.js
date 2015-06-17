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


    page: {
        type: Number,
        label: "Page Number",
        max: 200
    },

    problem1: {
        type: Boolean,
    },
    problem2: {
        type: Boolean,
    },
    problem3: {
        type: Boolean,
    },
    problem4: {
        type: Boolean,
    },
    problem5: {
        type: Boolean,
    },
    problem6: {
        type: Boolean,
    },
    problem7: {
        type: Boolean,
    },
    problems8: {
        type: Boolean,
    },
    problems9: {
        type: Boolean,
    },
    problems10: {
        type: Boolean,
    },
    problems11: {
        type: Boolean,
    },
    problems12: {
        type: Boolean,
    },

}));


if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

    Template.results.helpers({

        Homework: function() {
            return Homework.find();
        }
    });

    Template.results.helpers({

        Name: function() {
            return Meteor.user().lName();
        }
    });
    Template.results.helpers({
        Name:function(){

            return Meteor.users.findOne({_id: this.userId}).username+"hello";
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




